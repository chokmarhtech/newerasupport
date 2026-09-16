"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string | null | undefined;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = "/images/hero_caregiver_nurse.jpg",
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  // Determine if URL is a local uploaded file or static image
  const isLocalPath =
    typeof imgSrc === "string" &&
    (imgSrc.startsWith("/") || imgSrc.startsWith("./") || imgSrc.includes("localhost"));

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt || "New Era Healthcare Image"}
      unoptimized={isLocalPath || props.unoptimized}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
