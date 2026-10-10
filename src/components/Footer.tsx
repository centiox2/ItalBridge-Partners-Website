import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { contact, href, socials } from "@/site";
import { images } from "@/images";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const heading = "text-gold";
const column = "flex flex-col gap-2";
const link = "hover:text-gold";

export default async function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const year = await currentYear();
  const { nav, footer } = dict;

  return (
    <footer className="border-t border-cream/20 text-sm">
      <div className="mx-auto flex max-w-[1344px] flex-wrap gap-9 px-4 pt-14 pb-5 sm:px-12">
        <div className="flex-[2_1_280px]">
          <div className="flex items-center gap-3">
            <Image src={images.logo} alt="" width={52} height={44} className="h-11 w-auto" />
            <span className="font-serif text-2xl">ItalBridge Partners</span>
          </div>
          <p className="mt-3 mb-4 max-w-[340px] text-sand">{footer.tagline}</p>
          <ul aria-label={footer.social} className="m-0 flex list-none flex-wrap gap-x-4.5 gap-y-1.5 p-0">
            {socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${column} flex-[1_1_140px]`}>
          <b className={heading}>{footer.navigate}</b>
          <Link href={href(lang, "home")} className={link}>{nav.home}</Link>
          <Link href={href(lang, "about")} className={link}>{nav.about}</Link>
          <Link href={href(lang, "services")} className={link}>{nav.services}</Link>
          <Link href={href(lang, "industries")} className={link}>{nav.industries}</Link>
          <Link href={href(lang, "manufacturers")} className={link}>{nav.manufacturers}</Link>
          <Link href={href(lang, "buyers")} className={link}>{nav.buyers}</Link>
        </div>
        <div className={`${column} flex-[1_1_170px]`}>
          <b className={heading}>{footer.legal}</b>
          <Link href={href(lang, "privacy")} className={link}>{footer.privacy}</Link>
          <Link href={href(lang, "terms")} className={link}>{footer.terms}</Link>
          <Link href={href(lang, "cookies")} className={link}>{footer.cookies}</Link>
          <Link href={href(lang, "dataRequest")} className={link}>{footer.dataRequest}</Link>
        </div>
        <div className={`${column} flex-[1.4_1_220px]`}>
          <b className={heading}>{footer.contact}</b>
          {contact.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className={link}>
              {email}
            </a>
          ))}
          {contact.phones.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`} className={link}>
              {phone.display}
            </a>
          ))}
          <span>{footer.location}</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1344px] px-4 pt-3 pb-7 text-[13px] text-sand sm:px-12">
        © {year} ItalBridge Partners. {footer.rights}
      </div>
    </footer>
  );
}
