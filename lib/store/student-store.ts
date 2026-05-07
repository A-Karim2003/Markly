import { createStore } from "zustand/vanilla";
import { Tables } from "@/types/supabase";

type StudentProfile = Tables<"student_profiles">;

type StudentStore = {
  student: StudentProfile;
};

export function createStudentStore(initialState: StudentProfile) {
  return createStore<StudentStore>()(() => ({
    student: initialState,
  }));
}
