import { FeatureSection } from "./feature-section";

export function ModulesSection() {
  return (
    <FeatureSection
      badge="Modules"
      heading="Every module, clearly organised."
      subheading="See your progress bar, weighted score, and remaining assessments for each module in one card. Core and Optional modules are separated so nothing gets overlooked."
      bullets={[
        { text: "Core and optional modules in clearly labelled groups" },
        {
          text: "Per-module progress bar reflects graded vs. total assessments",
        },
        {
          text: "Remaining assessments badge keeps upcoming work front of mind",
        },
      ]}
      mediaLabel="Modules preview"
      mediaSrc="/sectionImages/modules.png"
      flip={true}
    />
  );
}
