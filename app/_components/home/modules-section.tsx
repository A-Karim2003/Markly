import { FeatureSection } from "./feature-section";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      mediaContent={
        <Carousel>
          <CarouselContent>
            {[
              {
                src: "/sectionImages/modules_section_image.png",
                alt: "Modules overview preview",
              },
              {
                src: "/sectionImages/module_detail.png",
                alt: "Module detail preview",
              },
            ].map((image) => (
              <CarouselItem key={image.src}>
                <div className="relative w-full aspect-16/10 rounded-radius border border-border overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-xl object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-7 w-7" />
          <CarouselNext className="h-7 w-7" />
        </Carousel>
      }
      flip={true}
    />
  );
}
