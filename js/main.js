/* Homepage renderer — reads content.js, respects SECTIONS visibility/order. */

renderNav("site-nav");
renderFooter("site-footer");

// Availability + email wiring (single source of truth = SITE)
document.getElementById("availability").textContent = SITE.availability;
const emailCta = document.getElementById("email-cta");
if (emailCta) {
  emailCta.href = `mailto:${SITE.email}`;
  emailCta.textContent = SITE.email;
}

// Section visibility from config — hide optional sections without editing markup.
const visible = new Set(visibleSections().map((s) => s.id));
for (const id of ["work", "about", "process", "contact"]) {
  const el = document.getElementById(id);
  if (el) el.hidden = !visible.has(id);
}

// Hero index + work list from featured projects.
const projects = featuredProjects();
document.getElementById("hero-index").innerHTML = projects
  .map(
    (p, i) => `<li><a href="project.html?slug=${encodeURIComponent(p.slug)}" data-cursor="view">
      <span class="hi-no">0${i + 1} · ${escapeHTML(p.year || "")}</span>
      <span class="hi-title">${escapeHTML(p.title)}</span>
      <span class="hi-cat">${escapeHTML(p.category || "")}</span></a></li>`
  )
  .join("");

document.getElementById("project-list").innerHTML = projects
  .map((p, i) => projectCardHTML(p, i))
  .join("");

// Services + process from data.
document.getElementById("services-list").innerHTML = SERVICES.map(
  (s) => `<li><strong>${escapeHTML(s.title)}</strong><span>${escapeHTML(s.text)}</span></li>`
).join("");

const pl = document.getElementById("process-list");
if (pl) pl.innerHTML = PROCESS.map(
  (s, i) => `<li><span class="p-no">0${i + 1}</span><h3>${escapeHTML(s.title)}</h3><p>${escapeHTML(s.text)}</p></li>`
).join("");

// Side line-nav follows the same visibility config — hide/reorder sections
// in content.js and the markers track automatically.
mountSideNav(visibleSections());

initReveal();
