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
