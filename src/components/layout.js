import { navigation, site } from "../content/site.js";
import { events } from "../content/events.js";
import { stats } from "../content/stats.js";
import { escapeHtml, linkAttrs } from "./html.js";

function navItem(item, mobile = false) {
  if (item.children) {
    return `<details class="nav-group${mobile ? " nav-group--mobile" : ""}">
      <summary>${escapeHtml(item.label)}<span aria-hidden="true">+</span></summary>
      <div class="nav-dropdown">
        ${item.children.map((child) => `<a href="${child.href}" data-route-link>${escapeHtml(child.label)}<span aria-hidden="true">↗</span></a>`).join("")}
      </div>
    </details>`;
  }
  return `<a class="nav-link" href="${item.href}" data-route-link>${escapeHtml(item.label)}</a>`;
}

export function Header() {
  return `<header class="site-header" data-header>
    <a class="brand" href="/" aria-label="Target Alpha Canada home" data-route-link>
      <img src="${site.logo}" alt="" width="38" height="38" />
      <span class="brand__name">Target Alpha</span>
      <span class="brand__country">CA</span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      ${navigation.map((item) => navItem(item)).join("")}
    </nav>
    <button class="menu-toggle" type="button" aria-controls="mobile-menu" aria-expanded="false" data-menu-toggle>
      <span>Menu</span><i aria-hidden="true"></i>
    </button>
    <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
      <div class="mobile-menu__inner">
        <div class="mobile-menu__index">National navigation / ${site.founded}—present</div>
        <nav aria-label="Mobile navigation">
          ${navigation.map((item) => navItem(item, true)).join("")}
        </nav>
        <div class="mobile-menu__footer">
          <a ${linkAttrs(site.social.instagram)}>Instagram</a>
          <a ${linkAttrs(site.social.linkedin)}>LinkedIn</a>
        </div>
      </div>
    </div>
  </header>`;
}

export function IndexTape() {
  const entries = [
    ...stats.map((item) => `${item.value} ${item.label}`),
    ...events.map((event) => `${event.acronym} · ${event.fullTitle}`),
    "Ontario · BC · Alberta",
    `Since ${site.founded}`
  ];
  const content = entries.map((entry) => `<span>${escapeHtml(entry)}</span><b aria-hidden="true">◆</b>`).join("");
  return `<div class="index-tape" aria-label="Target Alpha facts and programs"><span class="sr-only">${escapeHtml(entries.join("; "))}</span><div class="index-tape__track" aria-hidden="true">${content}${content}</div></div>`;
}

export function Newsletter() {
  return `<section class="newsletter" aria-labelledby="newsletter-title">
    <div>
      <p class="eyebrow">National briefing</p>
      <h2 id="newsletter-title">Stay up to date with all our latest updates.</h2>
    </div>
    <form class="newsletter__form" method="post" action="${site.newsletter.action}" target="_blank" data-form-id="${site.newsletter.formId}">
      <input type="hidden" name="formId" value="${site.newsletter.formId}" />
      <input type="hidden" name="collectionId" value="${site.newsletter.collectionId}" />
      <label for="newsletter-email">Email address</label>
      <div class="newsletter__control">
        <input id="newsletter-email" name="email" type="email" autocomplete="email" placeholder="Email Address" required />
        <button type="submit">Subscribe <span aria-hidden="true">↗</span></button>
      </div>
      <p class="form-note">Subscription is completed through Target Alpha’s existing newsletter service.</p>
    </form>
  </section>`;
}

export function Footer() {
  const sitemap = navigation.flatMap((item) => item.children || [item]);
  return `<footer class="site-footer">
    ${Newsletter()}
    <div class="footer-grid">
      <a class="footer-mark" href="/" data-route-link aria-label="Target Alpha Canada home">
        <span>TA</span><small>CANADA<br />SINCE ${site.founded}</small>
      </a>
      <nav aria-label="Footer navigation" class="footer-nav">
        ${sitemap.map((item) => `<a href="${item.href}" data-route-link>${escapeHtml(item.label)}</a>`).join("")}
      </nav>
      <div class="footer-social">
        <p>Follow Us!</p>
        <a ${linkAttrs(site.social.instagram)}>Instagram ↗</a>
        <a ${linkAttrs(site.social.linkedin)}>LinkedIn ↗</a>
      </div>
    </div>
    <div class="footer-legal"><span>Student-led. Federally incorporated. Canada-wide.</span><span>© ${new Date().getFullYear()} Target Alpha Canada</span></div>
  </footer>`;
}

export function PageShell(content, pageClass = "") {
  return `${Header()}<main id="main-content" class="${pageClass}">${content}</main>${IndexTape()}${Footer()}`;
}
