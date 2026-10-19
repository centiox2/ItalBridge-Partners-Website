"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Main navigation; marks the link for the current page.
export default function NavLinks({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex flex-wrap gap-x-7 gap-y-1 text-[15px] font-medium">
      {links.map((link) => {
        const current = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={`border-b-2 py-1.5 transition-colors duration-200 ${
              current ? "border-ink" : "border-transparent hover:border-steel"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
