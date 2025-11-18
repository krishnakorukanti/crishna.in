import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import { getPublishedProjects } from "@/lib/projects";

dotenv.config();

const redis = Redis.fromEnv();

async function main() {
  // Projects to seed views for
  const projects = await getPublishedProjects();

  console.log(`Found ${projects.length} published projects to seed views for...`);

  // Generate random view counts between 100 and 10,000 for each project
  for (const project of projects) {
    const randomViews = Math.floor(Math.random() * 9900) + 100;
    try {
      await redis.set(["pageviews", "projects", project.slug].join(":"), randomViews);
      console.log(`✅ Seeded ${randomViews} views for ${project.title}`);
    } catch (error) {
      console.error(`❌ Failed to seed views for ${project.title}:`, error);
    }
  }

  console.log("🎉 View count seeding completed!");
}

main().catch(console.error); 