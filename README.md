# AGYEDABE ENTERPRISE Real Estate Demo

A responsive Ghanaian real-estate and building-consultancy website demo built with Next.js App Router, React, TypeScript, Tailwind CSS and Lucide icons. It includes property discovery, detail pages, company/service/contact pages and a browser-local admin presentation dashboard.

## Run locally

Requirements: Node.js 20.9 or later and npm. The project pins its primary dependencies and includes `package-lock.json`.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Other useful commands:

```bash
npm run typecheck
npm run build
npm start
```

## Pages

Public pages: `/`, `/properties`, `/properties/[slug]`, `/about`, `/services` and `/contact`. The direct-entry presentation dashboard is at `/admin`; it is intentionally omitted from all public-site navigation.

The static route declaration is at [`public/manus-routes.json`](public/manus-routes.json). The client-supplied primary wordmark (`public/brand/01_primary-logo.png`) and compact icon (`public/brand/06_icon-only.png`) are used throughout the site. Demo property images are bundled in [`public/images/`](public/images/); source notes are in [`public/images/ASSET_SOURCES.md`](public/images/ASSET_SOURCES.md).

## Demo data and limitations

The property catalogue starts from typed sample records in `src/data/properties.ts`. Listings and images are demonstration material, not confirmation that a property is real, available or accurately priced. Confirm property details directly before relying on them. The Tantra Hill example includes a verification note for the interpreted bathroom count and a secondary GHS price display. The bundled photographs are illustrative Unsplash search-result images, not verified photographs of the listed properties; verify each source and usage terms before commercial publication.

The `/admin` area is a presentation demo, not a secured management system. It has no login, authorization, production database, server API, customer-enquiry backend or real analytics. Create, edit, delete, feature, status and reset actions persist only in this browser's `localStorage` under `agyedabe-enterprise-demo-properties-v1`. Data is browser-specific, may be cleared by the browser, is not shared across devices, and should not be used for private customer or live business information. Use **Reset Demo Data** to restore the original seed records.

The contact form validates input and shows a local success-style message only; it does not send or store an enquiry. WhatsApp, call and email buttons open their respective contact methods. WhatsApp is for messages to 0243441098; 0533926768 is calls-only; email is `davidagbemafle390@gmail.com`.

Before production use, provide secure authentication and authorization, a production data store and API, a real enquiry-delivery/retention workflow, production image storage, verified property details/prices and appropriate privacy/security review.
