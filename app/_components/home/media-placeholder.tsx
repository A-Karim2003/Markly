"use client";

import Image from "next/image";

interface MediaPlaceholderProps {
  label: string;
  src?: string;
  alt?: string;
}

export function MediaPlaceholder({ label, src, alt }: MediaPlaceholderProps) {
  return (
    <div className="w-full aspect-16/10 rounded-radius border border-border overflow-hidden">
      {src ? (
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt ?? label}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-xl object-contain"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-4 text-center">
          <span className="text-xs font-medium">{label}</span>
        </div>
      )}
    </div>
  );
}
