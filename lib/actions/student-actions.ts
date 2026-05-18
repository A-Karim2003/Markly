"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getSession } from "./auth-actions";

export async function updateStudentYear(studentId: number, year: number) {
  const session = getSession();
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
  const session = getSession();
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
  const session = getSession();
  if (!session) throw new Error("User not authenticated");

  const supabase = await createClient();

  const rows = moduleIds.map((moduleId) => ({
    student_profile_id: studentId,
    module_id: moduleId,
  }));

  const { error } = await supabase.from("student_modules").insert(rows);

  if (error) throw new Error(error.message);
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
