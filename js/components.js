/* Reusable rendering components — project cards, covers, nav, footer.
   All components degrade gracefully when optional fields are absent. */

function coverHTML(p, size = "card") {
  // Real image wins when present; the CSS placeholder stays hidden behind it
  // and only shows if the file is missing (onerror flips the class).
  if (p.cover) {
    const alt = (p.coverAlt || `${p.title} preview`).replace(/"/g, "&quot;");
    const wide = p.coverWide ? " wide" : "";
    return `<div class="cover cover--real${wide}"><img class="cover--img" src="${p.cover}" alt="${alt}" loading="lazy" decoding="async" onerror="this.closest('.cover--real').classList.add('img-missing')" /><div class="cover--fallback" aria-hidden="true">${placeholderKindHTML(p)}</div></div>`;
  }
  return placeholderKindHTML(p);
}

/* Case-study figures.
   Each figure: { src, alt, caption }. Missing files remove themselves
   (onerror) so a forgotten upload never breaks the layout. */
function figureHTML(fig) {
  if (!fig || !fig.src) return "";
  const caption = fig.caption ? `<figcaption>${escapeHTML(fig.caption)}</figcaption>` : "";
  const alt = (fig.alt || fig.caption || "Project image").replace(/"/g, "&quot;");
  // maxWidth caps display at the file's natural pixels — never upscale, never blur.
  const cap = fig.maxWidth ? ` style="max-width:${fig.maxWidth}px"` : "";
  const wide = fig.wide ? " wide" : "";
  return `<figure class="case-figure reveal${wide}"><img src="${fig.src}" alt="${alt}" loading="lazy" decoding="async"${cap} onerror="this.closest('.case-figure').remove()" />${caption}</figure>`;
}

function figuresHTML(figs, layout) {
  if (!figs || !figs.length) return "";
  const duo = layout === "duo" ? " duo" : "";
  return `<div class="fig-group${duo}">${figs.map(figureHTML).join("")}</div>`;
}

/* Case-hero artwork: one image, or two side-by-side when the project
   supplies heroImages. Missing files remove themselves. */
function heroCoverHTML(p) {
  const imgs = (p.heroImages && p.heroImages.length
    ? p.heroImages
    : [{ src: p.cover, alt: p.coverAlt }]
  ).filter((im) => im && im.src);
  if (!imgs.length) return placeholderKindHTML(p);
  const duo = imgs.length > 1 ? " duo" : "";
  return `<div class="hero-covers${duo}">${imgs
    .map((im) => {
      const alt = (im.alt || p.coverAlt || `${p.title} preview`).replace(/"/g, "&quot;");
      const wide = im.wide ? " wide" : "";
      return `<img class="hero-shot${wide}" src="${im.src}" alt="${alt}" loading="eager" fetchpriority="high" decoding="async" onerror="this.remove()" />`;
    })
    .join("")}</div>`;
}

function placeholderKindHTML(p) {
  const kind = p.coverKind || "generic";
  if (kind === "phone") {
    return `<div class="cover cover-phone" aria-hidden="true"><div class="screen">
      <div class="bar"><span class="notch"></span></div>
      <div class="cover-ui">
        <div class="pill" style="width:55%"></div>
        <div class="chips"><i></i><i></i><i></i></div>
        <div class="card"><strong>Affordable markets nearby</strong><span>Kamp-Lintfort · 0.8 km · €</span></div>
        <div class="card"><strong>Campus events this week</strong><span>Orientation + 12 more</span></div>
      </div></div></div>`;
  }
  if (kind === "nest") {
    return `<div class="cover cover-nest" aria-hidden="true"><div class="mascot"></div>
      <h4>Good evening, parent</h4><p>2-min reset · expert-verified</p>
      <div class="rows"><div><span>Mood check-in</span><span>›</span></div>
      <div><span>Today's reset</span><span>2:00</span></div>
      <div><span>Ask an expert</span><span>•</span></div></div></div>`;
  }
  if (kind === "dash") {
    return `<div class="cover cover-dash" aria-hidden="true">
      <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;opacity:.7">AUDI · CONSCIOUSDRIVE</div>
      <div style="font-family:var(--font-display);font-size:22px;margin-top:4px">Drive &amp; discuss</div>
      <div class="stations">
        <div class="st"><span class="eq"><i style="height:8px"></i><i style="height:16px"></i><i style="height:11px"></i></span> Environment Station</div>
        <div class="st"><span class="eq"><i style="height:12px"></i><i style="height:7px"></i><i style="height:15px"></i></span> Ocean Station</div>
        <div class="st"><span class="eq"><i style="height:9px"></i><i style="height:14px"></i><i style="height:6px"></i></span> News Station</div>
      </div></div>`;
  }
  return `<div class="cover cover-nest" aria-hidden="true"><div class="mascot"></div>
    <h4>${escapeHTML(p.title)}</h4><p>${escapeHTML(p.category || "Case study")}</p></div>`;
}

function metaListHTML(p) {
  const rows = [];
  if (p.role) rows.push(`<li>Role · <b>${escapeHTML(p.role)}</b></li>`);
  if (p.year) rows.push(`<li>Year · <b>${escapeHTML(p.year)}</b></li>`);
  if (p.team) rows.push(`<li>Team · <b>${escapeHTML(p.team)}</b></li>`);
  return rows.length ? `<ul class="meta-row">${rows.join("")}</ul>` : "";
}

function tagListHTML(p) {
  if (!p.tags || !p.tags.length) return "";
  return `<ul class="tag-row" aria-label="Tags">${p.tags.map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>`;
}

function projectCardHTML(p, index) {
  const no = String(index + 1).padStart(2, "0");
  const url = p.externalUrl ? p.externalUrl : `project.html?slug=${encodeURIComponent(p.slug)}`;
  const isExternal = Boolean(p.externalUrl);
  return `<article class="work reveal" style="--proj-bg:${p.backgroundColor || "var(--paper-2)"}">
    <a class="work-visual" data-cursor="view" href="${url}"${isExternal ? ' rel="noopener"' : ""} aria-label="View ${escapeHTML(p.title)}${isExternal ? " (external link)" : " case study"}" style="background:${p.backgroundColor || "var(--paper-2)"}">
      <span class="work-no">${no} / ${escapeHTML(p.year || "")}</span>
      ${coverHTML(p)}
    </a>
    <div class="work-body">
      <p class="work-cat">${escapeHTML(p.category || "Case study")}</p>
      <h3 class="work-title"><a href="${url}"${isExternal ? ' rel="noopener"' : ""}>${escapeHTML(p.title)}${p.subtitle ? `: <span style="font-style:italic;font-weight:340">${escapeHTML(p.subtitle)}</span>` : ""}</a></h3>
      <p class="work-summary">${escapeHTML(p.summary || "")}</p>
      ${metaListHTML(p)}
      ${tagListHTML(p)}
      <div class="work-link">
        <a class="btn btn--solid" href="${url}"${isExternal ? ' rel="noopener"' : ""}>${isExternal ? "Visit live ↗" : "Read case study →"}</a>
        <span class="work-index-hint" style="font-family:var(--font-mono);font-size:.75rem;color:var(--muted)">${no}</span>
      </div>
    </div>
  </article>`;
}

const BRAND_SVG = `<svg class="brand-mark" viewBox="0 0 512 512" aria-hidden="true"><g><path fill="currentColor" d="M0 512 L156.098 0 L218.537 0 L374.634 512 L293.463 512 L249.756 358.4 L124.878 358.4 L81.171 512 Z M156.098 187.733 L187.317 281.6 L106.146 281.6 Z"/><path fill="currentColor" d="M330.927 358.4 L437.073 512 L512 512 L393.366 315.733 Z"/></g></svg>`;

function renderNav(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = `<nav class="nav" aria-label="Primary"><div class="nav-inner">
    <a class="wordmark" href="index.html" aria-label="${escapeHTML(SITE.name)} — home">${BRAND_SVG}<span class="wm-dot">.</span></a>
    <ul class="nav-links" id="nav-links">
      ${NAV.map((n) => `<li><a href="${n.href.startsWith("#") ? "index.html" + n.href : n.href}">${escapeHTML(n.label)}</a></li>`).join("")}
      <li><a href="${SITE.linkedin}" rel="noopener">LinkedIn ↗</a></li>
    </ul>
    <a class="nav-cta" href="mailto:${SITE.email}">Contact</a>
    <button class="theme-btn" id="theme-btn" type="button" aria-pressed="false" aria-label="Switch to dark mode"><svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></button>
    <button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="menu-overlay">Menu</button>
  </div></nav>
  <div class="menu-overlay" id="menu-overlay" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden="true">
    <div class="menu-panel">
      <div class="menu-top">
        <a class="wordmark" href="index.html" aria-label="${escapeHTML(SITE.name)} — home">${BRAND_SVG}<span class="wm-dot">.</span></a>
        <button class="menu-close" id="menu-close" type="button" aria-label="Close menu">
          <span>Close</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <nav class="menu-nav" aria-label="Mobile menu">
        <ul>
          ${NAV.map((n, i) => `<li style="--i:${i}"><a href="${n.href.startsWith("#") ? "index.html" + n.href : n.href}"><span class="menu-no" aria-hidden="true">0${i + 1}</span><span class="menu-label">${escapeHTML(n.label)}</span><span class="menu-arrow" aria-hidden="true">→</span></a></li>`).join("")}
          <li style="--i:${NAV.length}"><a href="${SITE.linkedin}" rel="noopener"><span class="menu-no" aria-hidden="true">0${NAV.length + 1}</span><span class="menu-label">LinkedIn</span><span class="menu-arrow" aria-hidden="true">↗</span></a></li>
        </ul>
      </nav>
      <div class="menu-foot">
        <p class="menu-kicker">Get in touch</p>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a>
        <p class="menu-loc">${escapeHTML(SITE.availability)}</p>
      </div>
    </div>
  </div>`;
  // Hoist the menu layer to <body> so its fixed z-index competes at the root
  // instead of being trapped inside the nav's stacking context.
  const overlayLayer = mount.querySelector("#menu-overlay");
  if (overlayLayer) {
    if ("inert" in overlayLayer) overlayLayer.inert = true;
    document.body.appendChild(overlayLayer);
  }
  const tb = document.getElementById("theme-btn");
  const syncTheme = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    if (tb) {
      tb.setAttribute("aria-pressed", String(dark));
      tb.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    const mc = document.querySelector('meta[name="theme-color"]');
    if (mc) mc.setAttribute("content", dark ? "#161210" : "#faf7f1");
  };
  tb?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("av-theme", next); } catch (e) {}
    syncTheme();
  });
  if (tb) syncTheme();
  const btn = document.getElementById("menu-btn");
  const overlay = document.getElementById("menu-overlay");
  const closeBtn = document.getElementById("menu-close");
  let lastFocus = null;
  const focusables = () =>
    overlay ? Array.from(overlay.querySelectorAll('a[href], button:not([disabled])')) : [];
  function setMenu(open) {
    if (!overlay) return;
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    if ("inert" in overlay) overlay.inert = !open;
    document.body.classList.toggle("menu-open", open);
    btn?.setAttribute("aria-expanded", String(open));
    if (btn) btn.textContent = open ? "Close" : "Menu";
    if (open) {
      lastFocus = document.activeElement;
      const first =
        overlay.querySelector(".menu-nav a") || focusables()[0];
      if (first) setTimeout(() => first.focus(), 80);
    } else if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
      lastFocus = null;
    }
  }
  btn?.addEventListener("click", () => setMenu(!overlay.classList.contains("is-open")));
  closeBtn?.addEventListener("click", () => setMenu(false));
  // Selecting a destination closes the layer, then the browser follows the link.
  overlay?.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay || !overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setMenu(false);
      return;
    }
    if (e.key !== "Tab") return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  // If the viewport grows past the mobile breakpoint, the desktop nav takes
  // over: clear the layer + scroll lock instead of leaving a stale open state.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 640 && overlay?.classList.contains("is-open")) setMenu(false);
  });
}

function renderFooter(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `<footer class="footer"><div class="wrap footer-inner">
    <span>© ${year} ${escapeHTML(SITE.name)} · ${escapeHTML(SITE.location)}</span>
    <ul>
      <li><a href="index.html#work">Work</a></li>
      <li><a href="index.html#about">About</a></li>
      <li><a href="${SITE.linkedin}" rel="noopener">LinkedIn ↗</a></li>
      <li><a href="mailto:${SITE.email}">Email</a></li>
    </ul>
  </div></footer>`;
}

/* Side line-navigation with scroll-spy. Builds one marker per visible
   homepage section; the active marker tracks scroll position and every
   marker is a plain anchor jump. Progressive enhancement: no-JS means
   no side nav, sections stay reachable via the header + scroll. */
function mountSideNav(sections) {
  if (!document.createElement || !document.body) return;
  const usable = (sections || []).filter((s) => {
    const el = document.getElementById(s.id);
    return el && !el.hidden;
  });
  if (!usable.length) return;
  const nav = document.createElement("nav");
  nav.className = "sidenav";
  nav.setAttribute("aria-label", "Page sections");
  nav.innerHTML =
    "<ul>" +
    usable
      .map(
        (s, i) =>
          '<li><a href="#' +
          s.id +
          '" data-target="' +
          s.id +
          '"><span class="sn-no" aria-hidden="true">0' +
          (i + 1) +
          '</span><span class="sn-line" aria-hidden="true"></span><span class="sn-label">' +
          escapeHTML(s.short || s.title) +
          "</span></a></li>"
      )
      .join("") +
    "</ul>";
  document.body.appendChild(nav);
  const links = {};
  const anchors = nav.querySelectorAll("a");
  for (let i = 0; i < anchors.length; i++) {
    links[anchors[i].getAttribute("data-target")] = anchors[i];
  }
  function setActive(id) {
    Object.keys(links).forEach((k) => {
      const on = k === id;
      links[k].classList.toggle("active", on);
      if (on) links[k].setAttribute("aria-current", "true");
      else links[k].removeAttribute("aria-current");
    });
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    usable.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
  } else if (usable.length) {
    setActive(usable[0].id);
  }
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

function escapeHTML(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
