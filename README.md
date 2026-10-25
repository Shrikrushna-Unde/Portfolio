# Shrikrushna Unde — Portfolio

Personal portfolio site for a Java developer based in Pune. Plain HTML, CSS and
JavaScript — no framework, no build step, no dependencies to install.

**Live:** https://shrikrushna-portfolio.onrender.com

## What's in here

| File | Purpose |
| --- | --- |
| `index.html` | The whole page — hero, about, skills, experience, projects, contact |
| `ocean-glass.css` | The ocean background and the frosted glass card style |
| `style.css` | Layout, components, spotlight cards, responsive rules |
| `script.js` | Typing role, mobile menu, scroll reveal, active nav link, spotlight cards, back to top |
| `render.yaml` | Render Blueprint so the site deploys without manual setup |
| `assets/` | Photo, social preview image, favicons, resume PDF |

## Running it locally

There is no build step. Any static file server works:

```bash
npx http-server . -p 4321 -c-1
```

Then open http://localhost:4321.

Opening `index.html` directly with `file://` mostly works, but the fonts and
icons load over the network, so a local server is closer to the real thing.

## Deploying to Render

The repo contains a `render.yaml` Blueprint, so Render can configure itself:

1. Push this repo to GitHub.
2. In Render, choose **New → Blueprint** and pick the repo.
3. Render reads `render.yaml` and creates a static site. Approve it.

To set it up by hand instead, choose **New → Static Site**, connect the repo,
leave **Build Command** empty and set **Publish Directory** to `.`.

Every push to the default branch redeploys automatically.

## Changing the site URL

The site URL is written into the page in six places — the canonical link, the
Open Graph and Twitter tags, and the structured data. These have to be absolute
URLs; link previews on LinkedIn and WhatsApp break with relative ones.

If your Render service is not named `shrikrushna-portfolio`, or you add a custom
domain, update all six at once:

```bash
sed -i 's|https://shrikrushna-portfolio.onrender.com|https://your-new-url.com|g' index.html
```

The URL is also drawn into `assets/og-image.jpg`, so that image needs regenerating
to match. It is a 1200x630 JPEG.

## Notes

- Icons come from [Boxicons](https://boxicons.com) over CDN; the display font is
  [Outfit](https://fonts.google.com/specimen/Outfit) from Google Fonts.
- `prefers-reduced-motion` is respected: the typing effect, the drifting
  background, the card spotlights and smooth scrolling all stand down.
- After redeploying, run the URL through the
  [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) once —
  LinkedIn caches link previews for weeks otherwise.
