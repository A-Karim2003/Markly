import { createClient } from "../supabase/server";

export async function getModules(studentProfileId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("student_modules")
    .select("*, modules(*)")
    .eq("student_profile_id", studentProfileId);

  return data;
}
