import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { href } from "@/site";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLinks from "./NavLinks";
import { images } from "@/images";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const { nav } = dict;
  const links = [
    { href: href(lang, "home"), label: nav.home },
    { href: href(lang, "about"), label: nav.about },
    { href: href(lang, "services"), label: nav.services },
    { href: href(lang, "industries"), label: nav.industries },
    { href: href(lang, "manufacturers"), label: nav.manufacturers },
    { href: href(lang, "buyers"), label: nav.buyers },
  ];

  return (
    <header className="mx-auto flex max-w-[1344px] flex-wrap items-center justify-between gap-x-7 gap-y-4 px-4 py-5.5 sm:px-12">
      <Link
        href={href(lang, "home")}
        aria-label={nav.homeLabel}
        className="inline-flex items-center gap-3.5"
      >
        <Image
          src={images.logo}
          alt={nav.logoAlt}
          width={62}
          height={52}
          loading="eager"
          className="h-[52px] w-[62px]"
        />
        <span className="font-serif text-[28px]">
          ItalBridge <span className="text-gold">Partners</span>
        </span>
      </Link>
      <NavLinks label={nav.menu} links={links} />
      <div className="flex items-center gap-4">
        <Link
          href={href(lang, "contact")}
          className="lift inline-flex min-h-11 items-center bg-gold px-5.5 py-3 font-bold text-ink hover:brightness-110"
        >
          {nav.cta}
        </Link>
        <LanguageSwitcher current={lang} label={nav.language} />
      </div>
    </header>
  );
}
