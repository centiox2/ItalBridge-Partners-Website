import Image from "next/image";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { sections } from "@/site";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  // Section links include the locale path so they also work from other pages.
  const home = `/${lang}`;
  const links = [
    { href: `${home}#top`, label: dict.nav.home },
    { href: `${home}#${sections.services}`, label: dict.nav.services },
    { href: `${home}#${sections.industries}`, label: dict.nav.industries },
    { href: `${home}#${sections.manufacturers}`, label: dict.nav.manufacturers },
    { href: `${home}#${sections.buyers}`, label: dict.nav.buyers },
  ];

  return (
    <header className="enter mx-auto flex max-w-[1344px] flex-wrap items-center justify-between gap-4 px-4 py-7 sm:px-12">
      <a
        href={`${home}#top`}
        aria-label={dict.nav.homeLabel}
        className="inline-flex items-center gap-3.5"
      >
        <Image
          src="/images/logo.png"
          alt={dict.nav.logoAlt}
          width={420}
          height={353}
          priority
          className="h-[52px] w-auto"
        />
        <span className="font-serif text-[28px]">
          ItalBridge <span className="text-gold">Partners</span>
        </span>
      </a>
      <nav className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px] font-medium">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-gold">
            {link.label}
          </a>
        ))}
        <LanguageSwitcher current={lang} label={dict.nav.language} />
      </nav>
    </header>
  );
}
