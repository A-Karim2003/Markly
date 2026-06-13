import { getSession } from "../actions/auth-actions";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { getStudentProfile } from "./student-profiles";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getAssessments() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const studentProfile = await getStudentProfile();
  if (!studentProfile.year) throw new Error("Student year not set");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assessments")
    .select(
      `
      id, name, grade, weight,
      student_modules!student_module_id!inner(
      id,
      student_profile_id,
      modules!module_id(
        name,
        code
      )
    )
  `,
    )
    .eq("student_modules.student_profile_id", studentProfile.id)
    .eq("student_modules.year", studentProfile.year);

  if (error) throw new Error(error.message);

  return data;
}
