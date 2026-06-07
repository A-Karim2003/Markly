import { DashboardSection } from "./dashboard-section";
import { ModulesSection } from "./modules-section";
import { AssessmentsSection } from "./assessments-section";
import { HowItWorksSection } from "./how-it-works-section";
import { Separator } from "@/components/ui/separator";

export function FeatureSections() {
  return (
    <div className="w-full max-w-[80vw] mx-auto px-6 sm:px-8">
      <section id="dashboard" className="scroll-mt-28">
        <DashboardSection />
      </section>
      <Separator />
      <section id="modules" className="scroll-mt-28">
        <ModulesSection />
      </section>
      <Separator />
      <section id="assessments" className="scroll-mt-28">
        <AssessmentsSection />
      </section>
      <Separator />
      <section id="how-it-works" className="scroll-mt-28">
        <HowItWorksSection />
      </section>
    </div>
  );
}
