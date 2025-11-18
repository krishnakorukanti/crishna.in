import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const redis = Redis.fromEnv();

// Sample projects to seed (fallback list when running the JS version of the script)
const projects = [
  { slug: "letmedoit", title: "LetMeDoIt" },
  { slug: "survey-heart-android", title: "Survey Heart Android" },
  { slug: "soleilspace.com", title: "SoleilSpace" },
  { slug: "biskit", title: "Biskit" },
  { slug: "perc", title: "Perc" },
  { slug: "crishna.in", title: "Crishna.in" },
];

async function main() {
  console.log(`Found ${projects.length} projects to seed views for...`);

  // Generate random views between 100 and 10000 for each project
  for (const project of projects) {
    const viewKey = ["pageviews", "projects", project.slug].join(":");
    const randomViews = Math.floor(Math.random() * (10000 - 100 + 1) + 100);
    
    try {
      await redis.set(viewKey, randomViews);
      console.log(`✅ Seeded ${randomViews} views for ${project.title}`);
    } catch (error) {
      console.error(`❌ Failed to seed views for ${project.title}:`, error);
    }
  }

  console.log("\n🎉 View count seeding completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding view counts:", err);
  process.exit(1);
}); 