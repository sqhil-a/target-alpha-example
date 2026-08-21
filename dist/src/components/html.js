export const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

export const isExternal = (href = "") => /^(https?:|mailto:)/.test(href);

export function linkAttrs(href) {
  return isExternal(href) && !href.startsWith("mailto:")
    ? `href="${escapeHtml(href)}" target="_blank" rel="noreferrer"`
    : `href="${escapeHtml(href)}"`;
}

export function paragraphs(value = "", className = "") {
  return value.split(/\n\n+/).map((part) => `<p${className ? ` class="${className}"` : ""}>${escapeHtml(part)}</p>`).join("");
}

export function responsiveImage({ src, alt, className = "", eager = false }) {
  const isSquarespaceImage = src.includes("images.squarespace-cdn.com");
  const sized = (width) => `${src.split("?")[0]}?format=${width}w`;
  const imageSrc = isSquarespaceImage ? sized(1000) : src;
  const sourceSet = isSquarespaceImage
    ? ` srcset="${[480, 800, 1200, 1800].map((width) => `${escapeHtml(sized(width))} ${width}w`).join(", ")}" sizes="(max-width: 700px) 92vw, (max-width: 1100px) 50vw, 33vw"`
    : "";
  return `<img class="${className}" src="${escapeHtml(imageSrc)}"${sourceSet} alt="${escapeHtml(alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""} />`;
}
