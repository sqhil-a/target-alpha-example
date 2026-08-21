import { nationalProfileRoutes } from "./team.js";
import { regionalProfileRoutes } from "./regionalExecutives.js";

const baseRoutes = [
  { path: "/", type: "home", title: "Target Alpha Canada", description: "Canada’s largest student-led organization working towards promoting financial literacy among youth." },
  { path: "/targetalpha", type: "about", title: "About Target Alpha — Target Alpha Canada", description: "Target Alpha’s mission, vision, history, and future aspirations." },
  { path: "/about", type: "about", title: "About Target Alpha — Target Alpha Canada", description: "Target Alpha’s mission, vision, history, and future aspirations." },
  { path: "/team25-26", type: "team", year: "2025-26", title: "2025–26 National Team — Target Alpha Canada", description: "Meet Target Alpha Canada’s 2025–26 National Team." },
  { path: "/team24-25-1", type: "team", year: "2024-25", title: "2024–25 National Team — Target Alpha Canada", description: "Target Alpha Canada’s 2024–25 National Team archive." },
  { path: "/team23-24", type: "team", year: "2023-24", title: "2023–24 National Team — Target Alpha Canada", description: "Target Alpha Canada’s 2023–24 National Team archive." },
  { path: "/team22-23", type: "team", year: "2022-23", title: "2022–23 National Team — Target Alpha Canada", description: "Target Alpha Canada’s 2022–23 National Team archive." },
  { path: "/regional-executives", type: "regionalOverview", title: "Regional Executives — Target Alpha Canada", description: "Learn about Target Alpha’s Regional Executive program and apply to join." },
  { path: "/2025-2026-regional-executive", type: "regionalTeam", year: "2025-26", title: "2025–26 Regional Executives — Target Alpha Canada", description: "Target Alpha Canada’s 2025–26 Regional Executives." },
  { path: "/regional-executives-2025", type: "regionalTeam", year: "2024-25", title: "2024–25 Regional Executives — Target Alpha Canada", description: "Target Alpha Canada’s 2024–25 Regional Executive archive." },
  { path: "/regional-executives-2024", type: "regionalTeam", year: "2023-24", title: "2023–24 Regional Executives — Target Alpha Canada", description: "Target Alpha Canada’s 2023–24 Regional Executive archive." },
  { path: "/judges", type: "judges", title: "Judges — Target Alpha Canada", description: "Meet former judges from Target Alpha Canada’s competitions." },
  { path: "/news", type: "news", title: "In the News — Target Alpha Canada", description: "Target Alpha Canada media features and coverage." },
  { path: "/events", type: "events", title: "Events — Target Alpha Canada", description: "Explore Target Alpha Canada’s national student finance competitions." },
  { path: "/events-1", type: "spc", title: "SPC — Target Alpha Canada", description: "Target Alpha Canada’s Stock Pitch Competition." },
  { path: "/chapter-registration", type: "chapterRegistration", title: "Chapter Registration — Target Alpha Canada", description: "Start and register a Target Alpha chapter at your school or in your community." },
  { path: "/chapters", type: "chapterRegistration", title: "Chapter Registration — Target Alpha Canada", description: "Start and register a Target Alpha chapter at your school or in your community." },
  { path: "/chapter-resources", type: "chapterResources", title: "Chapter Resources — Target Alpha Canada", description: "Target Alpha chapter handbooks, resources, and social media templates." },
  { path: "/academia", type: "academia", title: "Academia — Target Alpha Canada", description: "Target Alpha Canada finance guidebooks and case study lessons." },
  { path: "/sponsors", type: "sponsors", title: "Sponsors — Target Alpha Canada", description: "Past sponsors of Target Alpha Canada." },
  { path: "/partners", type: "partners", title: "Partners — Target Alpha Canada", description: "Target Alpha Canada’s academic partners." },
  { path: "/contact", type: "contact", title: "Contact Us — Target Alpha Canada", description: "Contact Target Alpha Canada about chapters, partnerships, or judging." },
  { path: "/search", type: "search", title: "Search — Target Alpha Canada", description: "Search Target Alpha Canada’s pages, people, events, and resources." }
];

export const routes = [...baseRoutes, ...nationalProfileRoutes(), ...regionalProfileRoutes()];

export function normalizePath(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return clean === "/shams-guliyeva" ? "/shams-guliyeva" : clean;
}

export function findRoute(pathname) {
  const path = normalizePath(pathname);
  return routes.find((route) => route.path === path) || null;
}
