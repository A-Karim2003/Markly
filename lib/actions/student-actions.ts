"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getSession } from "./auth-actions";
import { getStudentProfile } from "../data/student-profiles";

export async function updateStudentYear(studentId: number, year: number) {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const supabase = await createClient();

  const { error } = await supabase
    .from("student_profiles")
    .update({ year })
    .eq("id", studentId);

  if (error) throw new Error(error.message);

  revalidatePath("/onboarding");
}

export async function updateStudentOnboardingStep(
  studentId: number,
  step: number,
) {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const supabase = await createClient();

  const { error } = await supabase
    .from("student_profiles")
    .update({ onboarding_step: step })
    .eq("id", studentId);

  if (error) throw new Error(error.message);
  revalidatePath("/onboarding");
}

export async function enrolStudentModules(
  studentId: number,
  moduleIds: number[],
) {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const studentProfile = await getStudentProfile();
  const supabase = await createClient();

  const { data: studentModules, error } = await supabase
    .from("student_modules")
    .insert(
      moduleIds.map((moduleId) => ({
        student_profile_id: studentId,
        module_id: moduleId,
        year: studentProfile.year!,
      })),
    )
    .select("id, module_id");

  if (error) throw new Error(error.message);

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select("id, module_assessments_scheme(id, name, weight)")
    .in("id", moduleIds);

  if (modulesError) throw new Error(modulesError.message);

  const assessmentsToSeed = modules.flatMap((module) => {
    // For this module, find its corresponding student_module row so I can get the student_module_id
    const studentModule = studentModules.find(
      (studentModule) => studentModule.module_id === module.id,
    );
    if (!studentModule) return [];

    // For each scheme row, create as assessment row for the corresponding module
    return module.module_assessments_scheme.map((scheme) => ({
      name: scheme.name,
      weight: scheme.weight,
      grade: null,
      scheme_id: scheme.id,
      student_module_id: studentModule.id,
    }));
  });

  if (assessmentsToSeed.length) {
    const { error: assessmentsError } = await supabase
      .from("assessments")
      .insert(assessmentsToSeed);

    if (assessmentsError) throw new Error(assessmentsError.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/modules");
}

type UpdateStudentProfileData = {
  year?: number;
  target_grade?: number;
};

export async function updateStudentProfile(
  studentId: number,
  data: UpdateStudentProfileData,
) {
  if (Object.keys(data).length === 0)
    return { success: false, error: "Nothing to update" };

  const session = await getSession();
  if (!session) return { success: false, error: "User not authenticated" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("student_profiles")
    .update(data)
    .eq("id", studentId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/settings");

  return { success: true };
}
