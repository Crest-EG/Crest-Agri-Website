import type { MetadataRoute } from "next";
import { explicitlyAllowedCrawlerAgents } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...explicitlyAllowedCrawlerAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: "https://crestagricultural.com/sitemap.xml",
  };
}
