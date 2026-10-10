import type { Metadata } from "next";
import { getPage, type PageName } from "@/dictionaries";
import { defaultLocale, hasLocale, locales } from "@/i18n";
import { routes, type Route } from "@/site";

// Title, description and per-page canonical/hreflang links for a sub-page.
export async function pageMetadata(
  params: Promise<{ lang: string }>,
  page: PageName & Route,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = await getPage(lang, page);
  const path = routes[page];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${defaultLocale}${path}`,
      },
    },
  };
}
