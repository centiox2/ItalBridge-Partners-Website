// Public URL of the site, used for canonical and hreflang links.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://italbridgepartners.co.ke";

export const contact = {
  emails: ["info@italbridgepartners.co.ke", "sales@italbridgepartners.co.ke"],
  phones: [
    { display: "0729 324 033", tel: "+254729324033" },
    { display: "0788 888 802", tel: "+254788888802" },
  ],
};

export const sections = {
  services: "process",
  industries: "sectors",
  manufacturers: "network",
  buyers: "portals",
  contact: "contact",
} as const;
