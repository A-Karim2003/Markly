"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getSession } from "./auth-actions";

export async function updateUserName(name: string) {
  if (!name.trim()) return { success: false, error: "Name cannot be empty" };

  const session = await getSession();
  if (!session) return { success: false, error: "User not authenticated" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("user")
    .update({ name, updatedAt: new Date().toISOString() })
    .eq("id", session.user.id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/settings");
  return { success: true };
}
