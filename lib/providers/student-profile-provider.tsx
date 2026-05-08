"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore } from "zustand";

import { createStudentStore, type StudentStore } from "@/stores/student-store";
import { Tables } from "@/types/supabase";

type StudentProfile = Tables<"student_profiles">;

type StudentStoreApi = ReturnType<typeof createStudentStore>;

const StudentStoreContext = createContext<StudentStoreApi | null>(null);

type StudentStoreProviderProps = {
  children: ReactNode;
  student: StudentProfile;
};

export function StudentStoreProvider({
  children,
  student,
}: StudentStoreProviderProps) {
  const [store] = useState(() => createStudentStore(student));

  return (
    <StudentStoreContext.Provider value={store}>
      {children}
    </StudentStoreContext.Provider>
  );
}

export function useStudentStore<T>(selector: (state: StudentStore) => T) {
  const store = useContext(StudentStoreContext);

  if (!store) {
    throw new Error("useStudentStore must be used within StudentStoreProvider");
  }

  return useStore(store, selector);
}
