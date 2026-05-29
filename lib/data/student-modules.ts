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
  if (!studentProfile.year) throw new Error("Student year not set");

  const supabase = await createClient();

  // get modules row and their associated assessments info such as weight adn type
  const { data, error } = await supabase
    .from("student_modules")
    .select(
      `
    id,
    module_info:modules(
      code,
      name,
      credits,
      is_optional,
      module_assessments_scheme!module_id(id, name, type, weight)
    ),
    assessments(grade, weight)
  `, // The !module_id hint tells PostgREST "use the module_id column to join this table",
    )
    .eq("student_profile_id", studentProfile.id)
    .eq("year", studentProfile.year);

  if (error) throw new Error(error.message);

  return data;
}

/* 
1st Query (Scheme): "What are the rules for this module? Is there an exam? How much is it worth?"

2nd Query (Assessments): "How did the student actually perform? What grade was recorded for each part?"
*/
export async function getStudentModuleById(studentModuleId: number) {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const studentProfile = await getStudentProfile();
  const supabase = await createClient();

  /*
    Selects info about a specific student module and assessments info for that specific module
  */
  const { data: moduleData, error: moduleError } = await supabase
    .from("student_modules")
    .select(
      `
      id,
      module_info:modules(
        code,
        name,
        credits,
        is_optional,
        module_assessments_scheme!module_id(id, name, type, weight)
      )
    `,
    )
    .eq("id", studentModuleId)
    .eq("student_profile_id", studentProfile.id)
    .eq("year", studentProfile.year!)
    .maybeSingle();

  if (moduleError) throw new Error(moduleError.message);

  if (!moduleData) return null;

  // Select all the assessments a student has taken for a specific module
  const { data: assessments, error: assessmentsError } = await supabase
    .from("assessments")
    .select("id, name, grade, weight, scheme_id")
    .eq("student_module_id", studentModuleId);

  if (assessmentsError) throw new Error(assessmentsError.message);

  return { ...moduleData, assessments };
}

export type StudentModuleById = Awaited<
  ReturnType<typeof getStudentModuleById>
>;

export type StudentModules = Awaited<ReturnType<typeof getStudentModules>>;
export async function getStudentModules() {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const studentProfile = await getStudentProfile();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_modules")
    .select("*")
    .eq("student_profile_id", studentProfile.id)
    .eq("year", studentProfile.year!);

  if (error) throw new Error(error.message);

  return data;
}
