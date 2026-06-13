"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", targetId: "dashboard" },
  { label: "Modules", targetId: "modules" },
  { label: "Assessments", targetId: "assessments" },
  { label: "How it works", targetId: "how-it-works" },
];

export function HomeNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (targetId: string) => {
    const target = document.getElementById(targetId);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-heading text-lg font-bold tracking-tight text-foreground"
        >
          <Image
            src="/logo-light.png"
            alt="Markly Logo"
            width={168}
            height={20}
            quality={100}
            loading="eager"
            className="w-full h-auto dark:hidden"
          />
          <Image
            src="/logo-dark.png"
            alt="Markly Logo"
            width={168}
            height={20}
            quality={100}
            loading="eager"
            className="hidden w-full h-auto dark:block"
          />
        </Link>

        {/* Nav for larger screens */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.targetId}
              onClick={() => scrollToSection(item.targetId)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex rounded-full px-4 text-sm"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            asChild
            className="rounded-full px-5 bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/sign-up">Get started</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full lg:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/70 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4 sm:px-8">
              {navItems.map((item) => (
                <button
                  key={item.targetId}
                  onClick={() => scrollToSection(item.targetId)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-3 pt-3 border-t border-border">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full"
                >
                  <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                    Sign in
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
