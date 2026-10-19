import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { contact, href } from "@/site";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLinks from "./NavLinks";
import { buttonInk, container, sizeSm } from "./ui";
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
    { href: href(lang, "about"), label: nav.about },
    { href: href(lang, "services"), label: nav.services },
    { href: href(lang, "industries"), label: nav.industries },
    { href: href(lang, "manufacturers"), label: nav.manufacturers },
    { href: href(lang, "buyers"), label: nav.buyers },
    { href: href(lang, "marketInsight"), label: nav.marketInsight },
  ];
  const [email] = contact.emails;
  const [phone] = contact.phones;

  return (
    <>
      <div className="bg-ink text-[13px] text-mist">
        <div className={`${container} flex flex-wrap justify-between gap-x-6 gap-y-2 py-2.5`}>
          <span className="flex items-center gap-2">
            <span aria-hidden className="pulse inline-block size-[7px] rounded-full bg-steel" />
            {nav.office}
          </span>
          <span className="flex flex-wrap items-center gap-x-2">
            <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            <span aria-hidden>·</span>
            <a href={`tel:${phone.tel}`} className="hover:text-white">{phone.display}</a>
            <span aria-hidden>·</span>
            <LanguageSwitcher current={lang} label={nav.language} />
          </span>
        </div>
      </div>
      <header className="border-b border-line">
        <div className={`${container} flex flex-wrap items-center justify-between gap-5 py-4.5`}>
          <Link
            href={href(lang, "home")}
            aria-label={nav.homeLabel}
            className="flex items-center gap-3 text-lg font-semibold tracking-[-0.01em]"
          >
            <span className="flex size-[42px] items-center justify-center rounded-md bg-ink">
              <Image src={images.logo} alt="" width={29} height={24} loading="eager" className="h-auto w-[29px]" />
            </span>
            ItalBridge Partners
          </Link>
          <NavLinks label={nav.menu} links={links} />
          <Link href={href(lang, "contact")} className={`${buttonInk} ${sizeSm}`}>
            {nav.cta}
          </Link>
        </div>
      </header>
    </>
  );
}
