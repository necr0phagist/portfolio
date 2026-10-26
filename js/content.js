/**
 * PORTFOLIO CONTENT SYSTEM
 * ========================
 * How to add a new project:
 *   1. Copy one object in PROJECTS, give it a unique `id` + `slug`.
 *   2. Set `published: true` to show it, `featured: true` to pin it
 *      to the homepage, and `sortOrder` to control ordering (lower = first).
 *   3. Fill in title / category / year / role / summary from real work only.
 *      Leave any optional field out (or set to "") and it disappears cleanly.
 *   4. Point `cover` at a file in /assets, or leave it empty to use the
 *      built-in `coverKind` placeholder ("phone" | "nest" | "dash" | "generic").
 *   5. Add `blocks` for the case-study page. Any section you omit is simply
 *      not rendered — no blank space. If you have no detail yet, keep the
 *      `templateHint` block so the page shows a "fill me in later" outline.
 *   6. No other file needs editing. Homepage, index list, hero, case study
 *      and prev/next navigation all read from this file.
 *
 * How to manage homepage sections:
 *   Toggle `visible` or change `order` in SECTIONS. Components hide
 *   sections with `visible: false` automatically (see js/main.js).
 *
 * @typedef {Object} CaseFigure
 * @property {string} src       path to the image file, e.g. "assets/exbark/cover-home.png"
 * @property {string} [alt]     meaningful alt text (falls back to caption)
 * @property {string} [caption] small caption shown under the image
 * @property {number} [maxWidth]  cap display width at the file's natural pixels (prevents upscale blur)
 * @property {boolean} [wide]     in a "duo" group, span the full row
 *
 * @typedef {Object} CaseBlock
 * @property {string} heading
 * @property {"duo"} [layout]     render this block's figures two-up on desktop
 * @property {string[]} [paragraphs]
 * @property {string[]} [bullets]
 * @property {CaseFigure[]} [figures]
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} category
 * @property {string} year
 * @property {string} role
 * @property {string} summary
 * @property {string} [cover]        file path under /assets (optional)
 * @property {string} [coverAlt]
 * @property {boolean} [coverWide]  landscape cover: wide card + hero frames
 * @property {{src:string, alt:string, wide:boolean}[]} [heroImages]
 * @property {"phone"|"nest"|"dash"|"generic"} [coverKind]
 * @property {string} [backgroundColor]
 * @property {string} [accentColor]
 * @property {boolean} [featured]
 * @property {boolean} [published]
 * @property {number} [sortOrder]
 * @property {string[]} [tags]
 * @property {string} [externalUrl]
 * @property {CaseBlock[]} [caseStudy]
 * @property {string} [team]
 * @property {string} [context]
 */

const SITE = {
  name: "Abhinav Velidi",
  shortName: "Abhinav.",
  role: "Product Designer",
  location: "India",
  tagline:
    "Product Designer based in India, turning complex research into high-impact digital tools that solve real-world problems.",
  email: "velidiabhinav12@gmail.com",
  phone: "+918830535069",
  phoneDisplay: "+91 88305 35069",
  linkedin: "https://www.linkedin.com/in/abhinav-velidi-108aa3253/",
  resume: "https://tinyurl.com/abhinav-velidi-resume",
  availability: "Based in India · Open to opportunities",
};

const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/** Homepage sections — reorder / hide without touching components.
    The side line-nav (scroll-spy) builds itself from these entries. */
const SECTIONS = [
  { id: "work", title: "Selected work", short: "Work", visible: true, order: 1 },
  { id: "about", title: "About", short: "About", visible: true, order: 2 },
  { id: "process", title: "How I work", short: "Process", visible: true, order: 3 },
  { id: "contact", title: "Contact", short: "Contact", visible: true, order: 4 },
  // Optional future sections — set visible: true to activate:
  // { id: "experiments", title: "Experiments", visible: false, order: 5 },
  // { id: "writing", title: "Writing", visible: false, order: 6 },
  // { id: "photography", title: "Photography", visible: false, order: 7 },
];

const SERVICES = [
  {
    title: "UX & Product Design",
    text: "End-to-end product design: from discovery and wireframes to high-fidelity prototypes.",
  },
  {
    title: "Research & User testing",
    text: "Interviews, competitive analysis and usability testing, so decisions rest on insight, not assumptions.",
  },
  {
    title: "Interaction & App Design",
    text: "Mobile and web interfaces with clear, accessible patterns for less friction and more logical flows.",
  },
  {
    title: "Branding & visual identity",
    text: "Cohesive visual identities that communicate the story and resonate with the audience.",
  },
];

const PROCESS = [
  { title: "Understand", text: "Interviews, competitive analysis, empathy mapping. Start from lived experience." },
  { title: "Define", text: "Requirements, journeys, storyboards. Frame the real problem before solving." },
  { title: "Make", text: "Lo-fi flows first, then high-fidelity prototypes. Test structure before visuals." },
  { title: "Validate", text: "Moderated tests, 5-second tests, iteration. Ship what survives contact with users." },
];

/** @type {Project[]} */
const PROJECTS = [
  {
    id: "exbark",
    slug: "exbark",
    title: "Exbark",
    subtitle: "Student Onboarding Hub",
    category: "EdTech · Mobile app · UXD",
    year: "2023",
    role: "UX Researcher, UX Designer",
    summary:
      "A mobile-first hub that helps international students in Germany settle into campus life: stores, events and university support in one clear, reliable experience.",
    cover: "assets/exbark/cover-home.png",
    coverAlt:
      "Exbark home screen with featured grocery locations and a featured New Year's event",
    heroImages: [
      {
        src: "assets/exbark/cover-home.png",
        alt: "Exbark home screen with featured grocery locations and a featured New Year's event",
      },
      {
        src: "assets/exbark/onboarding-splash.png",
        alt: "Exbark splash screen reading streamline your student journey with Exbark",
      },
    ],
    coverKind: "phone",
    backgroundColor: "#e6eee3",
    accentColor: "#1e4d3b",
    featured: true,
    published: true,
    sortOrder: 1,
    tags: ["UX research", "Onboarding", "Discovery", "Chatbot", "Prototyping"],
    team: "Solo / student project",
    context: "International students arriving in Kamp-Lintfort, Germany",
    caseStudy: [
      {
        heading: "Scope",
        paragraphs: [
          "Design a mobile-first platform that helps international students in Germany settle into campus life by bringing essential information (places, events and university support) into one clear and easy experience.",
        ],
      },
      {
        heading: "Problem",
        paragraphs: [
          "International students face information fragmentation when arriving in a new country: campuses are hard to navigate, affordable stores are hard to find, events live in scattered Instagram posts, and university websites and virtual assistants rarely answer real questions.",
        ],
        bullets: [
          "Difficulty navigating campuses and finding services",
          "Struggles locating affordable groceries and essentials",
          "Missing social events due to scattered sources",
          "Overreliance on word-of-mouth and Instagram posts",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "The project followed a human-centered process aligned with ISO 9241-210: decisions grounded in real behaviour, users involved throughout, continuous testing and iteration. The goal was not just features, but the experience of arriving in a new country.",
        ],
        figures: [
          {
            src: "assets/exbark/hcd-iso-process.png",
            maxWidth: 817,
            alt: "Diagram of the human-centered design process from ISO 9241-210, from planning and context of use through requirements, design solutions and evaluation",
            caption: "Human-centered design process (ISO 9241-210) that guided the project.",
          },
          {
            src: "assets/exbark/design-process.png",
            maxWidth: 817,
            alt: "Project process diagram showing the flow from research to define to design to evaluate to iterate",
            caption: "Our path: research, define, design, evaluate, iterate.",
          },
        ],
      },
      {
        heading: "Research",
        layout: "duo",
        paragraphs: [
          "Competitive analysis of discovery apps (including Supermarket Finder Worldwide and AllEvents) showed that fast scanning, clear categorisation and strong search reduce decision fatigue, which shaped the search, filtering and discovery flows.",
        ],
        bullets: [
          "Discovery apps prioritise fast scanning and filtering",
          "Clear categorisation reduces decision fatigue",
          "Users rely heavily on search under time pressure",
          "Event discovery works best when personalised and time-based",
        ],
        figures: [
          {
            src: "assets/exbark/competitor-allevents.png",
            maxWidth: 346,
            alt: "AllEvents app showing featured and upcoming events in Kamp-Lintfort",
            caption: "Competitor analysis: AllEvents: how users currently discover events.",
          },
          {
            src: "assets/exbark/competitor-supermarket.png",
            maxWidth: 348,
            alt: "Supermarket finder app listing nearby grocery stores with distances in Kamp-Lintfort",
            caption: "Competitor analysis: supermarket finder: existing mental models for place discovery.",
          },
        ],
      },
      {
        heading: "User interviews & insights",
        paragraphs: [
          "Semi-structured interviews with international students in Kamp-Lintfort grounded the work: students couldn't find directions to stores, missed events buried in Instagram, struggled with university buildings, and got limited help from official channels. The persona below kept one representative student voice present through the project.",
        ],
        figures: [
          {
            src: "assets/exbark/persona-vinay.png",
            maxWidth: 532,
            alt: "Persona board for Vinay, a 24-year-old software engineering student, with motivations, goals, pain points and bio",
            caption: "Persona synthesising the interview findings.",
          },
        ],
      },
      {
        heading: "Empathy mapping",
        paragraphs: [
          "Empathy mapping translated the research into emotional understanding: students felt overwhelmed during their first weeks, anxious about missing information, frustrated by scattered platforms, and relieved when information felt centralised. This reframed the project from a feature problem into a confidence and integration problem.",
        ],
        figures: [
          {
            src: "assets/exbark/empathy-map.png",
            maxWidth: 1152,
            alt: "Empathy map with says, thinks, does and feels quadrants full of sticky notes from the student interviews",
            caption: "Empathy map: says, thinks, does, feels.",
          },
        ],
      },
      {
        heading: "Storyboarding",
        paragraphs: [
          "Storyboards visualised the international student journey from arrival to integration: the first day on campus, stocking up on groceries, and a tiring week ending in a missed weekend. They highlighted the key moments of stress, uncertainty and reassurance that guided the design direction.",
        ],
        figures: [
          {
            src: "assets/exbark/storyboard-arrival.png",
            maxWidth: 603,
            alt: "Hand-drawn storyboard of an expatriate student arriving at the university and struggling to find the welcome center",
            caption: "Storyboard 1: first day, finding the welcome center.",
          },
          {
            src: "assets/exbark/storyboard-groceries.png",
            maxWidth: 526,
            alt: "Hand-drawn storyboard of a student unable to find grocery availability and prices online",
            caption: "Storyboard 2: stocking up on groceries for the week.",
          },
          {
            src: "assets/exbark/storyboard-weekend.png",
            maxWidth: 526,
            alt: "Hand-drawn storyboard of a tired student giving up on finding weekend events and staying in the dorm",
            caption: "Storyboard 3: a tiring week, missing out on weekend events.",
          },
        ],
      },
      {
        heading: "User stories & journey mapping",
        paragraphs: [
          "User stories and journey mapping structured the experience end-to-end: onboarding and account creation, discovering places and events, finding answers through chatbot and FAQs, and navigating daily student life, so the design supports the full journey rather than isolated features.",
        ],
        figures: [
          {
            src: "assets/exbark/user-story-board.png",
            maxWidth: 703,
            alt: "User story board for an expatriate student covering key goals and needs, struggles, and tasks",
            caption: "User stories: goals and needs, struggles, tasks.",
          },
          {
            src: "assets/exbark/journey-map.png",
            maxWidth: 918,
            alt: "Journey map across onboarding, homescreen, location, social events, chatbot, FAQs and profile with actions, needs, touchpoints and an emotion curve",
            caption: "Journey map across the full student experience.",
          },
        ],
      },
      {
        heading: "Defining user requirements",
        paragraphs: [
          "Based on the research, the core features were defined:",
        ],
        bullets: [
          "Store discovery with filters (price, distance, type incl. vegan)",
          "Personalised event discovery and timeline",
          "Chatbot trained on university FAQs",
          "Searchable, moderated FAQ system",
        ],
      },
      {
        heading: "Low-fidelity prototyping",
        paragraphs: [
          "Early screens validated navigation and flows before any visual design, keeping cognitive load down and enabling rapid iteration. The set below covers home, chatbot, location, events, profile and FAQs, plus the notification flow and the onboarding sequence.",
        ],
        figures: [
          {
            src: "assets/exbark/lofi-wireframes.png",
            maxWidth: 603,
            alt: "Low-fidelity wireframes for home screen, chatbot, location, events, profile and FAQs",
            caption: "Lo-fi wireframes across all six core areas.",
          },
          {
            src: "assets/exbark/lofi-notifications-flow.png",
            maxWidth: 548,
            alt: "Two low-fidelity wireframes showing the home screen flowing into a dedicated notifications screen",
            caption: "Lo-fi flow: home to dedicated notifications.",
          },
          {
            src: "assets/exbark/lofi-onboarding-flow.png",
            maxWidth: 853,
            alt: "Four low-fidelity onboarding screens introducing the app headline, location, events and help features",
            caption: "Lo-fi onboarding sequence.",
          },
        ],
      },
      {
        heading: "Usability testing & iteration",
        paragraphs: [
          "Moderated remote testing and 5-second tests drove concrete changes: an overwhelming home-screen notification feed moved to a dedicated page, workshops and education events were added to discovery, navigation linked out to Apple Maps, FAQs were categorised. Onboarding was cut from five screens to three, with a skip option and Apple sign-in.",
        ],
      },
      {
        heading: "Onboarding",
        layout: "duo",
        paragraphs: [
          "The onboarding introduces the app's core value clearly and quickly, streamlined to three screens with a skip option for faster entry, plus email and Apple sign-in.",
        ],
        figures: [
          {
            src: "assets/exbark/onboarding-hifi.png",
            wide: true,
            maxWidth: 538,
            alt: "Four high-fidelity onboarding screens introducing Exbark, location discovery, events and the chatbot",
            caption: "Final onboarding: value first, skippable in seconds.",
          },
          {
            src: "assets/exbark/signin-apple.png",
            maxWidth: 328,
            alt: "Sign-in screens with email and sign in with Apple options",
            caption: "Sign-in, including Apple, added after usability testing.",
          },
          {
            src: "assets/exbark/signup.png",
            maxWidth: 298,
            alt: "Sign-up screens with email and sign up with Apple options",
            caption: "Sign-up flow.",
          },
        ],
      },
      {
        heading: "Home & notifications",
        paragraphs: [
          "The home screen acts as a central hub with featured locations and events. Notifications live on a dedicated page with a clear hierarchy, after testing showed the combined feed felt overwhelming.",
        ],
        figures: [
          {
            src: "assets/exbark/home-notifications.png",
            maxWidth: 410,
            alt: "High-fidelity home screen with featured locations and events next to the dedicated notifications screen",
            caption: "Home hub and the separated notifications page.",
          },
        ],
      },
      {
        heading: "Location discovery",
        paragraphs: [
          "Students can search and filter locations (grocery stores, pubs, banks and services) by price, distance and store type, with handoff to external navigation apps.",
        ],
        figures: [
          {
            src: "assets/exbark/location-hifi.png",
            maxWidth: 576,
            alt: "Five high-fidelity location screens showing search, filters, listings and a maps navigation dialog",
            caption: "Location discovery: search, filter, navigate.",
          },
        ],
      },
      {
        heading: "Events discovery",
        paragraphs: [
          "Social integration through aggregated events (AllEvents API) with personalised search, filters and a calendar view for planning.",
        ],
        figures: [
          {
            src: "assets/exbark/events-hifi.png",
            maxWidth: 565,
            alt: "Four high-fidelity events screens showing featured events, date picker and event type filters",
            caption: "Events discovery: featured, calendar and filters.",
          },
        ],
      },
      {
        heading: "Profile & chatbot",
        paragraphs: [
          "Centralised help and account management: editable profile and privacy settings, a searchable FAQ database, and a Dialogflow chatbot trained on a 30-page FAQ dataset.",
        ],
        figures: [
          {
            src: "assets/exbark/profile-hifi.png",
            maxWidth: 575,
            alt: "Four high-fidelity profile screens showing account, security and privacy, and help and support with categorised FAQs",
            caption: "Profile, privacy and categorised help.",
          },
          {
            src: "assets/exbark/chatbot-helpdesk.png",
            maxWidth: 228,
            alt: "HelpDesk chatbot conversation answering questions about timetables and degree programme modules",
            caption: "The HelpDesk chatbot answering real student questions.",
          },
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "Exbark demonstrates a research-driven, human-centered approach, from synthesising insights to validating end-to-end flows. It strengthened my ability to connect research to real-world problems and design experiences that reduce stress in everyday life.",
        ],
      },
    ],
  },
  {
    id: "mindfulnest",
    slug: "mindfulnest",
    title: "MindfulNest",
    subtitle: "Bridging the gap in preventive parenting",
    category: "Health · Applied Interactive Design",
    year: "2024",
    role: "UX Designer, UX Researcher",
    summary:
      "A platform that moves parents from “unaware” to “reflective” through expert-led mental-health support: prevention, not reaction.",
    cover: "assets/mindfulnest/cover-dashboard.jpg",
    coverAlt: "Dashboard view of the MindfulNest analytics homepage",
    heroImages: [
      {
        src: "assets/mindfulnest/cover-dashboard.jpg",
        alt: "Dashboard view of the MindfulNest analytics homepage",
      },
    ],
    coverKind: "nest",
    backgroundColor: "#f4e7d8",
    accentColor: "#9a5a2e",
    featured: true,
    published: true,
    sortOrder: 2,
    tags: ["UX research", "Zero-to-one", "Prototyping", "Health"],
    team: "Abhinav, Annika, Baijed, Kardo, Muaaz, Pedram",
    context: "3-day prototype challenge",
    caseStudy: [
      {
        heading: "Summary",
        paragraphs: [
          "A specialized platform designed to transition parents from “unaware” to “reflective” through expert-led mental health support and developmental guidance. My role: UX designer / researcher, in a team of six, on a 3-day prototype challenge.",
        ],
      },
      {
        heading: "Challenge",
        paragraphs: [
          "Most parenting apps track baby milestones. MindfulNest addresses the gap nobody covers: the mental well-being of the parent. The focus is primary prevention, reaching parents who may not realise their stress or parenting style is affecting their child's development.",
        ],
        bullets: [
          "No awareness of parental influence",
          "False guidance and misinformation in the market",
          "Parents struggling with their own well-being",
        ],
      },
      {
        heading: "Expert consultation",
        paragraphs: [
          "We interviewed a child psychiatrist based in the Netherlands to ground the app in clinical reality: parents avoid specialists from fear of judgment, need anonymity to ask “taboo” questions, and are too stressed for long manuals, so they need snackable video and audio.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/expert-1.png",
            alt: "Notes from the expert consultation with a child psychiatrist",
            caption: "Grounding the concept in clinical reality.",
          },
          {
            src: "assets/mindfulnest/expert-2.jpg",
            maxWidth: 217,
            alt: "Key insights distilled from the expert consultation",
            caption: "Key insights: anonymity, snackable content, reaching parents early.",
          },
          {
            src: "assets/mindfulnest/expert-3.png",
            maxWidth: 622,
            alt: "Additional discovery material from the expert interviews",
            caption: "Further discovery notes feeding the define phase.",
          },
        ],
      },
      {
        heading: "Competitor analysis",
        paragraphs: [
          "Competitor analysis across 20+ apps (including BabySparks, Wonder Weeks and Calm) showed two camps (baby trackers or general meditation) with nobody bridging clinical expertise and daily parental self-care.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/competitors-1.png",
            alt: "Competitor analysis board comparing parenting and wellness apps",
            caption: "Mapping 20+ apps: baby trackers vs. general meditation.",
          },
          {
            src: "assets/mindfulnest/competitors-2.png",
            alt: "Competitor gap analysis showing the space between clinical expertise and daily self-care",
            caption: "The gap: nobody bridges clinical expertise and daily self-care.",
          },
        ],
      },
      {
        heading: "Defining the target audience",
        paragraphs: [
          "We defined three audience stages: soon-to-be parents, parents of children 0–6 (the core group), and 20–35-year-olds curious about future parenthood.",
        ],
      },
      {
        heading: "Strategic value proposition",
        paragraphs: [
          "Our mission: for parents of young children who may not be aware of their parenting style, provide self-care methods plus expert resources for long-term well-being. The goal: move from reaction to prevention.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/value-proposition.png",
            alt: "Strategic value proposition statement for MindfulNest",
            caption: "From reaction to prevention: the strategic bet.",
          },
        ],
      },
      {
        heading: "Feature prioritization",
        paragraphs: [
          "A “Nest” metaphor: a safe, warm environment for growth, prioritised preventative features: friendly-character onboarding to lower defences, an expert-verified forum to kill misinformation, and mood/habit tracking linking parent sleep and stress to interactions.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/feature-prioritization.png",
            alt: "Feature prioritization board for the MindfulNest nest concept",
            caption: "Prioritising preventative features around the nest metaphor.",
          },
        ],
      },
      {
        heading: "Solution validation",
        paragraphs: [
          "We stress-tested ideas like private messaging and expert verification against business outcomes such as brand reputation and user trust.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/solution-validation-1.png",
            maxWidth: 633,
            alt: "Solution validation matrix testing ideas against business outcomes, part one",
            caption: "Stress-testing ideas against trust and reputation (1 of 2).",
          },
          {
            src: "assets/mindfulnest/solution-validation-2.png",
            maxWidth: 633,
            alt: "Solution validation matrix testing ideas against business outcomes, part two",
            caption: "Stress-testing ideas against trust and reputation (2 of 2).",
          },
        ],
      },
      {
        heading: "App structure",
        paragraphs: [
          "Five pillars organised the app: tracking, dashboard, community, customized content, and gamification.",
        ],
      },
      {
        heading: "Wireframing",
        paragraphs: [
          "Wireframes reduced the barrier to entry: guided onboarding with notification and preference personalisation, a social hub for chat and community, and a home dashboard prioritising daily tasks with a simple bottom bar.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/wireframes.jpg",
            alt: "Structural wireframes for onboarding, dashboard, chat and navigation",
            caption: "From concepts to structure: the wireframes.",
          },
        ],
      },
      {
        heading: "Visual design",
        paragraphs: [
          "Visuals use soft natural tones, rounded edges, a companion mascot and clean legible type to keep clinical content approachable and calm.",
        ],
      },
      {
        heading: "Prototype: design execution",
        paragraphs: [
          "The final prototype delivers the concept end to end: personalised onboarding based on child age and stress levels, a dashboard hub for daily meditations, expert articles and progress snapshots, and a moderated community where verified-expert badges provide peace of mind.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/prototype-1.jpg",
            alt: "High-fidelity prototype screens showing personalized onboarding",
            caption: "Personalised onboarding based on child age and stress.",
          },
          {
            src: "assets/mindfulnest/prototype-2.jpg",
            alt: "High-fidelity prototype screens showing the dashboard and community",
            caption: "Dashboard hub and verified community.",
          },
          {
            src: "assets/mindfulnest/prototype-3.jpg",
            alt: "High-fidelity prototype screens showing meditation content and progress",
            caption: "Content, meditation and progress views.",
          },
        ],
      },
      {
        heading: "Impact",
        paragraphs: [
          "We defined success through strategic KPIs: conversion rate (turning unaware parents into active, reflective users), retention across developmental stages, and self-reported improvements in well-being and parenting interaction.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/impact-kpis.jpg",
            alt: "Strategic KPIs for MindfulNest covering conversion, retention and behavior change",
            caption: "Defining success: conversion, retention, behaviour change.",
          },
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "MindfulNest proved that UX in the parenting space must be empathetic first and clinical second. By designing for the “unaware” parent, we built a bridge to professional help that feels like a conversation, not a lecture.",
        ],
        figures: [
          {
            src: "assets/mindfulnest/reflection.jpg",
            alt: "Reflection board from the MindfulNest prototype challenge",
            caption: "Reflection: empathetic first, clinical second.",
          },
        ],
      },
    ],
  },
  {
    id: "audi-consciousdrive",
    slug: "audi-consciousdrive",
    title: "Audi ConsciousDrive",
    subtitle: "Automotive infotainment system",
    category: "Automotive · Infotainment",
    year: "2024",
    role: "UX Researcher, UX Designer",
    summary:
      "An in-car platform, built with AUDI AG, that turns the dashboard into a hub for social responsibility: listen, record, and connect over what matters.",
    cover: "assets/audi/cover-hero.jpg",
    coverAlt: "Audi ConsciousDrive cover art",
    coverWide: true,
    heroImages: [
      {
        src: "assets/audi/cover-hero.jpg",
        alt: "Audi ConsciousDrive cover art",
        wide: true,
      },
    ],
    coverKind: "dash",
    backgroundColor: "#e3e5e8",
    accentColor: "#23272e",
    featured: true,
    published: true,
    sortOrder: 3,
    tags: ["UX research", "Infotainment", "Community", "Concept"],
    team: "Armin Mansourfallah, Abhinav Velidi, Fatima Sohail, Parsa Tavakoli",
    context: "University collaboration with AUDI AG (Deutschland)",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "Audi ConsciousDrive is an integrated in-car platform bridging automotive luxury and social impact: drivers discover, connect and act on pressing social challenges directly from the dashboard. Core deliverable: an in-car podcast and community interface.",
        ],
      },
      {
        heading: "Challenge",
        paragraphs: [
          "People use different platforms for different interests, but the car offered no dedicated space to bond over social responsibility, despite a strong desire to learn, talk and connect with like-minded others around global challenges.",
        ],
        figures: [
          {
            src: "assets/audi/challenge-1.jpg",
            alt: "Research board on drivers' social concerns and unmet needs",
            caption: "The gap: drivers care, but have nowhere to connect.",
          },
          {
            src: "assets/audi/challenge-2.jpg",
            alt: "Research board on the desire for connection around shared interests",
            caption: "The need: a dedicated space to bond over what matters.",
          },
        ],
      },
      {
        heading: "Solution",
        paragraphs: [
          "A built-in platform for Audi vehicles with curated stations (Environment, Ocean, News), listen-and-record podcasting to share insights with the community, creator profiles with followers and insights, and Audi-steered community moderation for constructive dialogue.",
        ],
        figures: [
          {
            src: "assets/audi/solution-1.jpg",
            alt: "Solution concept showing the in-car podcast and community interface",
            caption: "The concept: the car as a hub for social responsibility.",
          },
          {
            src: "assets/audi/cover-hero.jpg",
            alt: "Audi ConsciousDrive cover art",
            caption: "Curated stations for focused discourse.",
          },
          {
            src: "assets/audi/solution-3.jpg",
            alt: "Key features board for listen, record and community interaction",
            caption: "Listen, record, connect: the key features.",
          },
        ],
      },
      {
        heading: "Strategic value",
        paragraphs: [
          "For customers: learn, engage and educate on social responsibility from an accessible, convenient platform, and help shape the conversation. For Audi: demonstrate commitment to sustainability, build stronger customer relations, and turn social engagement into brand equity.",
        ],
        figures: [
          {
            src: "assets/audi/value-1.jpg",
            alt: "Strategic value board covering the customer perspective",
            caption: "For customers: learn, engage, drive change.",
          },
          {
            src: "assets/audi/value-2.jpg",
            alt: "Strategic value board covering the Audi brand perspective",
            caption: "For Audi: sustainability commitment and stronger relations.",
          },
        ],
      },
      {
        heading: "Revenue stream",
        paragraphs: [
          "The concept sketched a value cycle converting engaged users into brand advocates. The figures in the original deck were illustrative projections, not measured outcomes.",
        ],
        figures: [
          {
            src: "assets/audi/revenue.jpg",
            alt: "Revenue stream diagram for the ConsciousDrive ecosystem",
            caption: "The projected value cycle, from the original concept deck.",
          },
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "ConsciousDrive provides a stage for people who care about social challenges and want impact from behind the wheel, showing users the brand cares and is aware of their concerns. Note: revenue figures shown in early concept material were illustrative projections, not measured outcomes.",
        ],
      },
    ],
  },
];

/* ---------- selectors (single source of truth) ---------- */

/** @returns {Project[]} published projects in sortOrder */
function publishedProjects() {
  return PROJECTS.filter((p) => p.published !== false).sort(
    (a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99)
  );
}

/** @returns {Project[]} featured subset for the homepage */
function featuredProjects() {
  const pub = publishedProjects();
  const feat = pub.filter((p) => p.featured);
  return (feat.length ? feat : pub).slice(0, 6);
}

/** @param {string} slug */
function projectBySlug(slug) {
  return publishedProjects().find((p) => p.slug === slug);
}

/** @returns {Array<{id:string,title:string,visible:boolean,order:number}>} */
function visibleSections() {
  return SECTIONS.filter((s) => s.visible).sort((a, b) => a.order - b.order);
}
