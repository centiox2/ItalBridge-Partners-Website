import type { Locale } from "@/i18n";
import type en from "./en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default),
  it: () => import("./it.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
