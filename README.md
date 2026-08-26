# Mikiyas Adefris — Portfolio

A fast, dark-mode personal portfolio for a **Backend & LMS Engineer (PHP, SQL, Moodle, Docker)** — plain HTML/CSS/JS, no build step, no framework. Host it anywhere (GitHub Pages, Netlify, Vercel, or any web host) and it works.

> Prefer a no-code builder like Framer/Wix/Squarespace? All the copy, structure, and the project content model below map 1:1 to those platforms' CMS collections — but this coded version is faster, free to host, and you own every line.

---

## File map

```
mikiyas-portfolio/
├── index.html                     Home (hero, featured projects, what I do)
├── work.html                      Projects index with tag filters
├── about.html                     Bio, skills, tools, résumé button
├── services.html                  Services, placeholder rates, process
├── contact.html                   Contact links + form (success/error states)
├── 404.html                       Not-found page
├── robots.txt / sitemap.xml       SEO basics
├── work/
│   ├── guess-the-number.html              Case study 1
│   ├── minimalist-money-manager.html      Case study 2
│   └── hospital-management-location.html  Case study 3
└── assets/
    ├── css/styles.css             Design system (colors/fonts in :root)
    ├── js/projects.js             ← PROJECT DATA — edit projects here
    ├── js/main.js                 Nav, reveal animations, contact form
    ├── img/                       Favicon, avatar, previews, og-image.png
    └── files/                     (empty) drop your résumé PDF here
```

---

## 1. Replace the placeholders

Search the whole folder for each string below and replace it (VS Code: `Ctrl+Shift+H` → Search & Replace in Files).

| Placeholder | Where it appears | Replace with |
|---|---|---|
| `YOUR_EMAIL` | `index.html` (Email me button), `contact.html`, `assets/js/main.js` | Your real email, e.g. `mikiyas@example.com` |
| `YOUR_UPWORK_URL` | `index.html`, `contact.html` | Your Upwork profile URL |
| `RESUME_URL` | `about.html` | Path to your PDF, e.g. `assets/files/Mikiyas-Adefris-Resume.pdf` (drop the file into `assets/files/`) — or a Google Drive/Dropbox share link |
| `https://YOUR_DOMAIN` | every page (`canonical`, Open Graph), `sitemap.xml`, `robots.txt` | Your final site URL after step 4 (e.g. `https://mikiyas.dev`) |
| `FORMSPREE_ENDPOINT` in `assets/js/main.js` | contact form | Your Formspree endpoint (step 3), or leave empty for mailto fallback |
| `$XXX` rates | `services.html` | Your real starting rates |
| GitHub code links for projects | `assets/js/projects.js` → each project's `links.code` | Real repo URLs (verify these before publishing) |

Also worth updating:

- **Screenshots:** replace the SVG previews in `assets/img/project-*.svg` with real screenshots (WebP or JPG, ~1200×675, under 200 KB). Keep the same file names and everything updates automatically.
- **Analytics:** see section 5.
- **Résumé PDF:** export from your doc editor, name it clearly, put it in `assets/files/`.

---

## 2. Add or edit a project (content model)

Open **`assets/js/projects.js`**. Everything on the Home grid, Work index, filters, and case study pages is generated from the `PROJECTS` array at the top of that file.

Each project uses these fields:

```js
{
  title:       "My New Project",            // shown everywhere
  slug:        "my-new-project",            // must match the page file name
  summary:     "One-line description.",     // card description
  tags:        ["Backend", "LMS"],          // filter chips (Backend, LMS,
                                            // Full-stack, Frontend practice)
  role:        "Backend developer",
  tools:       ["PHP", "MySQL"],
  images:      ["assets/img/my-shot.svg"],  // screenshots in assets/img/
  imageAlt:    "Describe the screenshot",   // accessibility text
  links:       { live: "https://...", code: "" }, // "" hides the button
  problem:     "What problem did this solve?",
  approach:    "How did you build it?",
  outcome:     "One-line result (also shown under the case study title).",
  testimonial: null,   // or { quote: "...", author: "Name", role: "CEO, X" }
  featured:    true,   // true = appears on the Home grid (max 3 recommended)
  order:       4       // sort position (1 = first)
}
```

To add a project:

1. Copy an existing object in the array, paste it, edit the fields.
2. Create the case study page: duplicate any file in `work/`, rename it to `<slug>.html`.
3. In the new file, change two things: the `<title>` + meta tags near the top, and the line `window.CASE_SLUG = "..."` to your new slug.
4. Done — grids, filters, and the "next project" link update automatically.

To reorder projects, change each project's `order` number. To hide one, set `featured: false` (it stays on the Work index) or delete its object and its HTML file.

---

## 3. Turn on the contact form

The form works out of the box as a mailto fallback (it opens the visitor's email app addressed to you). For real inbox submissions:

1. Create a free account at [formspree.io](https://formspree.io) → **New form**.
2. Copy the endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. Paste it into `assets/js/main.js`:
   ```js
   var FORMSPREE_ENDPOINT = "https://formspree.io/f/abcdwxyz";
   ```
4. Submit a test message from the live site, then confirm it in Formspree's inbox.

Success and error states are already built in (green/red status box above the form).

---

## 4. Publish the site

Pick ONE option. All are free to start.

### Option A — Netlify (easiest)

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Deploy manually**.
2. Drag the whole `mikiyas-portfolio` folder onto the drop zone.
3. Your site is live at `something.netlify.app` immediately. Connect repo later for auto-deploys if you like.

### Option B — GitHub Pages

1. Create a new public repo on GitHub (e.g. `portfolio`).
2. Upload all files (drag-and-drop in the web UI, or `git init && git add . && git commit && git push`).
3. Repo → **Settings** → **Pages** → Source: `main` branch, `/ (root)` → Save.
4. Site goes live at `https://micky-afro.github.io/portfolio/` in a few minutes.

### Option C — Vercel

Import the repo at [vercel.com/new](https://vercel.com/new) → deploy (no build settings needed).

### Option D — Traditional hosting (Hostinger, cPanel…)

Upload the contents of `mikiyas-portfolio/` into `public_html/` via the file manager. Done.

---

## 5. Connect a custom domain (yourname.com)

1. Buy the domain at any registrar (Namecheap, Porkbun, Cloudflare, Hostinger…).
2. Point DNS at your host:

**If hosted on Netlify:** Site settings → **Domain management** → *Add custom domain* → enter `yourname.com`. Netlify shows you the records to create at your registrar:
   - `A` record: `@` → `75.2.60.5`
   - `CNAME` record: `www` → `your-site.netlify.app`
   - (Or just switch the registrar's nameservers to Netlify's and let it manage everything.)
   HTTPS is automatic via Let's Encrypt.

**If hosted on GitHub Pages:** Settings → **Pages** → *Custom domain* → type `yourname.com` → Save. Then at your registrar create:
   - `A` records: `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record: `www` → `micky-afro.github.io`
   - Wait for DNS check to pass, then enable **Enforce HTTPS**.

**If hosted on Vercel:** Project → Settings → Domains → add `yourname.com` and follow the on-screen DNS instructions.

DNS changes can take anywhere from a few minutes to 48 hours.

3. After the domain resolves, replace `https://YOUR_DOMAIN` everywhere (step 1 table) with your real URL so canonical tags, Open Graph links, and the sitemap are correct. Re-deploy/re-upload.

---

## 6. Analytics (optional)

Every page's `<head>` contains a commented-out Google Analytics 4 snippet placeholder location — after creating a GA4 property at [analytics.google.com](https://analytics.google.com), paste the gtag snippet before `</head>` on each page with your Measurement ID (`G-...`). Netlify/Vercel also offer built-in analytics with zero code if you prefer simplicity.

---

## 7. Local preview & quality checklist

**Preview locally:** open `index.html` directly in a browser (works fine), or run a tiny server:
- VS Code → install the *Live Server* extension → right-click `index.html` → Open with Live Server; or
- `npx serve .` / `python -m http.server`

**Before going live:**

- [ ] All placeholders replaced (section 1)
- [ ] Test the contact form end-to-end
- [ ] Résumé PDF opens correctly
- [ ] Real screenshots added and compressed (<200 KB each)
- [ ] Check [PageSpeed Insights](https://pagespeed.web.dev/) on mobile — should score high (static site, system fallback fonts, lazy-loaded images)
- [ ] Tab through pages: focus rings visible, mobile menu opens/closes with keyboard
- [ ] Titles/meta descriptions still say "Mikiyas Adefris — Backend & LMS Engineer" where expected

## Accessibility & SEO built in

- Semantic landmarks (`header/nav/main/footer`), skip link, logical heading order
- Alt text on images, `aria-current` nav states, `role="status"` live region on the form
- Visible focus states, AA-contrast dark palette, `prefers-reduced-motion` respected
- Per-page titles + meta descriptions, Open Graph/Twitter cards, canonical URLs, JSON-LD Person schema, sitemap + robots.txt

## Design tokens (for recreating in a builder)

| Token | Value |
|---|---|
| Background | `#0a0e14` |
| Surface / cards | `#10161f` |
| Text | `#e8eef5` |
| Muted text | `#9aa8b8` |
| Accent | `#38bdf8` (cyan) |
| Fonts | Inter (headings + body), JetBrains Mono (tags/code) |
