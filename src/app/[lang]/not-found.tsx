import { lang } from "next/root-params";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, hasLocale } from "@/i18n";
import { buttonGold, container } from "@/components/ui";

export default async function NotFound() {
  const value = await lang();
  const locale = hasLocale(value) ? value : defaultLocale;
  const { notFound } = await getDictionary(locale);

  return (
    <section className={`${container} flex flex-col items-start gap-6 pt-16 pb-32`}>
      <p className="m-0 font-serif text-[clamp(64px,10vw,140px)] leading-none text-gold">
        404
      </p>
      <h1 className="m-0 font-serif text-[clamp(34px,4.4vw,60px)] leading-[1.05] font-normal">
        {notFound.title}
      </h1>
      <p className="m-0 max-w-[560px] text-lg text-sand">{notFound.text}</p>
      <a href={`/${locale}`} className={buttonGold}>
        {notFound.cta}
      </a>
    </section>
  );
}
