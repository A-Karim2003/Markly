"use server";

import { createClient } from "../supabase/server";
import { getSession } from "./auth-actions";
import { Assessment } from "@/app/(main)/modules/components/assessment-modal";

export async function addCustomAssessment(
  studentModuleId: number,
  assessmentData: Assessment,
) {
  console.log(studentModuleId, assessmentData);
  const session = getSession();
  if (!session) throw new Error("User not authenticated");

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

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function updateAssessment(assessmentId: number, data: Assessment) {
  //   const supabase = await createClient();
  //   const { data: updatedData, error } = await supabase
  //     .from("assessments")
  //     .update(data)
  //     .eq("id", assessmentId)
  //     .select()
  //     .single();
  //   if (error) throw new Error(error.message);
}
