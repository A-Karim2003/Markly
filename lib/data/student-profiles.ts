import { getSession } from "../actions/auth-actions";
import { createClient } from "../supabase/server";
import type { Tables } from "@/types/supabase";

export type StudentProfile = Tables<"student_profiles">;

export async function getStudentProfile() {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const userAuthId = session?.user.id;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("user_id", userAuthId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
