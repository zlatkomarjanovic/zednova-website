# Sanity CMS — ZedNova Studio

Hosted Studio: **https://zednova-studio.sanity.studio/**

Project: **umo6y27o** · Dataset: **production**

## Repo layout

```
zednova-website/           ← Next.js site
studio-zednova-studio/     ← Sanity Studio
src/sanity/                ← Client, GROQ queries, fetchers, mappers
scripts/seed-sanity.ts     ← Import static content into Sanity
```

Static files in `src/lib/content/` remain as **fallback** when Sanity is empty or unreachable.

## Environment variables

Copy `.env.example` → `.env.local` and fill in tokens from [sanity.io/manage](https://www.sanity.io/manage).

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `umo6y27o` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API date, e.g. `2026-05-15` |
| `SANITY_API_READ_TOKEN` | Server-side reads (drafts + private) |
| `SANITY_API_WRITE_TOKEN` | Seed script only |

**Never commit tokens.** Rotate any token that was shared in chat or logs.

## Commands

From repo root:

```bash
npm run studio:dev      # Studio at http://localhost:3333
npm run studio:deploy   # Deploy hosted Studio (after schema changes)
npm run seed:sanity     # Push services, industries, migrations, nav into CMS
npm run dev             # Next.js
npm run build           # Production build
```

## CMS collections (live on frontend)

| Document | Used on |
|----------|---------|
| `service` | Service pages, homepage showcase, contact form |
| `serviceMegaMenuCard` | Mega menu, mobile nav, footer, services page |
| `subService` | Sub services under each parent (homepage deliverables list, services page grids) |
| `customSoftware` | Custom software page, nav, services page |
| `migration` | Migrations pages, mega menu, footer |
| `industryParent` / `industry` | Industry pages, nav, homepage carousel, contact form |

### Industry parent landing pages

Only **6 parent** industry URLs are public (`/industries/<parent-slug>`). The 49 `industry` segment documents are children — no dedicated routes; sub URLs 301 to the parent.

Parent landing copy is editable on `industryParent`:

- Hero: `heroEyebrow`, `heroHeadline`, `heroSubhead`
- Problems: `problemsHeadline`, `problems[]` (painPoint)
- AI pressures: `aiPressuresHeadline`, `aiPressuresSubtext`, `aiPressures[]`
- Sections: `subIndustries*`, `work*`, `services*`, `faq*`, `ctaHeading`, `ctaSub`
- Optional: `featuredSubIndustries[]` (references to `industry` docs for ordered sub-grid)

Static fallbacks live in `src/lib/content/industry-detail-fallbacks.ts`. Re-seed with `npm run seed:sanity` after editing fallbacks.

Regenerate sub→parent redirects after changing `industry-subs.ts`:

```bash
npm run generate:industry-redirects
```

Query layer: `src/lib/queries.ts` → `src/sanity/fetchers.ts` + GROQ in `src/sanity/queries.ts`.

## Re-seed after editing static source

If you change `src/lib/content/*.ts` and want Sanity to match:

```bash
npm run seed:sanity
```

Documents use stable `_id`s (e.g. `service-ai-lead-site`) so re-running updates in place.

## Schemas (other collections — not yet wired to pages)

| Document | Maps to |
|----------|---------|
| `post` | Insights / blog |
| `author` | Insight authors |
| `caseStudy` | Work case studies |
| `portfolioProject` | Homepage / work portfolio cards |
| `product` | Products page |
| `testimonial` | Testimonials |
| `siteSettings` | Singleton site config |

## Vision (test GROQ)

In Studio → **Vision**:

```groq
*[_type == "service"]{ title, "slug": slug.current, group }
```

## Next steps

1. Wire remaining types (posts, case studies, portfolio, products) to GROQ.
2. Create **Site settings** singleton in Studio.
3. Add Portable Text renderer for post bodies.
4. Enable preview / draft mode with `next-sanity`.

## CORS (if fetch fails from browser)

In Sanity project settings → API → CORS, add:

- `http://localhost:3000`
- Your production domain

Server components use the read token and do not need public CORS for content API.
