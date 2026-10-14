/* Case-study renderer — one template for every project.
   Missing sections are skipped (no blank space). Prev/next follows sortOrder. */

renderNav("site-nav");
renderFooter("site-footer");

const params = new URLSearchParams(location.search);
const slug = params.get("slug") || "";
const projects = publishedProjects();
const project = projectBySlug(slug) || projects[0];

const article = document.getElementById("case-study");
document.getElementById("crumb-current").textContent = project.title;
document.title = `${project.title}${project.subtitle ? " — " + project.subtitle : ""} — ${SITE.name}`;

const facts = [
  ["Role", project.role],
  ["Year", project.year],
  ["Team", project.team],
  ["Context", project.context],
  ["Category", project.category],
].filter(([, v]) => v);

const blocks = (project.caseStudy || [])
  .filter((b) => b && (b.heading || (b.paragraphs || []).length || (b.bullets || []).length || (b.figures || []).length))
  .map(
    (b) => `<section class="case-block reveal">
      <h2>${escapeHTML(b.heading || "")}</h2>
      ${(b.paragraphs || []).map((p) => `<p>${escapeHTML(p)}</p>`).join("")}
      ${b.bullets && b.bullets.length ? `<ul>${b.bullets.map((li) => `<li>${escapeHTML(li)}</li>`).join("")}</ul>` : ""}
      ${figuresHTML(b.figures, b.layout)}
    </section>`
  )
  .join("");

const tags = project.tags && project.tags.length
  ? `<ul class="tag-row" aria-label="Tags">${project.tags.map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>`
  : "";

article.innerHTML = `
  <header class="case-hero">
    <div>
      <p class="work-cat reveal">${escapeHTML(project.category || "Case study")}</p>
      <h1 class="reveal">${escapeHTML(project.title)}${project.subtitle ? `<br /><span style="font-style:italic;font-weight:340;color:var(--muted)">${escapeHTML(project.subtitle)}</span>` : ""}</h1>
      <p class="standfirst reveal">${escapeHTML(project.summary || "")}</p>
      <div class="reveal" style="margin-top:1.2rem">${tags}</div>
    </div>
    <dl class="case-facts reveal">
      ${facts.map(([k, v]) => `<div><dt>${escapeHTML(k)}</dt><dd>${escapeHTML(v)}</dd></div>`).join("")}
      <div><dt>Contact</dt><dd><a href="mailto:${SITE.email}">${escapeHTML(SITE.email)}</a></dd></div>
    </dl>
  </header>
  <div class="case-cover reveal" style="background:${project.backgroundColor || "var(--paper-2)"}" role="img" aria-label="${escapeHTML(project.title)} cover art">
    ${heroCoverHTML(project)}
  </div>
  <div class="case-blocks">${blocks || `<section class="case-block"><h2>Case study coming soon</h2><p>Outline: context → problem → research → decisions → solution → learnings. Fill in <code>caseStudy</code> in <code>js/content.js</code> to publish.</p></section>`}</div>`;

// Prev / next in sortOrder.
const i = projects.findIndex((p) => p.slug === project.slug);
const prev = projects[(i - 1 + projects.length) % projects.length];
const next = projects[(i + 1) % projects.length];
const pn = document.getElementById("prev-next");
if (pn && projects.length > 1) {
  pn.innerHTML = `
    <a href="project.html?slug=${encodeURIComponent(prev.slug)}"><small>← Previous</small><strong>${escapeHTML(prev.title)}</strong></a>
    <a href="project.html?slug=${encodeURIComponent(next.slug)}" style="text-align:right"><small>Next →</small><strong>${escapeHTML(next.title)}</strong></a>`;
}

initReveal();
