/* ============================================================================
   PROJECTS — single source of truth for the whole portfolio.
   HOW TO EDIT: see README.md → "Add or edit a project".

   Fields per project:
     title        string   Project name shown everywhere.
     slug         string   Must match the file name in /work/ (e.g. my-app.html).
     summary      string   One-line description shown on cards.
     tags         array    Filter categories: Backend, LMS, Full-stack, Frontend practice.
     role         string   Your role on the project.
     tools        array    Tech stack list.
     images       array    Screenshot paths (put files in assets/img/).
     imageAlt     string   Accessibility description of the first screenshot.
     links        object   { live: "...", code: "..." } — use "" to hide a button.
     problem      string   Case study section: the problem.
     approach     string   Case study section: what you did.
     outcome      string   One-line result (also shown under the case study title).
     testimonial  string|null  Optional client quote.
     featured     boolean  true = appears in the Home page featured grid (max 3).
     order        number   Sort order (1 = shows first).
============================================================================ */

const PROJECTS = [
  {
    title: "Guess the Number Game",
    slug: "guess-the-number",
    summary: "Interactive number-guessing game (1–20) with hints and dynamic color feedback.",
    tags: ["Frontend practice"],
    role: "Solo developer (design + front-end logic)",
    tools: ["HTML", "CSS", "JavaScript"],
    images: ["assets/img/guss the numb.jpg"],
    imageAlt: "Preview screen of the Guess the Number game interface",
    links: {
      live: "https://micky-afro.github.io/micky-game/",
      code: "https://github.com/micky-afro/micky-game"
    },
    problem:
      "Create a simple, engaging game that gives clear feedback on every guess and visibly changes state when the player wins.",
    approach:
      "Built a single-page app with input validation, random number generation, and a graduated hint system (higher/lower plus distance cues). Winning toggles CSS classes that restyle the board instantly, so success is obvious at a glance.",
    outcome:
      "Demonstrates DOM manipulation, event handling, input validation, and clean UI feedback.",
    testimonial: null,
    featured: true,
    order: 1
  },
  {
    title: "Minimalist Money Manager",
    slug: "minimalist-money-manager",
    summary: "Multi-account transaction manager with balance tracking and transaction logs.",
    tags: ["Frontend practice"],
    role: "Solo developer (design + front-end logic)",
    tools: ["HTML", "CSS", "JavaScript"],
    images: ["assets/img/minimal.jpg"],
    imageAlt: "Preview screen of the minimalist money manager interface",
    links: {
      live: "https://micky-afro.github.io/mikiyas/",
      code: "https://github.com/micky-afro/mikiyas"
    },
    problem:
      "Help users track money across multiple accounts and see a clear log of every transaction.",
    approach:
      "Modeled accounts and transactions as in-memory state with pure helper functions, implemented add/edit/delete flows with validation, and rendered balances plus a filterable transaction log from a single render function so the UI always matches state.",
    outcome:
      "Shows state management, data modeling, and transaction logging UI in vanilla JavaScript.",
    testimonial: null,
    featured: true,
    order: 2
  },
  {
    title: "Hospital Management with Location",
    slug: "hospital-management-location",
    summary: "Hospital management system with location features and full CRUD operations.",
    tags: ["Full-stack", "Backend"],
    role: "Developer (full-stack)",
    tools: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    images: ["assets/img/Screenshot (197).png"],
    imageAlt: "Preview screen of the hospital management system interface",
    links: {
      live: "http://hospital-managment.liveblog365.com/",
      code: "https://github.com/micky-afro"
    },
    problem:
      "Provide a simple system to manage hospital records and include location information.",
    approach:
      "Built a full-stack app with PHP + MySQL for CRUD operations and basic geolocation features. Designed a relational schema for patients, staff, and locations, structured pages around each record type, and used prepared statements with server-side validation for safe data handling.",
    outcome:
      "Demonstrates full-stack PHP/MySQL development, database design, and basic location handling.",
    testimonial: null,
    featured: true,
    order: 3
  }
];

/* ============================================================================
   Rendering — you normally do not need to edit below this line.
============================================================================ */

const ICON_ARROW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const ICON_EXT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4 10 14M18 13v6H5V6h6"/></svg>';

function sortedProjects() {
  return [...PROJECTS].sort((a, b) => (a.order || 99) - (b.order || 99));
}

function cardHTML(p, basePath) {
  const prefix = basePath || "";
  const href = prefix + "work/" + p.slug + ".html";
  const img = p.images && p.images[0] ? p.images[0] : "";
  const imgTag = img
    ? '<img src="' + prefix + img.replace(/^\.\.\//, "") + '" alt="" loading="lazy">'
    : "";
  const live =
    p.links && p.links.live
      ? '<a class="link-arrow" href="' + p.links.live + '" target="_blank" rel="noopener">Live ' + ICON_EXT + "</a>"
      : "";
  return (
    '<article class="card reveal">' +
    (img ? '<a class="card-media" href="' + href + '" tabindex="-1" aria-hidden="true">' + imgTag + "</a>" : "") +
    '<div class="card-body">' +
    '<ul class="tag-row">' + p.tags.map((t) => '<li class="tag">' + t + "</li>").join("") + "</ul>" +
    "<h3><a href=\"" + href + '">' + p.title + "</a></h3>" +
    '<p class="muted">' + p.summary + "</p>" +
    '<div class="card-links"><a class="link-arrow" href="' + href + '">Read case study ' + ICON_ARROW + "</a>" + live + "</div>" +
    "</div></article>"
  );
}

function initFeaturedGrid() {
  const el = document.getElementById("featured-grid");
  if (!el) return;
  el.innerHTML = sortedProjects()
    .filter((p) => p.featured)
    .slice(0, 3)
    .map((p) => cardHTML(p, ""))
    .join("");
}

function initWorkGrid() {
  const grid = document.getElementById("work-grid");
  const filterBar = document.getElementById("work-filters");
  if (!grid || !filterBar) return;

  const tags = ["All", ...new Set(PROJECTS.flatMap((p) => p.tags))];
  filterBar.innerHTML = tags
    .map(
      (t, i) =>
        '<button type="button" class="chip" aria-pressed="' + (i === 0) + '" data-tag="' + t + '">' + t + "</button>"
    )
    .join("");

  function render(tag) {
    const list = sortedProjects().filter((p) => tag === "All" || p.tags.includes(tag));
    grid.innerHTML = list.length
      ? list.map((p) => cardHTML(p, "")).join("")
      : '<p class="muted">No projects in this category yet.</p>';
  }

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    filterBar.querySelectorAll(".chip").forEach((c) =>
      c.setAttribute("aria-pressed", c === btn ? "true" : "false")
    );
    render(btn.dataset.tag);
  });

  render("All");
}

function initCaseStudy() {
  const root = document.getElementById("case-root");
  if (!root || !window.CASE_SLUG) return;
  const p = PROJECTS.find((x) => x.slug === window.CASE_SLUG);
  if (!p) {
    root.innerHTML = "<p>Project not found.</p>";
    return;
  }

  const all = sortedProjects();
  const idx = all.indexOf(p);
  const next = all[(idx + 1) % all.length];

  const liveBtn = p.links.live
    ? '<a class="btn btn-primary" href="' + p.links.live + '" target="_blank" rel="noopener">Visit live site ' + ICON_EXT + "</a>"
    : "";
  const codeBtn = p.links.code
    ? '<a class="btn btn-secondary" href="' + p.links.code + '" target="_blank" rel="noopener">View code ' + ICON_EXT + "</a>"
    : "";

  const figures = (p.images || [])
    .map(
      (src, i) =>
        '<figure class="figure"><img src="../' + src + '" alt="' +
        (i === 0 ? p.imageAlt || p.title : p.title + " screenshot") +
        '" loading="lazy"></figure>'
    )
    .join("");

  const testimonial = p.testimonial
    ? '<section class="case-section prose"><h2>What the client said</h2><blockquote class="testimonial"><p>' +
      p.testimonial.quote +
      '</p><footer>— ' +
      p.testimonial.author +
      ", " +
      p.testimonial.role +
      "</footer></blockquote></section>"
    : "";

  root.innerHTML =
    '<nav class="breadcrumb"><a href="../work.html">&larr; All work</a></nav>' +
    '<header class="case-header">' +
    '<ul class="tag-row">' + p.tags.map((t) => '<li class="tag">' + t + "</li>").join("") + "</ul>" +
    "<h1>" + p.title + "</h1>" +
    '<p class="lead">' + p.outcome + "</p>" +
    '<dl class="case-meta">' +
    '<div class="meta-box"><dt>My role</dt><dd>' + p.role + "</dd></div>" +
    '<div class="meta-box"><dt>Tools &amp; tech</dt><dd>' + p.tools.join(", ") + "</dd></div>" +
    '<div class="meta-box"><dt>Links</dt><dd>' +
    (p.links.live ? '<a href="' + p.links.live + '" target="_blank" rel="noopener">Live demo</a>' : "") +
    (p.links.live && p.links.code ? " · " : "") +
    (p.links.code ? '<a href="' + p.links.code + '" target="_blank" rel="noopener">Code</a>' : "") +
    "</dd></div>" +
    "</dl>" +
    "</header>" +
    '<div class="case-figure">' + figures + "</div>" +
    '<section class="case-section prose"><h2>The problem</h2><p>' + p.problem + "</p></section>" +
    '<section class="case-section prose"><h2>My approach</h2><p>' + p.approach + "</p></section>" +
    '<section class="case-section prose"><h2>Outcome</h2><p>' + p.outcome + "</p></section>" +
    testimonial +
    '<section class="case-section hero-actions">' + liveBtn + codeBtn + "</section>" +
    '<section class="case-section"><a class="link-arrow" href="../work/' + next.slug + '.html">Next project: ' +
    next.title +
    " " +
    ICON_ARROW +
    "</a></section>";
}

initFeaturedGrid();
initWorkGrid();
initCaseStudy();
