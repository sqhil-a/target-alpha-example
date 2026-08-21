import { findRoute } from "./content/routes.js";
import { PageShell } from "./components/layout.js";
import { HomePage } from "./pages/home.js";
import { ProfilePage, RegionalOverviewPage, RegionalTeamPage, TeamPage } from "./pages/people.js";
import { AcademiaPage, ChapterRegistrationPage, ChapterResourcesPage, EventsPage, SpcPage } from "./pages/programs.js";
import { AboutPage, ContactPage, JudgesPage, NewsPage, NotFoundPage, PartnersPage, SearchPage, SponsorsPage } from "./pages/institutional.js";

const app = document.querySelector("#app");
const fileMode = location.protocol === "file:";
const httpAssetRoot = (window.__TA_HTTP_ASSET_ROOT__ || "").replace(/\/$/, "");
const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let fallbackTransitionTimer;
let fallbackCleanupTimer;

function transition(update) {
  if (prefersReducedMotion()) {
    update();
    return null;
  }
  if (document.startViewTransition) {
    return document.startViewTransition(update);
  }
  clearTimeout(fallbackTransitionTimer);
  clearTimeout(fallbackCleanupTimer);
  document.body.classList.remove("route-entering");
  document.body.classList.add("route-leaving");
  fallbackTransitionTimer = setTimeout(() => {
    update();
    document.body.classList.remove("route-leaving");
    document.body.classList.add("route-entering");
    fallbackCleanupTimer = setTimeout(() => document.body.classList.remove("route-entering"), 560);
  }, 150);
  return null;
}

function currentView() {
  if (!fileMode) {
    const pathname = httpAssetRoot && location.pathname.startsWith(httpAssetRoot)
      ? location.pathname.slice(httpAssetRoot.length) || "/"
      : location.pathname;
    return { pathname, search: location.search, anchor: location.hash };
  }

  const hashRoute = location.hash.startsWith("#/") ? location.hash.slice(1) : window.__TA_INITIAL_ROUTE__ || "/";
  const [pathAndSearch, anchor = ""] = hashRoute.split("#", 2);
  const [pathname, query = ""] = pathAndSearch.split("?", 2);
  return {
    pathname: pathname || "/",
    search: query ? `?${query}` : "",
    anchor: anchor ? `#${anchor}` : ""
  };
}

function pageFor(route, view) {
  if (!route) return NotFoundPage();
  switch (route.type) {
    case "home": return HomePage();
    case "about": return AboutPage();
    case "team": return TeamPage(route.year);
    case "regionalOverview": return RegionalOverviewPage();
    case "regionalTeam": return RegionalTeamPage(route.year);
    case "profile": return ProfilePage(route.person);
    case "judges": return JudgesPage();
    case "news": return NewsPage();
    case "events": return EventsPage();
    case "spc": return SpcPage();
    case "chapterRegistration": return ChapterRegistrationPage();
    case "chapterResources": return ChapterResourcesPage();
    case "academia": return AcademiaPage();
    case "sponsors": return SponsorsPage();
    case "partners": return PartnersPage();
    case "contact": return ContactPage();
    case "search": return SearchPage(new URLSearchParams(view.search).get("q") || "");
    default: return NotFoundPage();
  }
}

function updateMetadata(route, view) {
  const fallback = {
    title: "Page not found — Target Alpha Canada",
    description: "The requested Target Alpha Canada page could not be found."
  };
  const meta = route || fallback;
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://targetalpha.ca${view.pathname}`);
}

function initInteractions(currentPath) {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const setMenu = (open) => {
    toggle?.setAttribute("aria-expanded", String(open));
    if (menu) menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  };
  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  document.onkeydown = (event) => event.key === "Escape" && setMenu(false);

  const header = document.querySelector("[data-header]");
  const updateHeader = () => header?.classList.toggle("site-header--scrolled", scrollY > 16);
  updateHeader();
  window.onscroll = updateHeader;

  document.querySelectorAll(".site-header a[href]").forEach((link) => {
    const linkPath = new URL(link.href, location.origin).pathname.replace(/\/+$/, "") || "/";
    if (linkPath === currentPath) link.setAttribute("aria-current", "page");
  });

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealTargets = document.querySelectorAll("main > section:not(:first-child), .department, .event-feature, .judge-row, .partner-feature, .academia-resource, .resource-row, .contact-row");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
      observer.observe(element);
    });
  }
}

function render({ scroll = true } = {}) {
  document.body.classList.remove("menu-open");
  const view = currentView();
  const route = findRoute(view.pathname);
  const page = PageShell(pageFor(route, view), route?.type ? `page page--${route.type}` : "page page--not-found");
  app.innerHTML = httpAssetRoot ? page.replace(/href="\/(?!\/)/g, `href="${httpAssetRoot}/`) : page;
  updateMetadata(route, view);
  initInteractions(view.pathname.replace(/\/+$/, "") || "/");
  requestAnimationFrame(() => {
    if (view.anchor) document.querySelector(view.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (scroll) scrollTo({ top: 0, behavior: "instant" });
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route-link]");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const rawHref = link.getAttribute("href") || "";
  if (fileMode && rawHref.startsWith("/")) {
    event.preventDefault();
    const nextHash = `#${rawHref}`;
    transition(() => {
      if (location.hash !== nextHash) history.pushState({}, "", nextHash);
      render();
    });
    return;
  }
  const url = new URL(link.href, location.origin);
  if (url.origin !== location.origin) return;
  event.preventDefault();
  transition(() => {
    history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    render();
  });
});

document.addEventListener("submit", (event) => {
  if (!fileMode || !event.target.matches(".search-form")) return;
  event.preventDefault();
  const query = event.target.querySelector('[name="q"]')?.value.trim() || "";
  transition(() => {
    history.pushState({}, "", `#/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    render();
  });
});

addEventListener("popstate", () => transition(() => render({ scroll: false })));
render();
if (prefersReducedMotion()) document.body.classList.add("site-ready");
else setTimeout(() => document.body.classList.add("site-ready"), 850);
