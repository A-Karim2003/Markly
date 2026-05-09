"use client";

import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { Tables } from "@/types/supabase";
import { useState, createContext, useContext } from "react";

type StudentProfile = Tables<"student_profiles">;

// 1. Define the shape of our Zustand store
type StudentProfileState = {
  profile: StudentProfile;
  setProfile: (profile: StudentProfile) => void;
};

// 2. Factory function
// Creates a brand new store instance each time it's called.
// This prevents global shared state issues.
export const createStudentProfileStore = (initialProfile: StudentProfile) => {
  return createStore<StudentProfileState>()((set) => ({
    // initialProfile comes from server/database
    profile: initialProfile,

    // Action used to update profile later if needed
    setProfile: (studentProfile) => set({ profile: studentProfile }),
  }));
};

// 3. Infer store type from factory function return type
type StudentProfileStore = ReturnType<typeof createStudentProfileStore>;

// 4. Context stores the Zustand store instance
// NOT the actual profile values
const StudentProfileContext = createContext<StudentProfileStore | null>(null);

// 5. Provider creates store once using useState lazy initialisation
// and shares that store instance with all children
export function StudentProfileProvider({
  children,
  initialProfile,
}: {
  children: React.ReactNode;
  initialProfile: StudentProfile;
}) {
  // ensures state survives across rerenders and is only created once
  const [store] = useState(() => createStudentProfileStore(initialProfile));

  return (
    <StudentProfileContext value={store}>{children}</StudentProfileContext>
  );
}

// 6. Custom hook for consuming store
// Accepts selector so components can subscribe
// only to specific slices of state
export function useStudentProfile<T>(
  selector: (state: StudentProfileState) => T,
) {
  const store = useContext(StudentProfileContext);

  if (!store) {
    throw new Error(
      "useStudentProfile must be used within StudentProfileProvider",
    );
  }

  // connects react component to zustand store
  return useStore(store, selector);
}
