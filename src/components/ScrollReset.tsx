"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

// A page opened from a link starts at the very top, header included. On its
// own, Next scrolls the new page's content to the top edge, which can leave the
// top bar and header above the screen. Back and forward keep the browser's
// restored position, and links to a #section keep their jump.
export default function ScrollReset() {
  const pathname = usePathname();
  const fromLink = useRef(false);

  // Capture phase: runs before the link's own click handler starts the navigation.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const toOtherPage =
        link instanceof HTMLAnchorElement &&
        link.origin === window.location.origin &&
        link.pathname !== window.location.pathname &&
        !link.hash;
      if (toOtherPage) {
        fromLink.current = true;
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Rendered after <main>, so this runs after Next's own scroll handling.
  useLayoutEffect(() => {
    if (!fromLink.current) return;
    fromLink.current = false;
    const toTop = () => window.scrollTo({ top: 0, behavior: "instant" });
    toTop();
    // Next can still scroll the content into view a frame later, when the
    // page was shown before and is coming back from its cache.
    const frame = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
