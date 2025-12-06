import React from "react";
import { Quote } from "lucide-react";
import { clsx } from "@/lib/utils";

interface ProjectQuoteProps {
  text: string;
  author?: string;
  role?: string;
  className?: string;
}

export const ProjectQuote: React.FC<ProjectQuoteProps> = ({
  text,
  author,
  role,
  className,
}) => {
  return (
    <blockquote
      className={clsx(
        "relative bg-gray-50 rounded-3xl p-8 md:p-12 my-12 border border-gray-100",
        className
      )}
    >
      <Quote className="absolute top-8 left-8 w-8 h-8 text-gray-300 -z-0" />
      <div className="relative z-10">
        <p className="text-xl md:text-2xl font-medium text-gray-900 italic leading-relaxed mb-6">
          "{text}"
        </p>
        {(author || role) && (
          <footer className="flex flex-col">
            {author && <cite className="not-italic font-bold text-gray-900">{author}</cite>}
            {role && <span className="text-gray-500 text-sm">{role}</span>}
          </footer>
        )}
      </div>
    </blockquote>
  );
};

