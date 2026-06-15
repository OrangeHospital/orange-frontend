// const BASE_DOMAIN = process.env.BASE_DOMAIN;

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
      {
        userAgent: "Googlebot",
        disallow: "/",
      },
      {
        userAgent: "Bingbot",
        disallow: "/",
      },
    ],
    // sitemap: ${BASE_DOMAIN}/sitemap.xml,
  };
}
