import { escapeHtml, paragraphs, responsiveImage } from "./html.js";

export function PersonCard(person, index = 0) {
  const inner = `<figure class="person-card__image">${responsiveImage({ src: person.image, alt: `${person.cardName || person.name}, ${person.role}` })}<span>${String(index + 1).padStart(2, "0")}</span></figure>
    <div class="person-card__meta"><h3>${escapeHtml(person.cardName || person.name)}</h3><p>${escapeHtml(person.role)}</p></div>`;
  return person.legacyPath
    ? `<a class="person-card" href="${person.legacyPath}" data-route-link>${inner}<i aria-hidden="true">↗</i></a>`
    : `<article class="person-card person-card--static">${inner}</article>`;
}

export function TeamDirectory({ members }) {
  const departments = [...new Set(members.map((person) => person.department).filter(Boolean))];
  return departments.map((department) => {
    const people = members.filter((person) => person.department === department);
    return `<section class="department" aria-labelledby="department-${department.replace(/[^a-z0-9]/gi, "-").toLowerCase()}">
      <header class="department__header">
        <h2 id="department-${department.replace(/[^a-z0-9]/gi, "-").toLowerCase()}">${escapeHtml(department)}</h2>
        <span>${people.length} ${people.length === 1 ? "member" : "members"}</span>
      </header>
      <div class="people-grid">${people.map((person, index) => PersonCard(person, index)).join("")}</div>
    </section>`;
  }).join("");
}

export function ProfileView(person) {
  const teamPaths = {
    "2025-26": "/team25-26",
    "2024-25": "/team24-25-1",
    "2023-24": "/team23-24",
    "2022-23": "/team22-23"
  };
  const regionalPaths = {
    "2025-26": "/regional-executives",
    "2024-25": "/regional-executives-2025",
    "2023-24": "/regional-executives-2024"
  };
  const backPath = person.role === "Regional Executive" ? regionalPaths[person.year] : teamPaths[person.year];
  return `<article class="profile-view">
    <div class="profile-view__photo">${responsiveImage({ src: person.image, alt: `${person.name}, ${person.profileRole || person.role}`, eager: true })}<span>${escapeHtml(person.year)}</span></div>
    <div class="profile-view__copy">
      <a class="back-link" href="${backPath}" data-route-link>← Back</a>
      <p class="eyebrow">${escapeHtml(person.profileRole || person.role)}</p>
      <h1>${escapeHtml(person.name)}</h1>
      <div class="profile-view__bio"><h2>Biography</h2>${paragraphs(person.bio)}</div>
    </div>
  </article>`;
}
