import React from "react";
import { Metadata } from "next";
import { constructMetadata } from "../components/SEO";
import ProjectsSection from "../components/sections/ProjectsSection";

export const metadata: Metadata = constructMetadata({
  title: "Projects | Crishna Korukanti",
  description: "Browse through my portfolio of projects, showcasing my expertise in full-stack development, mobile applications, and AI integration.",
});

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <ProjectsSection showAllProjects={true} />
    </div>
  );
}
