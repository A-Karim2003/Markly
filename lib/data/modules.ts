import { createClient } from "../supabase/server";
import type { Tables } from "@/types/supabase";

export type Module = Tables<"modules">;

export async function getModulesByYear(year: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("year", year);

  if (error) throw new Error(error.message);

  return data;
}
