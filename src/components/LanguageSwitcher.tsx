"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export default function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();
  // Swap the leading locale segment, keeping the rest of the path.
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div role="group" aria-label={label} className="flex gap-1 text-[13px]">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          hrefLang={l}
          aria-current={l === current ? "true" : undefined}
          className={`rounded px-2 py-1 uppercase ${
            l === current ? "bg-gold text-ink" : "hover:text-gold"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
