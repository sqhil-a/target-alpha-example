import { aboutContent, partners, site, sponsorLogos } from "../content/site.js";
import { judges } from "../content/judges.js";
import { news } from "../content/news.js";
import { routes } from "../content/routes.js";
import { PageHero, SectionHeading, ArrowLink } from "../components/primitives.js";
import { escapeHtml, paragraphs, responsiveImage } from "../components/html.js";

export function AboutPage() {
  return `${PageHero({ eyebrow: "About", title: "Target Alpha", body: aboutContent.introduction, image: aboutContent.image, imageAlt: "Target Alpha students" })}
    <section class="about-statements section-space">
      ${aboutContent.sections.map((section, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></article>`).join("")}
    </section>`;
}

export function JudgesPage() {
  return `${PageHero({ eyebrow: "Competition network", title: "Judges", body: "Meet several of our former competition judges!", image: "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/83192d05-1111-4f7d-8bcd-cf37e7c25d30/Frame+1.png?format=2500w", imageAlt: "Target Alpha judges" })}
    <section class="judges-list section-space">
      ${judges.map((judge, index) => `<article class="judge-row">
        <div class="judge-row__index">${String(index + 1).padStart(2, "0")}</div>
        <figure>${responsiveImage({ src: judge.image, alt: judge.name })}</figure>
        <div class="judge-row__copy"><h2>${escapeHtml(judge.name)}</h2><p>${escapeHtml(judge.bio)}</p><p class="judge-row__note">${escapeHtml(judge.note)}</p></div>
      </article>`).join("")}
    </section>`;
}

export function NewsPage() {
  return `${PageHero({ eyebrow: "Media", title: "Features", image: "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/06fe132d-fcf2-4f4d-a20d-68a365765a49/1717096200374+%281%29.jpg", imageAlt: "Target Alpha media feature" })}
    <section class="news-list section-space">
      ${news.map((item, index) => `<article class="news-feature">
        <figure>${responsiveImage({ src: item.image, alt: item.headline })}<span>${String(index + 1).padStart(2, "0")}</span></figure>
        <div><p class="eyebrow">${escapeHtml(item.publication)}</p><h2>${escapeHtml(item.headline)}</h2><div>${item.videoUrl ? ArrowLink("Watch Here", item.videoUrl) : ""}${ArrowLink("Read Here", item.articleUrl)}</div></div>
      </article>`).join("")}
    </section>`;
}

export function SponsorsPage() {
  return `${PageHero({ eyebrow: "Support", title: "Sponsors", body: "PAST SPONSORS", image: "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/d55fb6fb-803f-4e9e-ac65-079b46f000b2/R.jpg", imageAlt: "Target Alpha sponsor" })}
    <section class="sponsor-wall section-space" aria-label="Past sponsors">
      ${sponsorLogos.map((sponsor, index) => `<figure><span>${String(index + 1).padStart(2, "0")}</span>${responsiveImage({ src: sponsor.image, alt: sponsor.name })}</figure>`).join("")}
    </section>
    <p class="sponsor-contact">For sponsorship inquiries, please contact <a href="mailto:${site.contact.partnerships}">${site.contact.partnerships}</a></p>`;
}

export function PartnersPage() {
  return `${PageHero({ eyebrow: "2025–26", title: "Academic Partners", image: "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/032530cf-e468-4047-b4e8-77812ac67518/harb.png", imageAlt: "Target Alpha academic partners" })}
    <section class="partners-list section-space">
      ${partners.map((partner, index) => `<article class="partner-feature">
        <div class="partner-feature__label"><span>${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(partner.shortName)}</h2><p>${escapeHtml(partner.subheading)}</p></div>
        <figure>${responsiveImage({ src: partner.image, alt: partner.name })}</figure>
        <div class="partner-feature__copy"><p>${escapeHtml(partner.description)}</p>${ArrowLink("Visit partner", partner.href)}</div>
      </article>`).join("")}
      <p class="resource-index__contact">For partnership inquiries, please contact <a href="mailto:${site.contact.academicPartners}">${site.contact.academicPartners}</a></p>
    </section>`;
}

export function ContactPage() {
  const contacts = [
    ["Interested in starting a chapter?", site.contact.chapters],
    ["Interested in partnering with Target Alpha to provide venues, funds, or prizes?", site.contact.partnerships],
    ["Interested in judging at a conference?", site.contact.judges]
  ];
  return `${PageHero({ eyebrow: "Direct line", title: "Contact Us", image: "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/38794e66-926f-4280-ba2c-c379fb16ff9f/57451144_1078455132338334_5853161167333097472_n.jpg", imageAlt: "Target Alpha community" })}
    <section class="contact-list section-space">
      ${contacts.map(([question, email], index) => `<a class="contact-row" href="mailto:${email}"><span>${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(question)}</h2><p>${email}</p><i aria-hidden="true">↗</i></a>`).join("")}
    </section>`;
}

export function SearchPage(query = "") {
  const normalized = query.trim().toLowerCase();
  const results = normalized ? routes.filter((route) => `${route.title} ${route.description}`.toLowerCase().includes(normalized)).slice(0, 24) : [];
  return `<section class="search-page section-space">
    <p class="eyebrow">Site index</p><h1>Search Target Alpha</h1>
    <form class="search-form" action="/search" method="get"><label for="site-search">Search pages, people, events, and resources</label><div><input id="site-search" type="search" name="q" value="${escapeHtml(query)}" placeholder="Type to search…" autocomplete="off" /><button type="submit">Search</button></div></form>
    <div class="search-results" aria-live="polite">${normalized ? results.length ? results.map((route) => `<a href="${route.path}" data-route-link><span>${escapeHtml(route.type)}</span><h2>${escapeHtml(route.title.replace(" — Target Alpha Canada", ""))}</h2><p>${escapeHtml(route.description)}</p><i aria-hidden="true">↗</i></a>`).join("") : `<p>No matching pages. Try a person’s name, an event acronym, or “chapter”.</p>` : `<p>Search the complete site directory.</p>`}</div>
  </section>`;
}

export function NotFoundPage() {
  return `<section class="not-found section-space"><p class="eyebrow">404 / Not found</p><h1>We couldn't find the page you were looking for.</h1><p>This is either because there is an error in the URL entered into your web browser, or the page you are looking for has been moved or deleted.</p>${ArrowLink("Return to our homepage", "/")}${ArrowLink("Search the site", "/search", "text-link text-link--muted")}</section>`;
}
