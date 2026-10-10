import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { home } = await getDictionary(lang);

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        {home.eyebrow}
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {home.title}
      </h1>
      <p className="max-w-2xl text-lg text-muted">{home.subtitle}</p>
    </section>
  );
}
