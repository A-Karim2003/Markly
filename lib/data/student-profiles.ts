import { createClient } from "../supabase/server";
import type { Tables } from "@/types/supabase";

export type StudentProfile = Tables<"student_profiles">;

export async function getStudentProfile() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}
