import React from "react";
import { clsx } from "@/lib/utils";

interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

interface ProjectMetricsProps {
  metrics: MetricItem[];
  className?: string;
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({
  metrics,
  className,
}) => {
  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-6 my-12", className)}>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center"
        >
          <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {metric.value}
          </div>
          <div className="text-base font-semibold text-gray-900 mb-1">
            {metric.label}
          </div>
          {metric.description && (
            <div className="text-sm text-gray-500">{metric.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};

