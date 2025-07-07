"use client";

import React from "react";
import { MdxFallback } from "./mdx-fallback";
import type { Project } from "contentlayer/generated";

interface ContentRendererProps {
  project: Project;
}

export function ContentRenderer({ project }: ContentRendererProps) {
  // Access the raw markdown content. Try multiple sources as fallback
  // Since _raw.body doesn't exist, use the description as content
  const rawContent = project.body.raw || project.description;

  return (
    <MdxFallback 
      content={rawContent}
      title={project.title}
      description={project.description}
    />
  );
} 