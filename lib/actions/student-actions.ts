"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getSession } from "./auth-actions";
import { getStudentProfile } from "../data/student-profiles";
import { Result } from "./types";

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

export async function swapModule(
  studentModuleId: number,
  selectedModuleId: number,
): Promise<Result<unknown>> {
  const session = await getSession();
  if (!session) return { success: false, error: "User not authenticated" };

  const supabase = await createClient();

  //? Delete assessment records for the module we want to replace
  const { error: assessmentError } = await supabase
    .from("assessments")
    .delete()
    .eq("student_module_id", studentModuleId);

  if (assessmentError)
    return { success: false, error: assessmentError.message };

  //? Perform the module swap by updating the student module to the new module
  const { error: moduleError } = await supabase
    .from("student_modules")
    .update({ module_id: selectedModuleId })
    .eq("id", studentModuleId);

  if (moduleError) return { success: false, error: moduleError.message };

  //? Fetch the assessment schemes for the new module
  const { data: moduleSchemes, error: moduleSchemeError } = await supabase
    .from("module_assessments_scheme")
    .select("id, name, weight")
    .eq("module_id", selectedModuleId);

  if (moduleSchemeError)
    return { success: false, error: moduleSchemeError.message };

  //? Seed new assessment records for the updated student module
  const { data: seededAssessments, error: assessmentsError } = await supabase
    .from("assessments")
    .insert(
      moduleSchemes.map((scheme) => ({
        student_module_id: studentModuleId,
        scheme_id: scheme.id,
        name: scheme.name,
        weight: scheme.weight,
        grade: null,
      })),
    )
    .select();

  if (assessmentsError)
    return { success: false, error: assessmentsError.message };

  revalidatePath("/modules");
  revalidatePath("/dashboard");
  revalidatePath("/assessments");

  return { success: true, data: seededAssessments };
}
