import { fetchSuccessStoriesSitemap } from "@/lib/api";
import { NextResponse } from "next/server";

const BASE_DOMAIN = process.env.BASE_DOMAIN;

export async function GET() {
  const { successStories } = await fetchSuccessStoriesSitemap();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${successStories
    .map(
      (story) => `
  <url>
    <loc>${BASE_DOMAIN}/success-stories/${story.slug}</loc>
    <lastmod>${story.updatedAt}</lastmod>
    <changefreq>${story.changefreq || "daily"}</changefreq>
    <priority>${story.priority || "0.7"}</priority>
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
