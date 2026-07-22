# 📱 Ridwaan Mobile Store

A modern and responsive smartphone shopping web app built with **HTML, CSS and JavaScript** — no frameworks, no build tools.

## 🌐 Live Demo

**👉 https://ridwaan-mobile-store.vercel.app**

## ✨ Features

- **Mobile-app experience** — phone-frame layout, 5-tab bottom navigation (Home, Shop, Cart, Rewards, Profile), smooth screen transitions
- **12 smartphones** from 8 brands (Apple, Samsung, Google, Xiaomi, OnePlus, Nothing, Motorola, Honor) with pure-CSS product art
- **Shop** — live search, brand chips, price-range filter, in-stock filter, and 5 sorting options
- **Product details** — color swatches, storage options, quantity stepper, wishlist
- **Cart & checkout** — quantity controls, promo code `RIDWAAN10` (10% off), 500-point redemption, delivery fee logic (free over $800 or for Gold members), form validation, order confirmation with confetti 🎉
- **Rewards** — animated points ring, 4 membership levels (Bronze → Platinum), "You're Gold" celebration
- **Profile** — order history, wishlist, saved addresses, payment methods (Cash on Delivery, Zaad, eDahab, Card)
- **Dark mode** 🌙, three languages (English / Soomaali / العربية), accessible (ARIA labels, focus states, reduced-motion support)
- **Persistent state** — cart, wishlist, points, orders and settings saved to `localStorage`

## 🚀 Run Locally

No dependencies needed — it's pure HTML/CSS/JS:

```bash
git clone https://github.com/ridwaancabdi888-hub/ridwaan-mobile-store.git
cd ridwaan-mobile-store
```

Then open `index.html` directly, or start a local server with one of these commands:

```bash
npx serve .
# or (macOS/Linux)
python3 -m http.server 8000
# or (Windows)
py -m http.server 8000
```

Open the address printed by `npx serve`, or visit `http://localhost:8000` when using Python.

## 📁 Project Structure

```
├── index.html   # App structure — all 6 screens + sheets
├── style.css    # Design system, layout, animations, dark mode
└── script.js    # Products data, cart, checkout, rewards, persistence
```

> **Note:** The Vercel deployment serves a single production-optimized `index.html` with the CSS and JS minified and inlined. This repository contains the readable three-file source code.

## ⚠️ Disclaimer

This is a **front-end demo** — the checkout is simulated and no real payments are processed. Product data is illustrative.

## SEO and Google Search Console

Production SEO endpoints:

- Canonical website: https://ridwaan-mobile-store.vercel.app/
- Sitemap: https://ridwaan-mobile-store.vercel.app/sitemap.xml
- Robots file: https://ridwaan-mobile-store.vercel.app/robots.txt

To add the site to Google Search Console:

1. Add the URL-prefix property `https://ridwaan-mobile-store.vercel.app/` in [Google Search Console](https://search.google.com/search-console).
2. Choose HTML tag verification and copy the verification token.
3. Add `<meta name="google-site-verification" content="YOUR_TOKEN">` inside the `<head>` of `index.html`, deploy, then select **Verify**.
4. Open **Sitemaps** and submit `sitemap.xml`.
5. Use **URL Inspection** on the homepage and select **Request Indexing** after the deployment is live.

Search indexing and rankings are controlled by Google and are not guaranteed. This repository is the source for the production domain above; do not point another repository at the same canonical URL unless it is intentionally replacing this deployment.

---

Built with ❤️ by **Ridwaan** · Hargeisa
