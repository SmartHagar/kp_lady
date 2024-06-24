/** @format */

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    {
      url: "https://smayppktarunadharmajayapura.sch.id",
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 1,
    },
    // {
    //   url: "https://smayppktarunadharmajayapura.sch.id/Kegiatan",
    //   lastModified: currentDate,
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
    // {
    //   url: "https://smayppktarunadharmajayapura.sch.id/berita",
    //   lastModified: currentDate,
    //   changeFrequency: "weekly",
    //   priority: 0.5,
    // },
    // {
    //   url: "https://smayppktarunadharmajayapura.sch.id/kontakKami",
    //   lastModified: currentDate,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
    // {
    //   url: "https://smayppktarunadharmajayapura.sch.id/fasilitas",
    //   lastModified: currentDate,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
  ];
}
