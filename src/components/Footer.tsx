import type { Dictionary } from "@/dictionaries";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer({ dict }: { dict: Dictionary }) {
  const year = await currentYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
        © {year} ItalBridge Partners. {dict.footer.rights}
      </div>
    </footer>
  );
}
