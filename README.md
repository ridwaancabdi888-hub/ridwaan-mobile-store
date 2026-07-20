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

Then open `index.html` in your browser, or serve it:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## 📁 Project Structure

```
├── index.html   # App structure — all 6 screens + sheets
├── style.css    # Design system, layout, animations, dark mode
└── script.js    # Products data, cart, checkout, rewards, persistence
```

> **Note:** The Vercel deployment serves a single production-optimized `index.html` with the CSS and JS minified and inlined. This repository contains the readable three-file source code.

## ⚠️ Disclaimer

This is a **front-end demo** — the checkout is simulated and no real payments are processed. Product data is illustrative.

---

Built with ❤️ by **Ridwaan** · Hargeisa
