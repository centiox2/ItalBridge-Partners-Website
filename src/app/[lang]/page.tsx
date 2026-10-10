import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Exports from "@/components/home/Exports";
import Sectors from "@/components/home/Sectors";
import Network from "@/components/home/Network";
import Why from "@/components/home/Why";
import Portals from "@/components/home/Portals";
import Contact from "@/components/home/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero hero={dict.hero} />
      <Process process={dict.process} />
      <Exports exports={dict.exports} />
      <Sectors sectors={dict.sectors} />
      <Network lang={lang} network={dict.network} />
      <Why why={dict.why} />
      <Portals lang={lang} portals={dict.portals} />
      <Contact contact={dict.contact} />
    </>
  );
}
