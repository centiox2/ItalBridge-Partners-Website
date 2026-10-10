import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gloock, Instrument_Sans } from "next/font/google";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, hasLocale, locales } from "@/i18n";
import { siteUrl } from "@/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";
import { images } from "@/images";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s | ${dict.meta.title}` },
    description: dict.meta.description,
    icons: { icon: images.logo.src },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      // Lets Next skip smooth scrolling on route changes (e.g. switching language).
      data-scroll-behavior="smooth"
      className={`${gloock.variable} ${instrumentSans.variable}`}
    >
      <body id="top" className="font-sans antialiased">
        <Header lang={lang} dict={dict} />
        <main>{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
