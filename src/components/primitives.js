import { escapeHtml, linkAttrs, responsiveImage } from "./html.js";

export function ArrowLink(label, href, className = "text-link") {
  return `<a class="${className}" ${linkAttrs(href)}${href.startsWith("/") ? " data-route-link" : ""}>${escapeHtml(label)}<span aria-hidden="true">↗</span></a>`;
}

export function PageHero({ eyebrow, title, body = "", year = "", image = "", imageAlt = "", modifier = "" }) {
  return `<section class="page-hero ${modifier}">
    <div class="page-hero__rail"><span>${escapeHtml(eyebrow)}</span>${year ? `<b>${escapeHtml(year)}</b>` : ""}</div>
    <div class="page-hero__title"><h1>${escapeHtml(title)}</h1>${body ? `<p>${escapeHtml(body)}</p>` : ""}</div>
    ${image ? `<figure class="page-hero__image">${responsiveImage({ src: image, alt: imageAlt, eager: true })}</figure>` : ""}
  </section>`;
}

export function SectionHeading({ eyebrow, title, body = "" }) {
  return `<header class="section-heading">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h2>${escapeHtml(title)}</h2>
    ${body ? `<p>${escapeHtml(body)}</p>` : ""}
  </header>`;
}

export function ArchiveNav({ label, items, current }) {
  return `<nav class="archive-nav" aria-label="${escapeHtml(label)}">
    <span>${escapeHtml(label)}</span>
    ${items.map((item) => `<a href="${item.path}" data-route-link${item.year === current ? ' aria-current="page"' : ""}>${escapeHtml(item.year)}</a>`).join("")}
  </nav>`;
}
