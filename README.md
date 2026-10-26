# Abhinav Velidi — Portfolio

Zero-dependency static portfolio. No build step, no framework, no database, no ES modules
(plain classic scripts, so double-clicking `index.html` works with no server).
Deploy anywhere (Netlify / Vercel / GitHub Pages / any static host).

## Run locally

```sh
# any one of these:
npx serve .
python -m http.server 8000
```

Then open http://localhost:8000 (or the port shown).

## Files

| File | Purpose |
|---|---|
| `index.html` | Homepage (hero, work, about, process, contact) |
| `project.html` | Reusable case-study template — reads `?slug=` |
| `css/styles.css` | Whole design system (tokens, grid, components, responsive) |
| `js/content.js` | **Single source of truth**: site info, nav, sections, projects |
| `js/components.js` | Reusable renderers (cards, covers, nav, footer, reveal) |
| `js/main.js` | Homepage renderer |
| `js/project.js` | Case-study renderer + prev/next |

## Add a new project (1 data entry, no markup duplication)

1. Open `js/content.js`, copy an object in `PROJECTS`.
2. Set a unique `id` + `slug`, e.g. `slug: "my-new-app"`.
3. Set `published: true` (visible) · `featured: true` (on homepage) · `sortOrder: 4` (ordering, lower = first).
4. Fill `title`, `category`, `year`, `role`, `summary` — real work only.
5. Cover art: drop a file in `assets/` and set `cover: "assets/my-cover.jpg"` (+ `coverAlt`),
   or leave `cover` empty and pick `coverKind: "phone" | "nest" | "dash" | "generic"` for a CSS placeholder.
6. Add `caseStudy` blocks (`heading` + `paragraphs` + `bullets`). Omit any section you don't have — it won't render.
7. Done. Homepage, hero index, case page at `project.html?slug=my-new-app`, and prev/next update automatically.

Unpublish anytime with `published: false`. External-only work? Set `externalUrl: "https://…"` and the card links out instead.

## Adding images to a case study

1. Save the files in `assets/<slug>/` (e.g. `assets/exbark/`).
2. Reference them from the block's `figures` array:
   `{ src: "assets/exbark/cover-home.png", alt: "…", caption: "…", maxWidth: 266 }`.
3. Set `maxWidth` to the file's natural pixel width (check with any image
   viewer) — figures center themselves and never render wider, so small
   screenshots stay sharp instead of stretching blurry.
4. Narrow pairs (e.g. sign-in + sign-up, competitor A/B): set the block's
   `layout: "duo"` for a two-up grid; add `wide: true` to a figure that
   should span the full row above the pair.
5. Missing files fail gracefully: a case figure removes itself, and a
   homepage/hero cover falls back to the CSS placeholder — never a broken icon.
6. For the sharpest result use PNG/JPG at ~1600px wide for wide boards and
   at least 700px for phone sheets; keep `alt` factual.

### Exbark — exact filenames to save (24 files in `assets/exbark/`)

| File | Shows | Placed in |
|---|---|---|
| `cover-home.png` | Home screen close-up (Kaufland/Lidl/Rewe + Silvester party) | Homepage card + case hero (1 of 2) |
| `onboarding-splash.png` | “Streamline your student journey” splash | Case hero (2 of 2) |
| `hcd-iso-process.png` | ISO 9241-210 process diagram | Approach |
| `design-process.png` | Research → … → Iterate diagram | Approach |
| `competitor-allevents.png` | AllEvents screenshot | Research |
| `competitor-supermarket.png` | Nearby supermarket list screenshot | Research |
| `persona-vinay.png` | Vinay persona board | User interviews & insights |
| `empathy-map.png` | Says/Thinks/Does/Feels board | Empathy mapping |
| `storyboard-arrival.png` | First-day / welcome-center storyboard | Storyboarding |
| `storyboard-groceries.png` | Grocery-run storyboard | Storyboarding |
| `storyboard-weekend.png` | Weekend-events storyboard | Storyboarding |
| `user-story-board.png` | Expatriate-student goals/struggles/tasks | User stories & journey mapping |
| `journey-map.png` | Full journey map with emotion curve | User stories & journey mapping |
| `lofi-wireframes.png` | 6-area wireframe sheet | Low-fidelity prototyping |
| `lofi-notifications-flow.png` | Home → notifications flow | Low-fidelity prototyping |
| `lofi-onboarding-flow.png` | 4-screen onboarding flow | Low-fidelity prototyping |
| `onboarding-hifi.png` | Final 4 onboarding screens | Onboarding |
| `signin-apple.png` | Sign-in + Apple screens | Onboarding |
| `signup.png` | Sign-up screens | Onboarding |
| `home-notifications.png` | Home + notifications hi-fi | Home & notifications |
| `location-hifi.png` | 5 location screens | Location discovery |
| `events-hifi.png` | 4 events screens | Events discovery |
| `profile-hifi.png` | 4 profile screens | Profile & chatbot |
| `chatbot-helpdesk.png` | HelpDesk chatbot conversation | Profile & chatbot |

Any name mismatches are safe — that slot simply keeps its placeholder until the file lands.

### MindfulNest — exact filenames to save (13 files in `assets/mindfulnest/`)

| File | Shows | Placed in |
|---|---|---|
| `cover-dashboard.jpg` | Dashboard view of the analytics homepage | Homepage card + case hero (+ reused in Prototype) |
| `expert-1.png` | Expert consultation material 1 of 3 | Expert Consultation |
| `expert-2.jpg` | Expert consultation material 2 of 3 | Expert Consultation |
| `expert-3.png` | Expert consultation material 3 of 3 | Discovery & Insights |
| `competitors-1.png` | Competitor analysis board 1 of 2 | Competitor Analysis (two-up) |
| `competitors-2.png` | Competitor analysis board 2 of 2 | Competitor Analysis (two-up) |
| `value-proposition.png` | Strategic value proposition | Strategic Value Proposition |
| `feature-prioritization.png` | Feature prioritization board | Feature Prioritization |
| `solution-validation-1.png` | Solution validation matrix, part 1 | Solution Validation (two-up) |
| `solution-validation-2.png` | Solution validation matrix, part 2 | Solution Validation (two-up) |
| `wireframes.jpg` | Structural wireframes | Wireframing |
| `prototype-1.jpg` | Hi-fi prototype: onboarding | Prototype — Design Execution |
| `prototype-2.jpg` | Hi-fi prototype: dashboard + community | Prototype — Design Execution |
| `prototype-3.jpg` | Hi-fi prototype: content + progress | Prototype — Design Execution |
| `impact-kpis.jpg` | Strategic KPIs board | Impact |
| `reflection.jpg` | Reflection board | Reflection |

After dropping the files in, message me and I will measure each file and cap
display widths (the anti-blur pass), then verify every slot renders.

### Audi ConsciousDrive — exact filenames to save (8 files in `assets/audi/`)

| File | Shows | Placed in |
|---|---|---|
| `cover-hero.jpg` | Cover art | Homepage card + case hero (+ reused in Solution, as on the original) |
| `challenge-1.jpg` | Challenge material 1 of 2 | The Challenge |
| `challenge-2.jpg` | Challenge material 2 of 2 | The Challenge |
| `solution-1.jpg` | Solution concept 1 of 3 | The Solution |
| `solution-3.jpg` | Key features board 3 of 3 | The Solution |
| `value-1.jpg` | Strategic value: customer view | Strategic Value |
| `value-2.jpg` | Strategic value: Audi view | Strategic Value |
| `revenue.jpg` | Revenue stream diagram | Revenue Stream |

If you separated images further (like the last two projects), send me your
per-section counts and I will adjust the wiring before you save.

## Typography

- **Sans (Inter):** body, all headings, project titles, buttons, captions.
  `--font-display` and `--font-body` both point at Inter; display sizes use
  weights 750–800 with tight tracking, fluid via the `--step-*` clamps.
- **Script accents (Bon Vivant Script):** decorative words ONLY, via the
  reusable `.font-script` utility class (already applied to the hero and
  contact headline accents). Example for future sections:
  `<h2>Selected <span class="font-script">work</span></h2>`.
  One accent per heading max; it scales with its parent (`1.14em`).
- **Mono (IBM Plex Mono):** kickers, metadata, tags, eyebrow labels.

## Dark mode

One toggle in the nav (sun/moon, `aria-pressed`, keyboard-focusable). Preference
persists in `localStorage` (`av-theme`); first visit follows the OS
`prefers-color-scheme`, applied by a tiny head script before first paint so
there's no flash. All color flows through the `:root` tokens, so dark mode is
just the `[data-theme="dark"]` override block in `css/styles.css` — future
components pick it up automatically by using the tokens, never hardcoded
colors. Photos are gently dimmed (never inverted); the contact card stays
dark in both modes.

## Mobile menu overlay

Under 640px the header nav collapses to a Menu button. Tapping it drops a
full-screen `#menu-overlay` layer (`z-index: 200`) over the page: its own
brand row with Close, the section links from `NAV` as large numbered rows,
plus email, phone and availability. It is appended to `<body>` at runtime so
it always sits above `main`, not inside the nav's stacking context. Selecting
a link closes the layer and follows it. Escape closes, focus moves to the
first link on open and returns to the Menu button on close, Tab is trapped
inside while open, and body scroll is locked. The button tracks state with
`aria-expanded`; the panel is `inert` and `aria-hidden` while closed. The
slide-down is disabled by the global `prefers-reduced-motion` rule, and the
layer closes itself if the viewport grows past the breakpoint.

## Side line-navigation

Fixed right-edge markers (Work / About / Process / Contact) with scroll-spy
active tracking (`mountSideNav` in `js/components.js`, called from `js/main.js`).
Built from `SECTIONS`, so hiding or reordering sections updates the markers
with no markup changes. Labels reveal on hover/focus/active; the active line
elongates in accent. Hidden below 1024px (header nav + scroll take over) and
instant-jumping under `prefers-reduced-motion`.

## Custom cursor

Terracotta dot + trailing ink ring (`js/cursor.js`, no dependencies, one rAF
loop), in the spirit of Heron AI's cursor but built for this system: the ring
swells over links/buttons, becomes a filled "View" disc over project artwork
(anything tagged `data-cursor="view"`), and buttons get a subtle magnetic
pull. Active only on fine pointers (mouse/trackpad) with no
`prefers-reduced-motion` — touch, keyboard and reduced-motion users keep the
native cursor and are unaffected. To add a View zone elsewhere, just add
`data-cursor="view"` to a clickable element.

## Brand loader

Full-screen intro on every page (`#loader` markup at the top of `<body>`,
`js/loader.js`, styles in `css/styles.css`): the AV mark draws itself in,
the terracotta dot pops beside it, name + hairline sweep, then the panel
lifts. First view per session plays the full ~2.5s sequence; repeat views
get a 300ms quick fade (tracked in `sessionStorage`, guarded). Skipped
entirely under `prefers-reduced-motion`, never traps visitors (hard cap +
CSS `loader-kill` failsafe even if the script fails), and never blocks
scroll. To change the timing, tune `FULL_MS`/`QUICK_MS` minima in
`js/loader.js`.

⚠ **Font license:** `assets/fonts/bon-vivant-script.woff2` (Nicky Laatz,
commercial font, personal-use-only demo) is staged as a visual comp. A
portfolio advertising services is commercial use — buy the webfont license
(nickylaatz.com, Creative Market, MyFonts or Fontspring) and overwrite that
file before publishing, or point `--font-script` at a free OFL script
(Great Vibes, Allura, Pinyon Script). No code changes needed either way.

## Manage homepage sections

Edit `SECTIONS` in `js/content.js`: flip `visible`, change `order`.
Uncomment the `experiments` / `writing` / `photography` entries to activate them
(they need matching markup in `index.html` when you want them).

## Content rules

- Real projects, roles, teams and contexts only — no invented metrics or clients.
- Audi revenue figures in the original concept were illustrative; the case page says so explicitly.
- Contact details come from `SITE` — change email/phone/LinkedIn once, everywhere updates.

## Performance & accessibility notes

- System + Google Fonts with `display=swap`; no JS framework; images lazy-load.
- `prefers-reduced-motion` disables reveals; skip link + semantic landmarks + focus rings included.
- Covers are pure CSS/SVG placeholders until you add real screenshots — swap `cover` paths when ready.
