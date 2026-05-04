"use client";

import { useState } from "react";
import { Sprout, Layers, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const years = [
  {
    id: "year-1",
    title: "Year 1",
    description: "Foundations (does not count toward final grade)",
    icon: Sprout,
  },
  {
    id: "year-2",
    title: "Year 2",
    description: "Core Theory (40% of final degree)",
    icon: Layers,
  },
  {
    id: "year-3",
    title: "Year 3",
    description: "Specialisation (60% of final degree)",
    icon: Trophy,
  },
];

export default function Step1() {
  const [selectedYear, setSelectedYear] = useState("year-1");

  return (
    <div className="min-h-screen bg-[#050509] text-white flex flex-col items-center justify-center p-6 font-serif">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2">Markly</h1>
        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-8">
          Step 1 of 2
        </p>
        <h2 className="text-3xl font-semibold mb-3">What year are you in?</h2>
        <p className="text-zinc-400 max-w-md mx-auto">
          This determines which modules are available and how your grades are
          weighted.
        </p>
      </div>

      {/* Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
        {years.map((year) => {
          const Icon = year.icon;
          const isSelected = selectedYear === year.id;

          return (
            <Card
              key={year.id}
              onClick={() => setSelectedYear(year.id)}
              className={`cursor-pointer transition-all border-zinc-800 bg-[#0a0a12] hover:border-indigo-500/50 ${
                isSelected ? "ring-2 ring-indigo-500 border-transparent" : ""
              }`}
            >
              <CardContent className="p-8 flex flex-col items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-950/30 text-indigo-400">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">
                    {year.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed italic">
                    {year.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button className="w-full max-w-4xl bg-indigo-700 hover:bg-indigo-600 text-zinc-100 h-14 text-lg font-medium rounded-xl transition-colors">
        Continue
      </Button>
    </div>
  );
}
