import { createStore } from "zustand";
import { Tables } from "@/types/supabase";

const StudentProfile = Table<"Student_profiles">;

export const createStudentStore = () => {
  return createStore()((set) => {});
};
