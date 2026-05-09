import { getModulesByYear } from "@/lib/data/modules";
import OnboardingSteps from "../_components/onboarding-steps";
import { getStudentProfile } from "@/lib/data/student-profiles";

export default async function OnboardingPage() {
  const student = await getStudentProfile();
  const modules = student?.year ? await getModulesByYear(student.year) : [];

  return (
    <div>
      <OnboardingSteps modules={modules} student={student} />
    </div>
  );
}
