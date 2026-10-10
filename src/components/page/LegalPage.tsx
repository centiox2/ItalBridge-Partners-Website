import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { contact, href, type Route } from "@/site";
import { container, eyebrow, h1Page } from "../ui";

type Doc = Extract<Route, "privacy" | "terms" | "cookies" | "dataRequest">;

// Shared layout for the Privacy, Terms and Cookie pages: sticky sidebar
// with the other legal documents and a table of contents.
export default function LegalPage({
  lang,
  current,
  dict,
  title,
  intro,
  lastUpdated,
  sections,
}: {
  lang: Locale;
  current: Doc;
  dict: Dictionary;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: { title: string; text: string }[];
}) {
  const { legal, footer } = dict;
  const docs: { route: Doc; label: string }[] = [
    { route: "privacy", label: footer.privacy },
    { route: "terms", label: footer.terms },
    { route: "cookies", label: footer.cookies },
    { route: "dataRequest", label: legal.dataRequest },
  ];
  const email = contact.emails[0];

  return (
    <>
      <section className={`${container} pt-10 pb-18`}>
        <h1 className={`${h1Page} enter mb-5`}>{title}</h1>
        <p className="enter m-0 max-w-[760px] text-[21px] text-sand [--d:80ms]">{intro}</p>
      </section>
      <section className="bg-cream text-ink">
        <div className={`${container} flex flex-wrap items-start`}>
          <aside className="mt-[-1px] box-border w-full bg-navy px-7 py-8 text-[15px] text-cream md:sticky md:top-0 md:mr-14 md:w-auto md:flex-[0_1_340px]">
            <div className={`${eyebrow} mb-1.5 text-gold`}>{legal.documents}</div>
            <nav aria-label={legal.documents}>
              {docs.map((d) => (
                <Link
                  key={d.route}
                  href={href(lang, d.route)}
                  aria-current={d.route === current ? "page" : undefined}
                  className={`block py-1.5 ${d.route === current ? "font-bold text-gold" : "hover:text-gold"}`}
                >
                  {d.label}
                </Link>
              ))}
            </nav>
            <div className={`${eyebrow} mt-6 mb-1.5 text-gold`}>{legal.lastUpdated}</div>
            <div>{lastUpdated}</div>
            <div className={`${eyebrow} mt-6 mb-1.5 text-gold`}>{legal.onThisPage}</div>
            <nav aria-label={legal.onThisPage}>
              {sections.map((s, i) => (
                <a key={s.title} href={`#s${i + 1}`} className="block py-1.5 text-sand hover:text-gold">
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>
          </aside>
          <article className="flex-[1_1_min(560px,100%)] pt-14 pb-22">
            {sections.map((s, i) => (
              <section key={s.title} id={`s${i + 1}`} className="scroll-mt-4 border-t border-navy py-7.5">
                <h2 className="m-0 mb-2.5 font-serif text-[28px] leading-[1.15] font-normal text-navy">
                  {i + 1}. {s.title}
                </h2>
                <p className="m-0 max-w-[760px] text-lg">{s.text}</p>
              </section>
            ))}
          </article>
        </div>
      </section>
      <section className="bg-gold text-ink">
        <div className={`${container} flex flex-wrap items-center justify-between gap-x-12 gap-y-4 py-16`}>
          <h2 className="m-0 font-serif text-[clamp(30px,3.4vw,46px)] font-normal">{legal.questions}</h2>
          <p className="m-0 text-[19px]">
            {legal.contactUs}{" "}
            <a href={`mailto:${email}`} className="font-bold underline">
              {email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
