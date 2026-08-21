import { nationalTeams, nationalTeamYears } from "../content/team.js";
import { regionalOverview, regionalTeams, regionalTeamYears } from "../content/regionalExecutives.js";
import { ArchiveNav, PageHero, SectionHeading, ArrowLink } from "../components/primitives.js";
import { TeamDirectory, ProfileView } from "../components/people.js";
import { escapeHtml, paragraphs, responsiveImage } from "../components/html.js";

const teamHero = "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/687f3457-4e29-4424-a3c0-a90906c19d3c/Frame+2.png?format=2500w";
const regionalHero = "https://images.squarespace-cdn.com/content/v1/62e9d92459966a0033b73d2d/4e0f2cb6-b503-4b0f-b5a7-ecd894a5d03c/Frame+5.png?format=2500w";

export function TeamPage(year) {
  const cohort = nationalTeams[year];
  return `${PageHero({ eyebrow: "Leadership", title: "National Team", year, image: teamHero, imageAlt: `Target Alpha ${year} National Team` })}
    ${ArchiveNav({ label: "National team archive", current: year, items: nationalTeamYears.map((item) => ({ year: item, path: nationalTeams[item].path })) })}
    <div class="team-directory section-space">${TeamDirectory({ members: cohort.members })}</div>`;
}

export function RegionalTeamPage(year) {
  const cohort = regionalTeams[year];
  return `${PageHero({ eyebrow: "Leadership / Regional", title: "Regional Executives", year, image: regionalHero, imageAlt: `Target Alpha ${year} Regional Executives` })}
    ${ArchiveNav({ label: "Regional team archive", current: year, items: regionalTeamYears.map((item) => ({ year: item, path: regionalTeams[item].path })) })}
    <div class="team-directory team-directory--regional section-space">
      <div class="people-grid people-grid--regional">${cohort.members.map((person, index) => importPersonCard(person, index)).join("")}</div>
    </div>`;
}

function importPersonCard(person, index) {
  const inner = `<figure class="person-card__image">${responsiveImage({ src: person.image, alt: `${person.name}, Regional Executive` })}<span>${String(index + 1).padStart(2, "0")}</span></figure><div class="person-card__meta"><h3>${escapeHtml(person.cardName || person.name)}</h3><p>${escapeHtml(person.role)}</p></div>`;
  return `<a class="person-card" href="${person.legacyPath}" data-route-link>${inner}<i aria-hidden="true">↗</i></a>`;
}

export function RegionalOverviewPage() {
  return `${PageHero({ eyebrow: "National network", title: "Regional Executives", body: regionalOverview.introduction, image: regionalHero, imageAlt: "Target Alpha Regional Executives" })}
    <section class="regional-responsibilities section-space" aria-label="Regional executive responsibilities">
      ${regionalOverview.responsibilities.map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(item)}</p></article>`).join("")}
    </section>
    <section class="application-band">
      <div class="application-band__ticker" aria-hidden="true">${regionalOverview.applicationStatus.repeat(4)}</div>
      <div class="application-band__content"><h2>${escapeHtml(regionalOverview.applicationTitle)}</h2>${ArrowLink("Application Form", regionalOverview.applicationUrl, "button-link button-link--light")}</div>
    </section>
    <section class="testimonials section-space">
      ${SectionHeading({ eyebrow: "Previous regional executives", title: "Hear from the team" })}
      <div class="testimonials__grid">
        ${regionalOverview.testimonials.map((item) => `<article class="testimonial">
          <figure>${responsiveImage({ src: item.image, alt: item.name })}</figure>
          <div><blockquote>${escapeHtml(item.quote)}</blockquote><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.role).replaceAll("\n", "<br />")}</p></div>
        </article>`).join("")}
      </div>
    </section>
    ${ArchiveNav({ label: "Past regional executives", current: "", items: regionalTeamYears.map((item) => ({ year: item, path: regionalTeams[item].path })) })}`;
}

export function ProfilePage(person) {
  return ProfileView(person);
}
