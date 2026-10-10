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
    <nav
      aria-label={label}
      className="flex flex-wrap items-center gap-x-6.5 gap-y-2 text-[15px] font-medium"
    >
      {links.map((link) => {
        const current = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={
              current
                ? "text-gold underline decoration-2 underline-offset-8"
                : "hover:text-gold"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
