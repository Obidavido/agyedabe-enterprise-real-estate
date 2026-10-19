"use client";

import { useState } from "react";

type ImageWithFallbackProps = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function ImageWithFallback({
  src,
  fallbackSrc = "/images/exterior-modern-home.jpg",
  alt,
  className,
  loading = "lazy",
  fetchPriority,
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => {
        if (!failed && currentSrc !== fallbackSrc) {
          setFailed(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
