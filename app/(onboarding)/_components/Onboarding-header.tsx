import Image from "next/image";
import React from "react";

export default function OnboardingHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center mb-12">
      <div className="mx-auto mb-4 flex h-24 w-56 items-center justify-center rounded-2xl border border-dashed border-border bg-card p-4 text-xs uppercase tracking-[0.35em] text-muted-foreground">
        <Image
          src="/logo-dark.png"
          alt="Logo"
          width={200}
          height={80}
          quality={100}
        />
      </div>
      <p className="text-muted-foreground text-sm uppercase tracking-widest mb-8">
        {children}
      </p>
      <h2 className="text-3xl font-semibold mb-3 text-foreground">
        What year are you in?
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        This determines which modules are available and how your grades are
        weighted.
      </p>
    </div>
  );
}
