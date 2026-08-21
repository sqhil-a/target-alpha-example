import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { routes } from "../src/content/routes.js";
import { bundle } from "./bundle.mjs";

const root = process.cwd();
const output = join(root, "dist");
const shell = readFileSync(join(root, "index.html"), "utf8");
const publicBasePath = (process.env.PUBLIC_BASE_PATH || "").replace(/\/$/, "");
bundle();

if (existsSync(output)) rmSync(output, { recursive: true });
mkdirSync(output, { recursive: true });
cpSync(join(root, "src"), join(output, "src"), { recursive: true });
cpSync(join(root, "public"), output, { recursive: true });
cpSync(join(root, "app.js"), join(output, "app.js"));

const escapeAttr = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

for (const route of routes) {
  const canonical = `https://targetalpha.ca${route.path === "/" ? "/" : route.path}`;
  const fileAssetRoot = route.path === "/" ? "." : "..";
  const html = shell
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(route.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(route.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace('window.__TA_FILE_ASSET_ROOT__ = ".";', `window.__TA_FILE_ASSET_ROOT__ = "${fileAssetRoot}";`)
    .replace('window.__TA_HTTP_ASSET_ROOT__ = "";', `window.__TA_HTTP_ASSET_ROOT__ = "${publicBasePath}";`)
    .replace('content="/og-image.svg"', `content="${publicBasePath}/og-image.svg"`)
    .replace('window.__TA_INITIAL_ROUTE__ = "/";', `window.__TA_INITIAL_ROUTE__ = "${route.path}";`);
  const target = route.path === "/" ? join(output, "index.html") : join(output, route.path.slice(1), "index.html");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

writeFileSync(join(output, "404.html"), shell
  .replace('window.__TA_HTTP_ASSET_ROOT__ = "";', `window.__TA_HTTP_ASSET_ROOT__ = "${publicBasePath}";`)
  .replace('content="/og-image.svg"', `content="${publicBasePath}/og-image.svg"`));
writeFileSync(join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(({ path }) => `  <url><loc>https://targetalpha.ca${path === "/" ? "/" : path}</loc></url>`).join("\n")}\n</urlset>\n`);
writeFileSync(join(output, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://targetalpha.ca/sitemap.xml\n");
console.log(`Built ${routes.length} routes in dist/`);
