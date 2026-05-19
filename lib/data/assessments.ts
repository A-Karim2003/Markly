import { getSession } from "../actions/auth-actions";
import { createClient } from "../supabase/server";
import { getStudentProfile } from "./student-profiles";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getAssessments() {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const studentProfile = await getStudentProfile();
  if (!studentProfile.year) throw new Error("Student year not set");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assessments")
    .select(
      `
      id, name, grade,
      module_assessments_scheme!scheme_id(weight),
      student_modules!student_module_id!inner(
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
