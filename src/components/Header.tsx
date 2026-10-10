import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={`/${lang}`} className="text-lg font-bold tracking-tight">
          ItalBridge <span className="text-brand">Partners</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={`/${lang}`} className="hover:text-brand">
            {dict.nav.home}
          </Link>
          <LanguageSwitcher current={lang} label={dict.nav.language} />
        </nav>
      </div>
    </header>
  );
}
