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
  app/[lang]/        # every page lives under the locale segment (/en, /it)
  components/        # Header, Footer, LanguageSwitcher, shared ui classes
  components/home/   # landing page sections (Hero, Process, Exports, ...)
  dictionaries/      # en.json / it.json — all site copy lives here
  site.ts            # contact details and section anchor ids
  i18n.ts            # supported locales and default locale
  proxy.ts           # redirects "/" (and un-prefixed paths) to the visitor's language
```

### Adding or editing copy

All text is in `src/dictionaries/en.json` and `src/dictionaries/it.json`. Keep the
two files in the same shape — the English file defines the `Dictionary` type, so a
missing Italian key is a type error.

### Adding a page

Create `src/app/[lang]/<page>/page.tsx`, read `params.lang`, and load copy with
`getDictionary(lang)`. Add a link to it in `src/components/Header.tsx`.

### Branding

Design tokens live in `src/app/globals.css`: colours `ink`, `navy`, `slate`, `cream`,
`sand`, `gold` (e.g. `bg-navy`, `text-gold`), and fonts `font-serif` (Gloock) and
`font-sans` (Instrument Sans). Images are in `public/images/`.
