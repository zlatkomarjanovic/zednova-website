"use client";

import { useState } from "react";
import Image from "next/image";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialAvatar({
  name,
  image,
  className = "size-11",
}: {
  name: string;
  image?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-zn-border-dk ${className}`}
    >
      {image && !failed ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="44px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex size-full items-center justify-center font-mono text-xs text-zn-inv-2">
          {initials(name)}
        </span>
      )}
    </div>
  );
}
