import { fetchPagesSitemap } from "@/lib/api";
import { NextResponse } from "next/server";

const BASE_DOMAIN = process.env.BASE_DOMAIN;

export async function GET() {
  const { pages } = await fetchPagesSitemap();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${page.slug ? `${BASE_DOMAIN}/${page.slug}` : BASE_DOMAIN}</loc>
    <lastmod>${page.updatedAt}</lastmod>
    <changefreq>${page.changefreq || "daily"}</changefreq>
    <priority>${page.priority || "0.7"}</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
