"use client";

import React from "react";
import { MdxFallback } from "./mdx-fallback";

interface ContentRendererProps {
  project: {
    _raw: {
      sourceFileDir: string;
      sourceFileName: string;
      sourceFilePath: string;
      contentType: string;
      flattenedPath: string;
      body: string;
    };
    body: {
      code: string;
      raw?: string;
    };
    title: string;
    description: string;
  };
}

export function ContentRenderer({ project }: ContentRendererProps) {
  // Access the raw markdown content from _raw.body which contains the original markdown
  // before MDX compilation. This bypasses the contentlayer MDX compilation entirely.
  const rawContent = project._raw?.body || project.body.raw || project.description;

  return (
    <MdxFallback 
      content={rawContent}
      title={project.title}
      description={project.description}
    />
  );
} 