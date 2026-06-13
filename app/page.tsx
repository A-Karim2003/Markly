import { HeroSection } from "@/app/_components/hero-section";
import { FeatureSections } from "@/app/_components/home/feature-sections";
import { HomeNav } from "@/app/_components/home/home-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      <HomeNav />
      <HeroSection />
      <FeatureSections />
      <div className="fixed bottom-4 left-4">
        <ThemeToggle />
      </div>
    </main>
  );
}
