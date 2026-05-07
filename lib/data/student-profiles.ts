import { createClient } from "../supabase/server";

export async function getStudentProfile() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}
