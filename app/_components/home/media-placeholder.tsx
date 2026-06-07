interface MediaPlaceholderProps {
  label: string;
}

export function MediaPlaceholder({ label }: MediaPlaceholderProps) {
  return (
    <div className="relative w-full aspect-16/10 rounded-2xl border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
