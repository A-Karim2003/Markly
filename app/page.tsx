"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  Layers3,
  Menu,
  NotebookPen,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroSection } from "@/app/_components/hero-section";

const navItems = [
  { label: "Overview", id: "overview" },
  { label: "Progress", id: "progress" },
  { label: "Workflow", id: "workflow" },
  { label: "Get started", id: "cta" },
];

const progressCards = [
  {
    icon: BookOpenText,
    title: "Module structure at a glance",
    description:
      "Keep every semester and module visible without jumping through tabs.",
  },
  {
    icon: NotebookPen,
    title: "Assessment tracking that stays tidy",
    description:
      "Capture grades, weighting, and pending work in one calm workspace.",
  },
  {
    icon: TrendingUp,
    title: "A clear target path",
    description:
      "See how close you are to a First or 2:1 and what still needs attention.",
  },
];

const workflowSteps = [
  "Track your modules and keep each assessment tied to the right module.",
  "Record marks as they land, so your average updates stay visible.",
  "Review the target forecast before deadlines start to stack up.",
];

const moduleRows = [
  { name: "Machine Learning", progress: 84, grade: "72%", status: "On track" },
  {
    name: "Software Engineering",
    progress: 68,
    grade: "64%",
    status: "Needs attention",
  },
  { name: "Databases", progress: 91, grade: "78%", status: "Strong" },
  {
    name: "Computer Networks",
    progress: 57,
    grade: "61%",
    status: "In progress",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(98,88,244,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_24%),linear-gradient(180deg,var(--background),color-mix(in_oklch,var(--background)_84%,white))] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[5rem_5rem] opacity-30" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/70 bg-background/80 px-4 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <button
            onClick={() => scrollToSection("overview")}
            className="flex items-center gap-2 text-left"
            aria-label="Scroll to overview"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/12 text-brand">
              <Target className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.24em] text-brand">
                MARKLY
              </span>
              <span className="block text-xs text-muted-foreground">
                Grade tracking for Essex CS students
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Start tracking</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-30 bg-background/96 px-6 pt-24 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center justify-between rounded-3xl border border-border bg-card px-5 py-4 text-left text-2xl font-semibold tracking-tight"
              >
                <span>{item.label}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button variant="outline" asChild className="h-12 rounded-2xl">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild className="h-12 rounded-2xl">
                <Link href="/sign-up">Start tracking</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <HeroSection />

        <section id="progress" className="grid gap-6 lg:grid-cols-3">
          {progressCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">
                  {card.title}
                </h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </article>
            );
          })}
        </section>

        <section
          id="workflow"
          className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
        >
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
              <Layers3 className="h-4 w-4 text-brand" />A workflow designed
              around your course structure
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep semesters, assessments, and target grades visually connected.
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Markly keeps the important pieces together in a single, readable
              dashboard so you can move from overview to action without mental
              clutter.
            </p>

            <div className="rounded-[1.75rem] border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Weekly focus</div>
                  <div className="text-sm text-muted-foreground">
                    Built to help you plan around deadlines and revision.
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {workflowSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <article className="rounded-[2rem] border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <div className="text-sm text-muted-foreground">Modules</div>
                <div className="text-2xl font-semibold tracking-tight">
                  Current performance
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Steady progress
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {moduleRows.map((module) => (
                <div
                  key={module.name}
                  className="rounded-3xl border border-border/70 bg-background p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{module.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {module.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {module.grade}
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Current average
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-brand via-cyan-400 to-emerald-400"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="cta"
          className="overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-10 shadow-sm sm:px-10 sm:py-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                <Target className="h-4 w-4" />
                Private, focused, and built for students
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Get your grade tracker ready before the semester gets noisy.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Markly keeps the UI clean and the information dense, so you can
                move from overview to action without mental clutter.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" className="h-12 rounded-full px-6">
                <Link href="/sign-up">Start with Markly</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-6"
                asChild
              >
                <Link href="/sign-in">I already have an account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
