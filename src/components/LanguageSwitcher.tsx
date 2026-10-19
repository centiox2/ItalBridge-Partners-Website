"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { locales, type Locale } from "@/i18n";

// "EN / IT" in the top bar; the current language is bold white.
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
    <span role="group" aria-label={label} className="inline-flex gap-1">
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden>/</span>}
          <Link
            href={`/${l}${rest ? `/${rest}` : ""}`}
            hrefLang={l}
            aria-current={l === current ? "true" : undefined}
            className={`uppercase ${l === current ? "font-semibold text-white" : "hover:text-white"}`}
          >
            {l}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}
