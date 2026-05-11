import { getSession } from "../actions/auth-actions";
import { createClient } from "../supabase/server";
import type { Tables } from "@/types/supabase";

/*
  {
    id: "4",
    code: "CE204-5-AU",
    name: "Data Structures and Algorithms II",
    credits: 15,
    is_optional: false,
    average: 55.0,
    graded: 1,
    total: 2,
  },
*/

export async function getStudentModulesWithGrades() {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const userAuthId = session?.user.id;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("user_id", userAuthId);

  if (error) {
    console.error("Error fetching student modules:", error);
    return [];
  }

  return data;
}
