import { createClient } from "../supabase/server";

export async function updateStudentYear(studentId: number, year: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_profiles")
    .update({ year })
    .eq("id", studentId);

  if (error) throw new Error(error.message);

  return data;
}
