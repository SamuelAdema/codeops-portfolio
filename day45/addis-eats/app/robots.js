export default function robots() {
  const baseUrl = process.env.SITE_URL || "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu"],
      disallow: ["/checkout/", "/orders/", "/kitchen/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}