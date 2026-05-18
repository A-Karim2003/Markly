"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { SettingsProfile } from "./settings-profile";
import { SettingsTarget } from "./settings-target";
import { updateStudentProfile } from "@/lib/actions/student-actions";
import { toast } from "react-toastify";

type SettingsFormProps = {
  studentId: number;
  initialName: string;
  initialYear: number;
  initialTargetGrade: number | null;
};

export function SettingsForm({
  studentId,
  initialName,
  initialYear,
  initialTargetGrade,
}: SettingsFormProps) {
  const [name, setName] = useState(initialName);
  const [year, setYear] = useState(initialYear);
  const [targetGrade, setTargetGrade] = useState(initialTargetGrade);
  const [pending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      const result = await updateStudentProfile(studentId, {
        year,
        target_grade: targetGrade ?? 70,
      });

      if (!result.success) {
        toast.error(result.error ?? "Something went wrong");
        return;
      }

      toast.success("Settings saved");
    });
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

      <Button disabled={pending} onClick={handleSave}>
        {pending ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
