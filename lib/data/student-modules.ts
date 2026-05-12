import { getSession } from "../actions/auth-actions";
import { createClient } from "../supabase/server";
import { getStudentProfile } from "./student-profiles";

export type StudentModulesWithGrades = Awaited<
  ReturnType<typeof getStudentModulesWithGrades>
>;
export type StudentModuleWithGrades = StudentModulesWithGrades[number];

export async function getStudentModulesWithGrades() {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const studentProfile = await getStudentProfile();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_modules")
    .select(
      `
    id,
    module_info:modules(code, name, credits, is_optional),
    assessments(grade, weight)
  `,
    )
    .eq("student_profile_id", studentProfile.id);

  if (error) throw new Error(error.message);

  return data;
}
