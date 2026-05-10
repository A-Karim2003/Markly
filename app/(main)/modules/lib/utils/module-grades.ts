export function getGradeColor(grade: number): string {
  if (grade === 0) return "var(--muted-foreground)";
  if (grade >= 70) return "#16a34a";
  if (grade >= 60) return "#2563eb";
  if (grade >= 50) return "#d97706";
  return "#dc2626";
}

export function getGradeClass(grade: number): string {
  if (grade >= 70) return "First";
  if (grade >= 60) return "2:1";
  if (grade >= 50) return "2:2";
  if (grade >= 40) return "Third";
  return "Fail";
}
