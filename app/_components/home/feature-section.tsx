"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionBadge } from "./section-badge";
import { MediaPlaceholder } from "./media-placeholder";

export interface Bullet {
  text: string;
}

export interface FeatureSectionProps {
  badge: string;
  heading: string;
  subheading: string;
  bullets: Bullet[];
  mediaLabel: string;
  mediaSrc?: string;
  mediaContent?: ReactNode;
  /** flip=false → text left, media right. flip=true → media left, text right */
  flip?: boolean;
}

export function FeatureSection({
  badge,
  heading,
  subheading,
  bullets,
  mediaLabel,
  mediaSrc,
  mediaContent,
  flip = false,
}: FeatureSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, { once: true, amount: 0.1 });

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: flip ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col justify-center gap-6"
    >
      <SectionBadge label={badge} />

      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight font-heading">
        {heading}
      </h2>

      <p className="text-base text-muted-foreground leading-relaxed max-w-md">
        {subheading}
      </p>

      <ul className="flex flex-col gap-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span className="text-sm text-muted-foreground leading-snug">
              {b.text}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const mediaCol = (
    <motion.div
      initial={{ opacity: 0, x: flip ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
    >
      {mediaContent ?? <MediaPlaceholder label={mediaLabel} src={mediaSrc} />}
    </motion.div>
  );

  return (
    <div ref={ref} className="py-20 sm:py-28">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className={flip ? "xl:order-2" : "xl:order-1"}>{textCol}</div>
        <div className={flip ? "xl:order-1" : "xl:order-2"}>{mediaCol}</div>
      </div>
    </div>
  );
}
