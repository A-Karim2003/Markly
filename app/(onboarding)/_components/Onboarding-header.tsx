import React from "react";

export default function OnboardingHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-indigo-400 mb-2">Markly</h1>
      <p className="text-zinc-500 text-sm uppercase tracking-widest mb-8">
        {children}
      </p>
      <h2 className="text-3xl font-semibold mb-3">What year are you in?</h2>
      <p className="text-zinc-400 max-w-md mx-auto">
        This determines which modules are available and how your grades are
        weighted.
      </p>
    </div>
  );
}
