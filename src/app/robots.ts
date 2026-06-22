const BASE_DOMAIN =
  process.env.BASE_DOMAIN || "https://orangechildrenhospital.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: `${BASE_DOMAIN}/sitemap.xml`,
  };
}
