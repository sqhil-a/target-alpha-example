import { existsSync } from "node:fs";
import { routes } from "../src/content/routes.js";
import { nationalTeams } from "../src/content/team.js";
import { regionalTeams } from "../src/content/regionalExecutives.js";
import { judges } from "../src/content/judges.js";
import { events } from "../src/content/events.js";
import { news } from "../src/content/news.js";

const issues = [];
const allLinks = [
  ...events.flatMap((item) => [item.registrationUrl, item.resourceUrl]),
  ...news.flatMap((item) => [item.articleUrl, item.videoUrl])
].filter(Boolean);

if (new Set(routes.map((route) => route.path)).size !== routes.length) issues.push("Duplicate route paths");
if (allLinks.some((link) => link === "#")) issues.push("Placeholder link found");
if (!nationalTeams["2025-26"]?.members.length) issues.push("Current national team is empty");
if (!regionalTeams["2025-26"]?.members.length) issues.push("Current regional team is empty");
if (judges.length !== 15) issues.push(`Expected 15 judges, found ${judges.length}`);
if (!existsSync("index.html") || !existsSync("src/main.js")) issues.push("Application shell is missing");

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`Checks passed: ${routes.length} routes, ${Object.values(nationalTeams).reduce((sum, cohort) => sum + cohort.members.length, 0)} national executives, ${Object.values(regionalTeams).reduce((sum, cohort) => sum + cohort.members.length, 0)} regional executives, ${judges.length} judges.`);
