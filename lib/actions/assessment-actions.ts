"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getSession } from "./auth-actions";
import type { Assessment } from "@/app/(main)/modules/components/assessment-modal";
import type { Result, VoidResult } from "./types";

export async function addCustomAssessment(
  studentModuleId: number,
  assessmentData: Assessment,
): Promise<Result<any>> {
  console.log(studentModuleId, assessmentData);
  const session = await getSession();
  if (!session) return { success: false, error: "User not authenticated" };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assessments")
    .insert({
      name: assessmentData.name,
      weight: assessmentData.weight / 100,
      grade: assessmentData.grade,
      student_module_id: studentModuleId,
      scheme_id: null,
    })
    .select()
    .single();

  if (error) {
    console.error("addCustomAssessment error:", error);
    return { success: false, error: "Unable to create assessment" };
  }

  revalidatePath("/modules/[moduleId]");
  return { success: true, data };
}

export async function deleteAssessment(
  assessmentId: number,
): Promise<VoidResult> {
  const session = await getSession();
  if (!session) return { success: false, error: "User not authenticated" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("assessments")
    .delete()
    .eq("id", assessmentId);

  if (error) {
    console.error("deleteAssessment error:", error);
    return { success: false, error: "Unable to delete assessment" };
  }

  revalidatePath("/modules/[moduleId]");
  return { success: true, data: null };
}

export async function updateAssessment(
  assessmentId: number,
  data: { name?: string; weight?: number; grade: number | null },
): Promise<Result<any>> {
  const session = await getSession();
  if (!session) return { success: false, error: "User not authenticated" };

  const supabase = await createClient();
  const { data: updatedData, error } = await supabase
    .from("assessments")
    .update({
      ...(data?.name && { name: data.name }),
      ...(data?.weight && { weight: data.weight / 100 }),
      grade: data.grade,
    })
    .eq("id", assessmentId)
    .select()
    .single();

  if (error) return { success: false, error: "Unable to update assessment" };

  return { success: true, data: updatedData };
}
