import { FeatureSection } from "./feature-section";

export function AssessmentsSection() {
  return (
    <FeatureSection
      badge="Assessments"
      heading="Log grades. Know what's next."
      subheading="Every assessment across every module in one place. Pending work stays visible so nothing catches you off guard, and completed grades show their weighted contribution and classification."
      bullets={[
        { text: "Pending and completed assessments clearly separated" },
        { text: "Grade, weight, and degree classification shown per result" },
        { text: "Required score to hit your target calculated per pending piece" },
      ]}
      mediaLabel="Assessments preview"
      flip={false}
    />
  );
}
