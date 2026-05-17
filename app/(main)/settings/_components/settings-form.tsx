"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingsProfile } from "./settings-profile";
import { SettingsTarget } from "./settings-target";

type SettingsFormProps = {
  initialName: string;
  initialYear: number;
  initialTargetGrade: number;
};

export function SettingsForm({
  initialName,
  initialYear,
  initialTargetGrade,
}: SettingsFormProps) {
  const [name, setName] = useState(initialName);
  const [year, setYear] = useState(initialYear);
  const [targetGrade, setTargetGrade] = useState(initialTargetGrade);

  async function handleSave() {
    // server action will be wired here
  }

  return (
    <div className="flex flex-col gap-10" style={{ gap: "3rem" }}>
      <SettingsProfile
        name={name}
        year={year}
        onNameChange={setName}
        onYearChange={setYear}
      />

      <SettingsTarget
        targetGrade={targetGrade}
        onTargetChange={setTargetGrade}
      />

      <Button className="w-full py-6 text-sm font-medium" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}
