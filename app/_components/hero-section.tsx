"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  // Gets the section html element
  const containerRef = useRef<HTMLElement>(null);

  // Track the scroll progress specifically across this section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" → top of element touches top of viewport → progress = 0
    // "end start" → bottom of element touches top of viewport → progress = 1
    offset: ["start start", "end start"],
    //       progress = 0    progress = 1
  });

  /*
    When scrollYProgress is 0, rotateX is 0. When scrollYProgress is 0.5, rotateX is 11. When scrollYProgress is 1, rotateX is 22. Same idea with scale  
  */
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <section
      ref={containerRef}
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-background py-16 text-foreground border-b border-border"
    >
      <div className="w-full flex flex-col items-center gap-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur"
        >
          <ShieldCheck className="h-4 w-4 text-grade-first" />
          Built for University of Essex Computer Science students
        </motion.div>

        {/* Headings */}
        <div className="space-y-4 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground uppercase font-heading"
          >
            Track grades. <br /> Stay Ahead.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Log assessments, track modules, and monitor your degree progress in
            one calm place. Markly keeps your average, credits, and target
            degree class visible at a glance.
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 px-4"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/sign-up">Create your account</Link>
          </Button>
          <Link
            href="/sign-in"
            className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            Already have an account? Sign in
          </Link>
        </motion.div>

        <div className="w-full perspective-[1500px] flex justify-center mt-6">
          <motion.div
            className="w-[80%] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
            style={{
              transformOrigin: "center top",
              rotateX,
              scale,
            }}
          >
            <div className="relative aspect-video w-full p-2 sm:p-4 bg-muted/20">
              <div className="relative h-full overflow-hidden rounded-xl border border-border/50">
                <Image
                  src="/dashboard.png"
                  alt="Markly dashboard preview"
                  fill
                  priority
                  loading="eager"
                  quality="100"
                  sizes="80vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
