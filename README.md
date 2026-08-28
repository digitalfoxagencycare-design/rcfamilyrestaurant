# RC Family Restaurant — Website

Website for RC Family Restaurant, Lambasinghi (Bhajangi, Chintapalli Mandal, ASR District, AP).
Built with React + Vite + Tailwind, designed for deployment on Cloudflare Pages, domain `rcfamilyrestaurant.com`.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy on Cloudflare Pages

1. Go to Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select this repository (`digitalfoxagencycare-design/rcfamilyrestaurant`).
3. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Then go to the Pages project → **Custom domains** → add `rcfamilyrestaurant.com` and `www.rcfamilyrestaurant.com`, and follow Cloudflare's DNS instructions (if the domain's nameservers are already on Cloudflare, this is a one-click add).

## Content

- Menu data: `src/data/menu.js` (sourced from the client's menu spreadsheet).
- Restaurant details (name, address, phone numbers, Google Maps link): `src/data/restaurant.js`.

## Roadmap (not yet built)

Online ordering + admin dashboard (matching the Hyderabadi Irani platform) is a separate,
larger phase — pending a decision on backend/database (Cloudflare D1 vs MongoDB Atlas Data API,
since Cloudflare Workers cannot use the native MongoDB driver).
