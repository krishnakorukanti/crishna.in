const { Redis } = require("@upstash/redis");
const { allProjects } = require(".contentlayer/generated");

const redis = Redis.fromEnv();

async function main() {
  // Projects to seed views for
  const projects = allProjects.filter(p => p.published);

  console.log(`Found ${projects.length} published projects to seed views for...`);

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