/** @format */

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/roles/",
    },
    sitemap: "https://acme.com/sitemap.xml",
  };
}
