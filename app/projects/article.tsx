import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	// Generate a random gradient color for each project
	const gradientColors = [
		"from-blue-500/40 to-purple-600/40",
		"from-amber-500/40 to-orange-600/40",
		"from-emerald-500/40 to-teal-600/40",
		"from-pink-500/40 to-rose-600/40",
		"from-indigo-500/40 to-blue-600/40",
	];
	
	const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];
	
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8 group relative h-full">
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
				
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				
				<h2 className="z-20 text-xl font-medium duration-300 lg:text-2xl text-zinc-200 group-hover:text-white font-display mt-2">
					{project.title}
				</h2>
				
				<p className="z-20 mt-4 text-sm duration-300 text-zinc-400 group-hover:text-zinc-200">
					{project.description}
				</p>
				
				<div className="mt-4 flex justify-between items-center">
					<div className="flex flex-wrap gap-2 mt-2">
						{project.tags && project.tags.slice(0, 3).map((tag, idx) => (
							<span key={idx} className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">
								{tag}
							</span>
						))}
					</div>
					
					<p className="text-zinc-400 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-blue-400">
						View <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
					</p>
				</div>
			</article>
		</Link>
	);
};
