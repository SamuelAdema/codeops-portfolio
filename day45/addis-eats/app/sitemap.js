import { getDishes } from "@/lib/data";

export default async function sitemap() {
  const baseUrl = process.env.SITE_URL || "https://example.com";
  const dishes = await getDishes();

  const dishUrls = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
    },
    ...dishUrls,
  ];
}