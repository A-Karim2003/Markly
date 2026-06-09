import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen overflow-x-hidden bg-background text-foreground">
      {children}
    </div>
  );
}
