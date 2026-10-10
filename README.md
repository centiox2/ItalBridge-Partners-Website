# ItalBridge Partners Website

Bilingual (English / Italian) marketing site built with Next.js 16 (App Router) and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/[lang]/        # every page lives under the locale segment (/en, /it):
                     #   home, about, services, industries, manufacturers, buyers,
                     #   contact, privacy-policy, terms-of-use, cookie-policy, data-request
  components/        # Header, Footer, LanguageSwitcher, shared ui classes
  components/home/   # landing page sections (Hero, Process, Exports, ...)
  components/page/   # building blocks for the other pages (PageHero, Filmstrip,
                     #   CtaBand, InquiryForm, LegalPage, ...)
  lib/metadata.ts    # per-page title, description, canonical and hreflang
  dictionaries/      # en.json / it.json: shared and home page copy
                     # en/<page>.json / it/<page>.json: copy for each other page
  site.ts            # contact details and section anchor ids
  i18n.ts            # supported locales and default locale
  proxy.ts           # redirects "/" (and un-prefixed paths) to the visitor's language
```

### Adding or editing copy

All text is in `src/dictionaries/en.json` and `src/dictionaries/it.json`. Keep the
two files in the same shape — the English file defines the `Dictionary` type, so a
missing Italian key is a type error.

### Adding a page

1. Add the route to `routes` in `src/site.ts`.
2. Add `src/dictionaries/en/<page>.json` and `it/<page>.json` (same shape, with a
   `meta` title and description) and register them in `src/dictionaries/index.ts`.
3. Create `src/app/[lang]/<page>/page.tsx`: load copy with `getPage(lang, "<page>")`
   and export `generateMetadata` via `pageMetadata(params, "<page>")`.
4. Link it from `Header.tsx` and/or `Footer.tsx` with `href(lang, "<page>")`.

### Forms

The inquiry and data request forms do not post to a server yet: submitting opens
the visitor's email app with the message filled in (`InquiryForm.tsx`). Swap that
for a server action once a mail service is chosen.

### Branding

Design tokens live in `src/app/globals.css`: colours `ink`, `navy`, `slate`, `cream`,
`sand`, `gold` (e.g. `bg-navy`, `text-gold`), and fonts `font-serif` (Gloock) and
`font-sans` (Instrument Sans). Images are in `public/images/`.
