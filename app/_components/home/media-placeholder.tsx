"use client";

import Image from "next/image";

interface MediaPlaceholderProps {
  label: string;
  src?: string;
  alt?: string;
}

export function MediaPlaceholder({ label, src, alt }: MediaPlaceholderProps) {
  return (
    <div className="relative w-full aspect-16/10 rounded-2xl border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
      {src ? (
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt ?? label}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : (
        <span className="text-xs font-medium">{label}</span>
      )}
    </div>
  );
}
