# Portfolio — Guide

## Folder structure
```
portfolio/
├── index.html
├── css/
│   ├── variables.css     <- colors & fonts (edit here to re-theme the site)
│   ├── base.css            <- reset, panel/fullpage scaffolding
│   ├── hero.css              <- top section
│   ├── projects.css            <- middle section (project cards)
│   ├── profile.css               <- bottom section
│   ├── overlay.css                 <- gallery overlay + lightbox
│   ├── dot-nav.css                   <- right-side navigation dots
│   └── responsive.css                  <- mobile/tablet overrides
├── js/
│   ├── config.js          <- EDIT HERE: your data (skills, contacts, GitHub repo)
│   ├── panel-backgrounds.js
│   ├── animated-background-3d.js
│   ├── fullpage-scroll.js
│   ├── skills-infographic.js
│   ├── profile-section.js
│   ├── projects-loader.js
│   ├── gallery-overlay.js
│   └── main.js              <- entry point, runs everything in order
├── images/
│   ├── background/            <- topbg.jpg, midbg.jpg, botbg.jpg
│   └── logo/                    <- logo.png
├── projects/                      <- 1 subfolder = 1 project
├── robots.txt
└── sitemap.xml
```
Each CSS/JS file owns exactly one part of the site, so you can
find and edit the right thing quickly, or swap a whole file out
without touching the rest.

## 1. Edit your data
Open **js/config.js** — this is the only file most people need to
touch:
- `GITHUB_CONFIG` — your GitHub username & repo name. Required for
  the Projects section to auto-load.
- `SKILLS` — your skills + level 1-10, shown as animated rings in
  the profile section.
- `PROFILE.languages` — same idea, for languages.
- `PROFILE.contacts` — your WhatsApp/Instagram/LinkedIn/Email links.

## 2. Edit hero text, logo, and visual slot
All in **index.html**:
- `id="hero-heading"` — the big heading
- `id="hero-sub"` — the short paragraph under it
- `#logo-slot` — points to `images/logo/logo.png`; drop your logo
  there with that exact name, or change the `src` to match your file
- `#hero-visual-slot` — empty slot on the right. Replace its content
  with an `<img>`, `<video>`, or an embedded 3D viewer of your choice

## 3. How the Projects section works
The site reads the `projects/` folder straight from your GitHub
repo using the GitHub API — nothing to configure by hand:
1. Create a new folder inside `projects/`, named after your project.
2. Put that project's photos inside it.
3. Commit & push to GitHub.
4. Refresh the site — the new project appears automatically, with
   one photo shown as the main image and the rest scattered behind it.

Requirements: your repo must be **public**, and `GITHUB_CONFIG` in
`js/config.js` must have the correct username and repo name.

Note: the unauthenticated GitHub API has a rate limit of about
60 requests/hour — plenty for a personal portfolio.

## 4. Background images
Drop 3 files into `images/background/`:
- `topbg.jpg` (hero section)
- `midbg.jpg` (projects section)
- `botbg.jpg` (profile section)

Missing files don't break anything — they just fall back to the
plain theme color.

## 5. Change the color theme
Everything lives at the top of **css/variables.css**:
- `--color-gold`, `--color-teal`, `--color-coral` — accent colors
- `--color-paper` — background color
- `--color-ink` — main text color

## 6. Fullpage scroll & navigation dots
Fullpage scroll (one wheel/swipe/keypress jumps a full section) is
active on screens wider than 900px. On phones/tablets it
automatically switches to normal scrolling. The 3 dots on the right
edge jump to a section and work in both modes.

## 7. SEO
All SEO tags live in **index.html**, inside `<head>`, marked with
an `SEO TAGS` comment. Edit:
- `<title>` and `<meta name="description">` — what shows up in
  Google search results
- every `username.github.io` — replace with your actual GitHub
  Pages address
- `og:image` / `twitter:image` — the image shown when your link is
  shared on social media

After going live, submit your site to:
- Google Search Console — https://search.google.com/search-console
- Bing Webmaster Tools — https://www.bing.com/webmasters
  (this also covers Yahoo automatically)
- Baidu Webmaster — https://ziyuan.baidu.com

Submit `sitemap.xml` in each tool (update the placeholder domain in
`sitemap.xml` and `robots.txt` first).

## 8. Testing before you upload
Opening `index.html` directly in a browser works for checking the
layout, but the Projects section won't load any photos until the
site is live on GitHub Pages — this is expected, since it needs a
real connection to the GitHub API.
