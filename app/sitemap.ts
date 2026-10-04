import type { MetadataRoute } from "next";
import { haardenCatalog } from "./DATA/haarden-catalog";
import { wandpanelenCatalog } from "./DATA/wandpanelen-catalog";
import { hexagonCatalog } from "./DATA/hexagon-catalog";
import { suedeCatalog } from "./DATA/suede-catalog";
import { decorCatalog } from "./DATA/decor-catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wallmade.nl";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/cinewalls`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cinewall-kosten`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cinewall-met-haard`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cinewall-ontwerpen`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cinewall-configurator`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-designer`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/elektrische-haarden`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wandpanelen`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const haardenPages: MetadataRoute.Sitemap = haardenCatalog.map(
    (product) => ({
      url: `${baseUrl}/elektrische-haarden/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const wandpanelenPages: MetadataRoute.Sitemap = wandpanelenCatalog.map(
    (product) => ({
      url: `${baseUrl}/wandpanelen/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.75,
    })
  );

  const hexagonPages: MetadataRoute.Sitemap = hexagonCatalog.map(
    (product) => ({
      url: `${baseUrl}/wandpanelen/hexagon/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.75,
    })
  );

  const suedePages: MetadataRoute.Sitemap = suedeCatalog.map(
    (product) => ({
      url: `${baseUrl}/wandpanelen/suede/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.75,
    })
  );

  const decorPages: MetadataRoute.Sitemap = decorCatalog.map(
    (product) => ({
      url: `${baseUrl}/wandpanelen/decor/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.75,
    })
  );

  return [
    ...staticPages,
    ...haardenPages,
    ...wandpanelenPages,
    ...hexagonPages,
    ...suedePages,
    ...decorPages,
  ];
}

