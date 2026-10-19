# AGYEDABE ENTERPRISE Real Estate — Implementation Plan

## Approved scope and delivery approach

Build the client's presentation-ready Ghanaian real-estate and building-consultancy website as a real Next.js App Router project using React, TypeScript, Tailwind CSS, Lucide React, reusable components and local TypeScript seed data. The user requests three staged deliveries, with an ordinary commit pushed to GitHub after each complete phase. The site is a demo: no production database, payment gateway, CRM, authentication or remote enquiry delivery. Browser localStorage is reserved for demo admin persistence, and public pages must not show or link to `/admin`.

Phase 1 is the foundation, shared public shell and complete homepage. Phase 2 is the property discovery/detail experience and About, Services and Contact routes. Phase 3 is the responsive `/admin` demo CRUD experience, localStorage reset/validation, README, quality checks and the final GitHub push. The user has supplied both a horizontal logo SVG and compact icon SVG; use these source assets as supplied. Do not inspect them again with an image-viewing tool. The brief's client-provided Tantra Hill property photographs were not attached, so use distinct, locally copied sample property images and label invented properties as demo content; do not represent them as confirmed availability.

## Implementation structure

- `src/app/`: App Router page and layout files for `/`, `/properties`, `/properties/[slug]`, `/about`, `/services`, `/contact`, and `/admin`, plus `globals.css` and a not-found route.
- `src/components/layout/`: public header, footer, brand mark and responsive navigation; public shared components contain no admin link.
- `src/components/home/`: homepage hero/search, trust indicators, featured properties, categories, service cards, about teaser, process and final CTA.
- `src/components/properties/`: search/filter controls, property cards, gallery, details and enquiry actions.
- `src/components/admin/`: admin shell, computed overview, property table, add/edit form, confirmation dialogs and reset control.
- `src/data/properties.ts`: at least eight typed demo property records, including the Tantra Hill client listing and explicitly demo-only examples.
- `src/types/property.ts`: shared listing/status/currency/property field types.
- `src/lib/property-utils.ts`: filtering, sorting, formatting, query parsing and contact-link utilities.
- `src/lib/demo-storage.ts`: hydration-safe browser localStorage load/save/reset helpers with seed-data fallback.
- `public/brand/`: supplied horizontal and icon SVGs. `public/images/`: locally copied, distinct sample property imagery.
- `public/manus-routes.json`: synchronized page route manifest.
- `README.md`: setup, demo limits, localStorage behavior and production-integration requirements.
- `TODO.md`: outcome criteria and phase progress. This plan remains the implementation/design source of truth.

## Design direction

### Design movement

Contemporary Ghanaian architectural editorial: a premium property journal rather than a generic listing portal or SaaS dashboard.

### Core principles

1. Make each property's location, price, status and essential facts immediately legible.
2. Use restrained architectural imagery, generous whitespace and confident editorial type instead of visual clutter.
3. Ground the brand in the supplied forest-green and champagne-gold palette and the supplied logo assets.
4. State demo limitations honestly and avoid unsupported company, market, availability or credential claims.

### Color philosophy

Forest green `#103D2E` conveys steadiness and local trust; champagne gold `#C9A45C` is a selective architectural accent; warm ivory `#F7F4EC` softens broad page fields; white supports reading surfaces; charcoal `#252A27` carries body text. Gold is limited to short rules, small labels and selected controls rather than large decorative blocks.

### Layout paradigm

Use an editorial composition with asymmetrical hero copy/photo balance, aligned search controls, spacious full-width section transitions and flexible property grids. Listing cards remain image-led but compact; long-form routes use narrow text measures and strong section hierarchy. The admin uses a distinct light workspace with compact navigation and data tables, not the public editorial layout.

### Signature elements

- Thin champagne-gold rules and small uppercase section eyebrows.
- Forest-green action surfaces with subtle ivory and gold contrast.
- Architectural image crops with consistent aspect ratios and fine borders.

### Interaction and animation

Interactions should be direct and predictable: filters update the visible set and share state in the URL; contact links clearly launch WhatsApp/call/email; admin changes show explicit confirmation and persist only in the current browser. Use gentle hover/focus transitions and short opacity/position reveals only where useful. Respect `prefers-reduced-motion`; never depend on animation for access to content.

### Typography system

Use a clean modern sans-serif such as Manrope for headings and body copy, with strong but restrained weight contrast. Large editorial headlines use tight leading; card titles and metadata remain compact and high-contrast. Keep currency, labels and UI text highly readable on mobile.

### Brand essence and voice

**Positioning:** Practical property discovery and building-consultancy support for people buying, renting or asking about property in Ghana. **Personality:** assured, clear, welcoming.

Brand voice is factual, helpful and warm. Example lines: “Find a property that feels like home.” “Tell us what you’re looking for; we’ll help you take the next step.” Avoid inflated claims and false urgency.

### Wordmark, logo and signature color

Use the user's supplied horizontal SVG as the full wordmark in the desktop public header and footer, and the user's supplied icon SVG in compact mobile or square contexts. Keep the assets replaceable in `public/brand/`; do not redraw or substitute them. The ownable signature color is forest green `#103D2E`.

## Data, interactions and constraints

Use a typed property shape containing id, slug, title, description, location, city, listingType, propertyType, price, currency, bedrooms, bathrooms, parkingSpaces, area, features, images, status, featured, createdAt and reference. Seed at least eight realistic Accra-area examples in multiple property categories, price ranges and currencies. The Tantra Hill listing is `4-Bedroom House for Sale at Tantra Hill`, Tantra Hill, Accra, Ghana, Sale, four bedrooms, four bathrooms marked as a demo interpretation of “4BR Ensuite” and subject to verification, US$320,000 plus displayed GH₵3,740,000, slightly negotiable, with four en-suite bedrooms, swimming pool, fitted kitchen, POP ceiling, CCTV, borehole and electric fence. Keep WhatsApp-only 0243441098 separate from calls-only 0533926768; email is davidagbemafle390@gmail.com.

The public listing filters use URL query parameters and case-insensitive keyword matching; sorting supports newest, price low-to-high and price high-to-low. The detail page derives its content from the selected listing, uses selectable gallery thumbnails, similar properties and URL-encoded contact messages. Contact form submission is a front-end demo confirmation only. Admin reads the local seed consistently on initial render, then loads localStorage after mount to prevent hydration mismatch. Reset restores the original seed data. No public page or shared public component may surface an admin route/link/button.

## Delivery phases

1. **Phase 1 — Foundation + homepage:** project foundations, brand assets, public shell, homepage, responsive search handoff, route manifest and first GitHub phase commit.
2. **Phase 2 — Public pages:** typed data, property list/search/filter/sort, dynamic detail/not-found, About, Services and Contact; second GitHub phase commit.
3. **Phase 3 — Demo admin + handoff:** complete local CRUD, computed dashboard, README, focused code/build checks and final GitHub phase commit.

Each phase is complete only when its outcome and affected checks are in place. Push one regular commit to the repository's main branch after each completed phase. Do not publish/deploy the website unless separately requested.
