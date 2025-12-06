import React from "react";
import Image from "next/image";
import { clsx } from "@/lib/utils";

interface Screenshot {
  src: string;
  alt: string;
}

interface ScreenshotGridProps {
  screenshots: Screenshot[];
  className?: string;
}

export const ScreenshotGrid: React.FC<ScreenshotGridProps> = ({
  screenshots,
  className,
}) => {
  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-2 gap-6 my-12", className)}>
      {screenshots.map((screenshot, index) => (
        <div
          key={index}
          className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={800}
            height={600}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

