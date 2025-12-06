import React from "react";
import { Metadata } from "next";
import resumeData from "./resume-data.json";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: `Resume | ${resumeData.basics.name}`,
  description: `Resume of ${resumeData.basics.name} - ${resumeData.basics.label}`,
};

export default function ResumePage() {
  return <ResumeClient />;
}
