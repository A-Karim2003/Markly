"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionBadge } from "./section-badge";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up in seconds and unlock the full Markly setup flow.",
  },
  {
    number: "02",
    title: "Complete onboarding",
    description:
      "Choose your year of study and select the modules you're taking so Markly can tailor everything to your course.",
  },
  {
    number: "03",
    title: "Add your modules",
    description:
      "Select from the pre-loaded Essex CS curriculum. Credits and assessment weightings are already set up — nothing to configure.",
  },
  {
    number: "04",
    title: "Log grades as you go",
    description:
      "Enter marks as results come in. Markly recalculates your weighted average instantly and shows exactly what you need in remaining assessments.",
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <div ref={ref} className="py-20 sm:py-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <SectionBadge label="How it works" />
        <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Up and running in minutes
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          No complicated setup. No spreadsheets. Just a clear view of where you
          stand and what you need to hit your target.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-16">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.25,
            }}
            className="relative flex flex-col gap-5"
          >
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
              <span className="text-lg font-bold text-brand font-heading">
                {step.number}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video demo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="mx-auto w-full"
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-sm">
          <video
            src="/video/markly-demo.mp4"
            controls
            playsInline
            className="w-full aspect-video"
          />
        </div>
      </motion.div>
    </div>
  );
}
