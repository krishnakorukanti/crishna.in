import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { Metadata } from "next";
import { constructMetadata } from "@/app/components/SEO";
import { BlogPostingJsonLd } from "@/app/components/JsonLd";
import { RelatedProjects } from "@/app/components/RelatedProjects";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import { SocialShare } from "@/app/components/SocialShare";
import dynamic from "next/dynamic";

// Import TableOfContents component dynamically since it uses browser APIs
const TableOfContents = dynamic(
  () => import('@/app/components/TableOfContents').then(mod => mod.TableOfContents),
  { ssr: false }
);

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
    ogImage: project.image || `https://crishna.in/og-image.png`,
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
        image={project.image || `https://crishna.in/og-image.png`}
      />
      
      <Breadcrumb 
        items={[
          { label: 'Projects', href: '/projects' },
          { label: project.title, href: `/projects/${slug}`, isCurrentPage: true }
        ]} 
      />
      
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <TableOfContents />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless max-w-4xl">
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-zinc-800 relative overflow-hidden">
          <Mdx code={project.body.code} />
        </div>
      </article>
      
      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="mb-10">
          <SocialShare
            url={`https://crishna.in/projects/${project.slug}`}
            title={project.title}
            description={project.description}
          />
        </div>
        
        <RelatedProjects 
          currentProjectSlug={slug} 
          allProjects={allProjects.filter(p => p.published)} 
          views={allViews}
        />
      </div>
    </div>
  );
}
