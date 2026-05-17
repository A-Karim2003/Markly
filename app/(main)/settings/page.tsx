import { SettingsForm } from "./_components/settings-form";

export default async function SettingsPage() {
  const initialName = "Alex Johnson";
  const initialYear = 2;
  const initialTargetGrade = 70;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      <SettingsForm
        initialName={initialName}
        initialYear={initialYear}
        initialTargetGrade={initialTargetGrade}
      />
    </div>
  );
}
