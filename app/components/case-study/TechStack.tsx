import React from "react";
import { clsx } from "@/lib/utils";

interface TechStackProps {
  technologies: string[];
  className?: string;
}

export const TechStack: React.FC<TechStackProps> = ({
  technologies,
  className,
}) => {
  return (
    <div className={clsx("my-8", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

