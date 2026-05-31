/** Large faded circle icon used for Credits and Modules on Track */
export default function CircleIcon({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-radius ${className ?? ""}`}
    >
      {icon}
    </div>
  );
}
