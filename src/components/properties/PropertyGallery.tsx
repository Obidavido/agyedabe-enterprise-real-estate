"use client";

import { useState } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { PropertyImage } from "@/types/property";

type PropertyGalleryProps = { images: PropertyImage[]; title: string };

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const safeImages = images.length ? images : [{ src: "/images/exterior-modern-home.jpg", alt: `Illustrative property image for ${title}` }];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = safeImages[Math.min(activeIndex, safeImages.length - 1)];

  return (
    <div className="detail-gallery">
      <div className="gallery-main">
        <ImageWithFallback key={activeImage.src} src={activeImage.src} alt={activeImage.alt} loading="eager" />
        <span className="gallery-label">Illustrative demo imagery</span>
      </div>
      {safeImages.length > 1 && (
        <div className="gallery-thumbnails" aria-label={`${title} photo gallery`}>
          {safeImages.map((image, index) => (
            <button
              className={`gallery-thumb${activeIndex === index ? " is-active" : ""}`}
              key={`${image.src}-${index}`}
              type="button"
              aria-label={`Show image ${index + 1} of ${safeImages.length}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              <ImageWithFallback src={image.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
