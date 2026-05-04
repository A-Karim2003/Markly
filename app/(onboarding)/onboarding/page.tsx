import { getModulesByYear } from "@/lib/data/modules";
import OnboardingSteps from "../_components/onboarding-steps";

export default async function OnboardingPage() {
  const modules = await getModulesByYear(3);

  return (
    <div>
      <OnboardingSteps modules={modules} />
    </div>
  );
}
