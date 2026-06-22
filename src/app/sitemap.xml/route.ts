import { NextResponse } from "next/server";

const BASE_DOMAIN = process.env.BASE_DOMAIN || "http://localhost:3000";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const sitemaps = [
    `${BASE_DOMAIN}/pages/sitemap.xml`,
    `${BASE_DOMAIN}/success-stories/sitemap.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (url) => `
  <sitemap>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`,
    )
    .join("")}
</sitemapindex>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
