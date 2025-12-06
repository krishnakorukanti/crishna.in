import React from "react";
import { clsx } from "@/lib/utils";

interface CaseStudySectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray";
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  title,
  children,
  className,
  background = "white",
}) => {
  return (
    <section
      className={clsx(
        "py-12 md:py-16 rounded-3xl my-8",
        background === "gray" ? "bg-gray-50 px-8 md:px-12" : "bg-white",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
        {title}
      </h2>
      <div className="prose prose-lg prose-gray max-w-none text-gray-600">
        {children}
      </div>
    </section>
  );
};

