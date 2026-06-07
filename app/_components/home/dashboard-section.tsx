import { FeatureSection } from "./feature-section";

export function DashboardSection() {
  return (
    <FeatureSection
      badge="Dashboard"
      heading="Your degree at a glance."
      subheading="One screen shows your weighted year average, total credits tracked, and how many modules are on course for your target classification. No digging required."
      bullets={[
        { text: "Weighted year average updated every time you log a grade" },
        { text: "Credits tracked across all enrolled modules automatically" },
        { text: "Target classification — First, 2:1, 2:2 — always visible" },
      ]}
      mediaLabel="Dashboard preview"
      flip={false}
    />
  );
}
