import { escapeHtml, responsiveImage } from "./html.js";
import { ArrowLink } from "./primitives.js";

export function EventFeature(event, index) {
  return `<article class="event-feature" id="${event.slug}">
    <div class="event-feature__index"><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(event.acronym)}</b></div>
    <figure class="event-feature__image">${responsiveImage({ src: event.image, alt: `${event.fullTitle} participants` })}</figure>
    <div class="event-feature__copy">
      <h2>${escapeHtml(event.fullTitle)}</h2>
      <p>${escapeHtml(event.description)}</p>
      <dl>
        ${event.statistic ? `<div><dt>Participation</dt><dd>${escapeHtml(event.statistic)}</dd></div>` : ""}
        ${event.date ? `<div><dt>Date</dt><dd>${escapeHtml(event.date)}</dd></div>` : ""}
        ${event.registrationState ? `<div><dt>Registration</dt><dd>${escapeHtml(event.registrationState)}</dd></div>` : ""}
      </dl>
      ${event.partner ? `<p class="event-feature__partner">${escapeHtml(event.partner)}</p>` : ""}
      <div class="event-feature__actions">
        ${event.resourceUrl ? ArrowLink(event.resourceLabel, event.resourceUrl) : ""}
        ${event.registrationUrl ? ArrowLink(event.registrationState, event.registrationUrl, "text-link text-link--muted") : ""}
      </div>
    </div>
  </article>`;
}
