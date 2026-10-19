"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonInk, container, sizeMd } from "./ui";

// Below the "nav" breakpoint the main links fold into this menu: a button in
// the header row that opens a panel under the header. On phones the panel also
// carries the consultation button, which no longer fits in the row.
export default function MobileMenu({
  label,
  openLabel,
  closeLabel,
  links,
  cta,
}: {
  label: string;
  openLabel: string;
  closeLabel: string;
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
}) {
  const pathname = usePathname();
  // The page the menu was opened on: it closes by itself once the page changes.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenOn(open ? null : pathname)}
        className="btn inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-line bg-transparent px-3.5 text-sm font-medium text-ink hover:bg-chip nav:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
        {open ? closeLabel : openLabel}
      </button>
      {open && (
        <div id="mobile-menu" className="fade absolute inset-x-0 top-full z-40 border-b border-line bg-page shadow-[0_24px_40px_-28px_rgb(0_0_0/0.45)] nav:hidden">
          <nav aria-label={label} className={`${container} flex flex-col py-3`}>
            {links.map((link) => {
              const current = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={close}
                  className={`flex items-center justify-between border-b border-line py-3.5 text-[17px] font-medium last:border-b-0 ${
                    current ? "text-ink" : "text-body hover:text-ink"
                  }`}
                >
                  {link.label}
                  {current && <span aria-hidden className="size-2 rounded-full bg-ink" />}
                </Link>
              );
            })}
            <Link href={cta.href} onClick={close} className={`${buttonInk} ${sizeMd} mt-3 mb-2 sm:hidden`}>
              {cta.label}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
