# Target Alpha website maintenance

Most annual updates require editing a single object in `src/content`. No page layout code needs to change.

## Updating the national team

Open `src/content/team.js`. The `nationalTeams` object is grouped by year. Each executive is one entry in that year’s `members` array:

```js
{
  name: "First Last",
  role: "Director of Operations",
  department: "Operations",
  year: "2026-27",
  legacyPath: "/first-last",
  image: "/images/team/2026-27/first-last.webp",
  bio: "Full biography goes here."
}
```

- Change a name, title, department, or biography in that one entry.
- Add an executive by copying one entry and updating every field.
- Remove an executive by deleting that one object, including its surrounding comma.
- The `department` value controls which section the profile appears in.
- `legacyPath` creates the executive’s profile URL. Keep an existing path unchanged to preserve old links.

## Changing a profile photo

1. Export a portrait as WebP or JPEG at roughly 1200 × 1500 px.
2. Put it in `public/images/team/<year>/`.
3. Change only the executive’s `image` property, for example:

```js
image: "/images/team/2026-27/first-last.webp"
```

The profile grid and biography page use the same image automatically. The current migration references the original Squarespace CDN so that every historical image remains available; new images should be stored locally.

## Creating the next year’s national team

1. Copy the newest year block inside `nationalTeams`.
2. Change its key, `year`, `path`, and member entries.
3. Add the new year to the start of `nationalTeamYears`.
4. Add a matching route in `src/content/routes.js` with `type: "team"`.

The previous year remains available as an archive without additional page work.

## Updating regional executives

Regional program copy and application details are in `src/content/regionalExecutives.js` under `regionalOverview`. Regional cohorts use the same yearly pattern under `regionalTeams`.

To create a new regional cohort, copy the newest year block, update its members, add the year to `regionalTeamYears`, and add one `regionalTeam` route in `src/content/routes.js`.

## Updating competitions

Open `src/content/events.js`. Each event supports:

- `acronym` and `fullTitle`
- `description` and optional `detailDescription`
- `statistic`
- `partner`
- `date`
- `registrationState` and `registrationUrl`
- `resourceLabel` and `resourceUrl`
- `image`

To add a competition, copy an event object and give it a unique `slug`. The homepage and events page render the new entry automatically. Use `null` for details that are not published; do not add placeholders.

## Updating homepage statistics

Edit the three entries in `src/content/stats.js`. The homepage ledger and the persistent national index line both use this file.

## Adding a judge

Open `src/content/judges.js` and add an object:

```js
{
  name: "First Last",
  bio: "Biography supplied by the judge.",
  competitions: ["2026 Stock Pitch Competition"],
  note: "They were a judge at Target Alpha’s 2026 Stock Pitch Competition.",
  year: "2026",
  image: "/images/judges/first-last.webp"
}
```

Reordering the array changes the display order. Deleting the object removes the judge.

## Adding a news feature

Open `src/content/news.js` and add one entry with `publication`, `headline`, `articleUrl`, optional `videoUrl`, optional `date`, and `image`. Never use `#` for an unpublished link—use `null` until the destination exists.

## Updating chapter links and registration

Chapter copy, registration status, steps, testimonials, and links are in `src/content/site.js` under `chapterContent`. Chapter resource destinations are in `chapterResources` in the same file.

The newsletter form identifiers are in `site.newsletter`. If Target Alpha moves away from Squarespace’s newsletter service, update the `action`, `formId`, and `collectionId` together.

## Updating sponsors, partners, contacts, or general imagery

- Sponsors: `sponsorLogos` in `src/content/site.js`
- Academic partners: `partners` in `src/content/site.js`
- Email addresses and social links: `site` in `src/content/site.js`
- About, homepage, chapter, and academia copy: their named objects in `src/content/site.js`
- General photos: store in `public/images/general/`
- Event photos: store in `public/images/events/`
- Judge photos: store in `public/images/judges/`
- News images: store in `public/images/news/`
- Partner marks: store in `public/images/partners/`

Use descriptive lowercase filenames with hyphens. After any update, run:

```bash
npm run check
npm run build
```

Fix any reported missing route, placeholder link, or data-count issue before publishing `dist/`.
