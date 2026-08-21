import { academiaContent, chapterContent, chapterResources, site } from "../content/site.js";
import { eventSourceNote, events } from "../content/events.js";
import { EventFeature } from "../components/events.js";
import { ArrowLink, PageHero, SectionHeading } from "../components/primitives.js";
import { escapeHtml, paragraphs, responsiveImage } from "../components/html.js";

const eventsHero = "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/8c501617-07ca-4ba4-b086-a3b19c152055/Frame+4.png?format=2500w";

export function EventsPage() {
  return `${PageHero({ eyebrow: "Competitions", title: "Events", body: "Take the leap and compete in one of Target Alpha Canada’s four major competitions!", image: eventsHero, imageAlt: "Target Alpha competitions" })}
    <nav class="event-jump" aria-label="Competition navigation">${events.map((event) => `<a href="/events#${event.slug}" data-route-link>${event.acronym}<span>${event.fullTitle}</span></a>`).join("")}</nav>
    <div class="events-directory section-space">${events.map(EventFeature).join("")}</div>
    <aside class="source-note"><strong>Source-content note</strong><p>${escapeHtml(eventSourceNote)}</p></aside>`;
}

export function SpcPage() {
  const spc = events[0];
  return `${PageHero({ eyebrow: "Competition / SPC", title: spc.fullTitle, image: spc.image, imageAlt: "Stock Pitch Competition" })}
    <section class="spc-detail section-space">
      <p class="spc-detail__lead">${escapeHtml(spc.detailDescription)}</p>
      <p>${escapeHtml(spc.partner)}</p>
      <div>${ArrowLink(spc.resourceLabel, spc.resourceUrl)}${ArrowLink(spc.registrationState, spc.registrationUrl, "text-link text-link--muted")}</div>
    </section>`;
}

export function ChapterRegistrationPage() {
  return `${PageHero({ eyebrow: "Chapters", title: "Chapter Registration", year: chapterContent.year, body: chapterContent.introduction, image: chapterContent.image, imageAlt: "Target Alpha chapter members" })}
    <section class="registration-notice"><p>${escapeHtml(chapterContent.registrationNotice)}</p></section>
    <section class="chapter-statement section-space">
      <p class="eyebrow">Start a Target Alpha chapter</p><h2>${escapeHtml(chapterContent.statement)}</h2>
      <div class="chapter-statement__ticker" aria-label="Registration status">${escapeHtml(chapterContent.status)}</div>
      <div class="chapter-statement__actions">${ArrowLink("Register your Chapter Soon!", chapterContent.links.registration, "button-link")}${ArrowLink("Chapter Handbook 25/26", chapterContent.links.handbook)}</div>
    </section>
    <section class="chapter-benefits section-space">
      ${SectionHeading({ eyebrow: "Why start a chapter?", title: chapterContent.benefitsIntro })}
      <div class="chapter-benefits__grid">${chapterContent.benefits.map((benefit, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(benefit)}</p></article>`).join("")}</div>
      ${ArrowLink(". . . and much more!", chapterContent.links.more)}
    </section>
    <section class="chapter-steps section-space">
      ${SectionHeading({ eyebrow: "Process", title: "How to Start a Chapter" })}
      <div class="chapter-steps__list">${chapterContent.steps.map((step, index) => `<details${index === 0 ? " open" : ""}><summary><span>Step ${index + 1}</span><i aria-hidden="true">+</i></summary><div>${paragraphs(step)}</div></details>`).join("")}</div>
    </section>
    <section class="chapter-testimonials section-space">
      ${SectionHeading({ eyebrow: "Chapter presidents / 2024–25", title: "Hear from our chapter presidents" })}
      ${chapterContent.testimonials.map((item, index) => `<article class="chapter-quote chapter-quote--${index + 1}"><figure>${responsiveImage({ src: item.image, alt: item.name })}</figure><div><blockquote>${escapeHtml(item.quote)}</blockquote><p><strong>${escapeHtml(item.name)}</strong>, ${escapeHtml(item.role)}</p></div></article>`).join("")}
    </section>
    <section class="final-cta"><h2>Why wait? Register your chapter now!</h2>${ArrowLink("Register", chapterContent.links.registration, "button-link button-link--light")}</section>`;
}

export function ChapterResourcesPage() {
  return `${PageHero({ eyebrow: "Chapters", title: "Chapter Resources", year: "2025-26", image: "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/c2efafc7-45e5-4fe4-b0be-95938367a1b6/IMG_0098+1.png", imageAlt: "Target Alpha chapter resources" })}
    <section class="resource-index section-space">
      ${chapterResources.map((resource, index) => `<a class="resource-row" href="${resource.href}" target="_blank" rel="noreferrer"><span>${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(resource.label)}</h2><p>${escapeHtml(resource.kind)}</p><i aria-hidden="true">↗</i></a>`).join("")}
      <p class="resource-index__contact">For any chapter-related questions, please contact <a href="mailto:${site.contact.chapters}">${site.contact.chapters}</a></p>
    </section>`;
}

export function AcademiaPage() {
  return `${PageHero({ eyebrow: "Learning", title: "Academia Resources", body: academiaContent.vision, image: eventsHero, imageAlt: "Target Alpha academic resources" })}
    <section class="academia-vision section-space"><span>Vision</span><p>${escapeHtml(academiaContent.vision)}</p></section>
    <section class="academia-resources section-space">
      ${academiaContent.resources.map((resource, index) => `<article class="academia-resource">
        <div class="academia-resource__index">${String(index + 1).padStart(2, "0")}</div>
        <figure>${responsiveImage({ src: resource.image, alt: resource.title })}</figure>
        <div><h2>${escapeHtml(resource.title)}</h2><p>${escapeHtml(resource.body)}</p>${ArrowLink(resource.label, resource.href)}</div>
      </article>`).join("")}
      <p class="resource-index__contact">For related comments or inquiries, reach out to <a href="mailto:${site.contact.academia}">${site.contact.academia}</a>.</p>
    </section>`;
}
