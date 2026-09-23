# LocalFarm — Frontend Only

A fully working, frontend-only React + Vite site for **LocalFarm**, a
village-grown organic produce brand. There is no backend, database, or
authentication server required to run this project — everything renders
from local mock data and bundled images.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static
`dist/` folder that can be deployed anywhere (Vercel, Netlify, GitHub
Pages, S3, etc.) with zero backend.

## How data works (no backend involved)

- **Products** live in [`src/data/products.json`](src/data/products.json)
  — 10 sample products (chicken, milk, eggs, coconuts, manure, paddy,
  groundnuts, bananas, mixed vegetables) modeled directly on LocalFarm's
  real catalog.
- **Images** are bundled from [`src/assets`](src/assets) — the real
  LocalFarm logo, hero photography, and per-product photos — and resolved
  by filename in [`src/services/productsService.js`](src/services/productsService.js).
- **Contact & enquiry forms** (`Contact.jsx`, `ProductDetails.jsx`) don't
  call any API. On submit, they open a pre-filled WhatsApp message to the
  farm's number instead — a zero-backend way to actually receive real
  enquiries.
- **`src/services/apiClient.js`** is a documented, unused placeholder
  showing the exact calls you'd make if you later connect a real backend.
  Nothing imports it today.

## Project structure

```
src/
  assets/            LocalFarm images: logo, hero photos, product photos
  components/        Header, Footer, ProductCard (reusable UI)
  pages/             Home, Products, ProductDetails, About, Contact
  data/               products.json — mock product catalog
  services/
    productsService.js   the real (mock/local) data layer every page uses
    apiClient.js          placeholder only — sketches future backend calls
backend-reference/   reference-only FastAPI backend structure (NOT wired up)
```

## About `backend-reference/`

The original project came with a working FastAPI backend (products,
contact, and enquiry endpoints, image upload, a database, email
notifications). That code is kept in [`backend-reference/`](backend-reference/README.md)
purely as an **architectural reference** — it is not installed, imported,
or called by anything in `src/`. See that folder's README for details and
for how you'd reconnect it in the future if you want a real backend again.

## Google Analytics (GA4)

The `gtag.js` snippet is already wired in — you just need your own ID:

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
   and add a **Web** data stream for your domain.
2. Copy the **Measurement ID** it gives you (looks like `G-XXXXXXXXXX`).
3. Replace both occurrences of `G-XXXXXXXXXX` in `index.html` with it.
4. Deploy. Since this is a single-page app, page views are sent manually
   on every route change (`src/hooks/useAnalytics.js`, wired into
   `src/App.jsx`) rather than relying on gtag's default single page load —
   otherwise GA would only ever see one page view no matter how many
   pages someone visits.

No analytics run until you swap in a real Measurement ID — the placeholder
script loads but nothing gets reported anywhere.

## SEO basics (getting indexed / ranked)

This project ships with the technical groundwork already in place:

- `public/robots.txt` and `public/sitemap.xml` — tell search engines what to crawl.
- A unique `<title>` and meta description per page (`src/hooks/usePageMeta.js`,
  used in every page component), instead of one generic title for the whole site.
- Open Graph tags in `index.html` for clean link previews on social/WhatsApp.

**Before deploying**, replace `https://yourdomain.com` in `public/robots.txt`,
`public/sitemap.xml`, and the `og:` / `canonical` tags in `index.html` with
your real domain.

**After deploying**, to actually get indexed:

1. Submit the site in [Google Search Console](https://search.google.com/search-console)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters) — paste your
   sitemap URL (`https://yourdomain.com/sitemap.xml`) in each.
2. Create a free [Google Business Profile](https://www.google.com/business/)
   for the farm (address, hours, photos). This is what actually gets local
   businesses into the map pack / "near me" results, separate from the
   regular site listing.
3. Indexing takes days to a few weeks. Ranking #1 organically is never
   guaranteed — it depends on content depth, backlinks, and competition.
4. If you want guaranteed top placement immediately, that's **Google Ads**
   (paid, marked "Sponsored"), not SEO — a separate account and budget.

## Branding preserved

This build keeps LocalFarm's actual identity: the LF logo in the header
and footer, the green/white brand palette, the farm hero photography, the
Bootstrap-based layout and page structure (Home, Products, Product
Details, About, Contact), and the WhatsApp-first contact experience the
original design was built around.
