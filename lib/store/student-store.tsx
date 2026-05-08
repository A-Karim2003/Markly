import { createStore } from "zustand/vanilla";
import { Tables } from "@/types/supabase";
import { useState, createContext, useContext } from "react";

type StudentProfile = Tables<"student_profiles">;

// 1. Define state shape
type StudentProfileState = {
  profile: StudentProfile;
  setProfile: (profile: StudentProfile) => void;
};

// 2. Factory function — creates a fresh store each time
export const createStudentProfileStore = (initialProfile: StudentProfile) => {
  return createStore<StudentProfileState>()(() => ({
    profile: initialProfile ?? null,
    setProfile: (studentProfile) => ({ profile: studentProfile }),
  }));
};

// 3. Context holds the store instance (not the state values)
type StudentProfileStore = ReturnType<typeof createStudentProfileStore>;

// 4. Provider creates one store instance and holds it in a useState
const StudentProfileContext = createContext<StudentProfileStore | null>(null);

export function StudentProfileProvider({
  children,
  initialProfile,
}: {
  children: React.ReactNode;
  initialProfile: StudentProfile;
}) {
  const [store] = useState(() => createStudentProfileStore(initialProfile));

  return (
    <StudentProfileContext value={store}>{children}</StudentProfileContext>
  );
}

// 5. Hook to consume — accepts a selector for granular subscriptions
export function useStudentProfile() {
  const context = useContext(StudentProfileContext);
  if (!context) {
    throw new Error(
      "useStudentProfile must be used within a StudentProfileProvider",
    );
  }
  return context;
}
