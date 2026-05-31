"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type SettingsProfileProps = {
  name: string;
  year: number;
  onNameChange: (name: string) => void;
  onYearChange: (year: number) => void;
};

export function SettingsProfile({
  name,
  year,
  onNameChange,
  onYearChange,
}: SettingsProfileProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Full Name</Label>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="bg-background"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Current Year</Label>
          <div className="flex gap-2">
            {[1, 2, 3].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => onYearChange(y)}
                className={cn(
                  "px-4 py-2 rounded-radius text-sm font-medium transition-all",
                  y === year
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
                )}
              >
                Year {y}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
