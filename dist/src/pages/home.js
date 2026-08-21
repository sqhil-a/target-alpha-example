import { homeContent } from "../content/site.js";
import { stats } from "../content/stats.js";
import { events } from "../content/events.js";
import { ArrowLink, SectionHeading } from "../components/primitives.js";
import { escapeHtml, responsiveImage } from "../components/html.js";

const heroImages = [
  "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/f4fdb13b-650d-400a-9679-e5b95b0d90ec/IMG_8598.JPG?format=1500w",
  "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/dbd1d3a9-31a0-4fd0-bd2b-3060314c117f/IMG_8605.JPG?format=1500w",
  "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/a064c448-5013-4787-ad9f-ca81e802e030/DSC_0609.jpg?format=1500w"
];

export function HomePage() {
  return `<section class="home-hero">
    <div class="home-hero__masthead" aria-label="Target Alpha">
      <span class="home-hero__meta">Canada / Since 2013</span>
      <h1><span>Target</span><span>Alpha</span></h1>
      <div class="home-hero__alpha" aria-hidden="true">α</div>
    </div>
    <div class="home-hero__thesis">
      <p>${escapeHtml(homeContent.hero)}</p>
      ${ArrowLink("Get Involved", "/events", "button-link")}
    </div>
    <div class="home-hero__collage">
      <figure class="home-hero__image home-hero__image--one">${responsiveImage({ src: heroImages[0], alt: "Target Alpha students at a national event", eager: true })}</figure>
      <figure class="home-hero__image home-hero__image--two">${responsiveImage({ src: heroImages[1], alt: "Students collaborating at a Target Alpha event", eager: true })}</figure>
      <figure class="home-hero__image home-hero__image--three">${responsiveImage({ src: heroImages[2], alt: "Target Alpha event participants" })}</figure>
      <span class="home-hero__caption">Financial literacy / real-time competition / nationwide chapters</span>
    </div>
  </section>
  <section class="home-ledger" aria-label="Target Alpha at a glance">
    ${stats.map((stat) => `<div class="home-ledger__item"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`).join("")}
    <p>${escapeHtml(homeContent.about)}</p>
  </section>
  <section class="home-about section-space">
    ${SectionHeading({ eyebrow: "About us", title: "Built by students. Established nationwide." })}
    <div class="home-about__copy">
      <p>${escapeHtml(homeContent.about)}</p>
      ${ArrowLink("About Target Alpha", "/targetalpha")}
    </div>
    <div class="home-about__year"><span>Founded</span><strong>2013</strong></div>
  </section>
  <section class="home-events section-space">
    <div class="home-events__intro">
      ${SectionHeading({ eyebrow: "Our events", title: "Three formats. One national stage.", body: homeContent.events })}
      ${ArrowLink("Explore every event", "/events")}
    </div>
    <div class="home-events__list">
      ${events.map((event, index) => `<a class="home-event-row" href="/events#${event.slug}" data-route-link>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(event.acronym)}</strong>
        <h3>${escapeHtml(event.fullTitle)}</h3>
        <i aria-hidden="true">↗</i>
      </a>`).join("")}
    </div>
  </section>
  <section class="home-chapter section-space">
    <div class="home-chapter__stamp" aria-hidden="true">75+</div>
    <div class="home-chapter__copy">
      <p class="eyebrow">Start a chapter</p>
      <h2>Lead financial literacy at your school or in your community.</h2>
      <p>${escapeHtml(homeContent.chapter)}</p>
      ${ArrowLink("Take Action", "/chapter-registration", "button-link button-link--light")}
    </div>
    <figure>${responsiveImage({ src: heroImages[0], alt: "Target Alpha chapter members" })}</figure>
  </section>`;
}
