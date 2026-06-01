import { getSession } from "@/lib/actions/auth-actions";
import { SettingsForm } from "./_components/settings-form";
import { getStudentProfile } from "@/lib/data/student-profiles";

export default async function SettingsPage() {
  const [session, studentProfile] = await Promise.all([
    getSession(),
    getStudentProfile(),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      <SettingsForm
        initialName={session?.user.name as string}
        initialYear={studentProfile?.year as number}
        initialTargetGrade={studentProfile?.target_grade}
      />
    </div>
  );
}
