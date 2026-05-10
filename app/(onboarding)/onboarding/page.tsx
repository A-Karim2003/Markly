import { getModulesByYear } from "@/lib/data/modules";
import OnboardingSteps from "../_components/onboarding-steps";
import { getStudentProfile } from "@/lib/data/student-profiles";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const student = await getStudentProfile();

  // prevent user from navigating to onboarding page after completion
  if (student?.onboarding_step === 3) redirect("/dashboard");

  const modules = student?.year ? await getModulesByYear(student.year) : [];

  return (
    <div>
      <OnboardingSteps modules={modules} student={student} />
    </div>
  );
}
