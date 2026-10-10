import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contact, href } from "@/site";
import InquiryForm from "@/components/page/InquiryForm";
import PageHero from "@/components/page/PageHero";
import { inquiryFields } from "@/components/page/fields";
import { container, eyebrow, h2 } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/contact">) =>
  pageMetadata(params, "contact");

const h2Form = "m-0 mb-6 font-serif text-[clamp(30px,3.4vw,46px)] leading-[1.05] font-normal text-navy";
const value = "font-serif text-2xl break-all text-navy";

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ form }, { hero, details, form: formCopy, portals, location }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "contact"),
  ]);
  const [info, sales] = contact.emails;

  const rows = [
    { label: details.general, content: <a href={`mailto:${info}`} className={`${value} hover:underline`}>{info}</a> },
    { label: details.sales, content: <a href={`mailto:${sales}`} className={`${value} hover:underline`}>{sales}</a> },
    {
      label: details.phone,
      content: contact.phones.map((p) => (
        <a key={p.tel} href={`tel:${p.tel}`} className={`${value} block hover:underline`}>
          {p.international}
        </a>
      )),
    },
    { label: details.hq, content: <div className={value}>{details.hqValue}</div> },
    { label: details.response, content: <div className={value}>{details.responseValue}</div> },
  ];

  const portalCard = "lift block flex-[1_1_min(520px,100%)] px-4 py-16 hover:brightness-110 sm:px-14";

  return (
    <>
      <PageHero
        title={hero.title}
        text={hero.text}
        image={images.nairobi}
        imageAlt={hero.imageAlt}
        objectPosition="55% center"
      />

      <section className="bg-cream text-ink">
        <div className={`${container} flex flex-wrap gap-x-18 gap-y-12 py-24`}>
          <div className="flex-[1_1_min(400px,100%)]">
            <h2 className={h2Form}>{details.title}</h2>
            {rows.map((row) => (
              <div key={row.label} className="border-t border-navy py-4">
                <div className={`${eyebrow} text-[#4b5463]`}>{row.label}</div>
                {row.content}
              </div>
            ))}
          </div>
          <div className="flex-[1.5_1_min(540px,100%)]">
            <h2 className={h2Form}>{formCopy.title}</h2>
            <InquiryForm
              id="contact"
              fields={inquiryFields(form)}
              to={info}
              subject={formCopy.subject}
              submitLabel={form.submit}
              consent={form.consent}
              privacyLabel={form.privacy}
              privacyHref={href(lang, "privacy")}
              requiredLabel={form.required}
              sentText={form.sent}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-wrap">
        {[
          { route: "manufacturers" as const, bg: "bg-navy", copy: portals.manufacturers },
          { route: "buyers" as const, bg: "bg-slate", copy: portals.buyers },
        ].map((p) => (
          <Link key={p.route} href={href(lang, p.route)} className={`${portalCard} ${p.bg}`}>
            <div className={`${eyebrow} text-gold`}>{portals.eyebrow}</div>
            <div className="mt-2 mb-1.5 font-serif text-[38px]">{p.copy.title}</div>
            <div className="text-lg text-sand">{p.copy.text}</div>
          </Link>
        ))}
      </section>

      <section className={`${container} flex flex-wrap items-center gap-x-18 gap-y-10 py-24`}>
        <div className="reveal flex flex-[1_1_min(440px,100%)] flex-col gap-5.5">
          <h2 className={h2}>{location.title}</h2>
          <p className="m-0 text-lg text-sand">{location.text}</p>
          <div className="flex flex-wrap gap-x-12 gap-y-5">
            <div>
              <div className={`${eyebrow} text-gold`}>{location.hubLabel}</div>
              <div className="font-serif text-[26px]">{location.hubValue}</div>
            </div>
            <div>
              <div className={`${eyebrow} text-gold`}>{location.italyLabel}</div>
              <div className="font-serif text-[26px]">{location.italyValue}</div>
            </div>
          </div>
        </div>
        <Image
          src={images.corridorMap}
          alt={location.mapAlt}
          width={1600}
          height={900}
          className="reveal h-[400px] max-w-full flex-[1.2_1_min(520px,100%)] object-cover"
        />
      </section>
    </>
  );
}
