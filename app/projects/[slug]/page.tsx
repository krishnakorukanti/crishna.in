import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
// Commenting out components that may have event handler issues
// import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { Metadata } from "next";
import { constructMetadata } from "@/app/components/SEO";
import { BlogPostingJsonLd } from "@/app/components/JsonLd";
// import { RelatedProjects } from "@/app/components/RelatedProjects";
// import { Breadcrumb } from "@/app/components/Breadcrumb";
// import { SocialShare } from "@/app/components/SocialShare";
// Temporarily removing TableOfContents to fix build errors
// import dynamic from "next/dynamic";

// Temporarily removing TableOfContents to fix build errors
// const TableOfContents = dynamic(
//   () => import('@/app/components/TableOfContents').then(mod => mod.TableOfContents),
//   { ssr: false }
// );

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

// Generate dynamic metadata for each project page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    return constructMetadata({
      title: "Project Not Found",
      description: "This project could not be found",
      noIndex: true,
    });
  }

  // Extract tags for keywords
  const tags = project.tags || [];
  const keywordsString = [...tags, "project", "Crishna Korukanti", "portfolio"].join(", ");

  return constructMetadata({
    title: project.title,
    description: project.description,
    url: `https://crishna.in/projects/${project.slug}`,
    ogImage: `https://crishna.in/og-image.png`,
  });
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  // Get view counts for all projects for related projects component
  const allViewsPromise = Promise.all(
    allProjects.map(async (p) => {
      const viewCount = await redis.get<number>(["pageviews", "projects", p.slug].join(":")) ?? 0;
      return [p.slug, viewCount];
    })
  );
  const allViewsArray = await allViewsPromise;
  const allViews = Object.fromEntries(allViewsArray);

  const formattedDate = project.date 
    ? new Date(project.date).toISOString() 
    : new Date().toISOString();

  return (
    <div className="bg-gradient-to-tl from-black via-zinc-800/20 to-black min-h-screen">
      <BlogPostingJsonLd
        url={`https://crishna.in/projects/${project.slug}`}
        headline={project.title}
        datePublished={formattedDate}
        dateModified={formattedDate}
        authorName="Crishna Korukanti"
        description={project.description}
        image={`https://crishna.in/og-image.png`}
      />
      
      {/* Temporarily removed Breadcrumb component */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <a 
          href="/projects"
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          ← Back to Projects
        </a>
        <h1 className="text-3xl font-bold text-white mt-4">{project.title}</h1>
      </div>
      
      <Header project={project} views={views} />
      {/* Commenting out ReportView which may have client component issues */}
      {/* <ReportView slug={project.slug} /> */}

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless max-w-4xl">
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-zinc-800 relative overflow-hidden">
          <Mdx code={project.body.code} />
        </div>
      </article>
      
      {/* Temporarily removing interactive components that cause build issues */}
      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="mb-10">
          {/* SocialShare component removed temporarily */}
          <div className="p-4 border border-zinc-800 rounded-lg">
            <h3 className="text-xl font-semibold text-zinc-200 mb-2">Share this project</h3>
            <p className="text-zinc-400">
              Share URL: {`https://crishna.in/projects/${project.slug}`}
            </p>
          </div>
        </div>
        
        {/* RelatedProjects component removed temporarily */}
        <div className="border border-zinc-800 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-zinc-200 mb-4">Related Projects</h3>
          <p className="text-zinc-400">Check out other projects in the main projects section.</p>
          <div className="mt-4">
            <a 
              href="/projects" 
              className="inline-block px-4 py-2 bg-zinc-800 text-zinc-200 rounded-md"
            >
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
