/** @format */

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    {
      url: "https://kp.ledy-teurupun.my.id",
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 1,
    },
    // {
    //   url: "https://kp.ledy-teurupun.my.id/Kegiatan",
    //   lastModified: currentDate,
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
    // {
    //   url: "https://kp.ledy-teurupun.my.id/berita",
    //   lastModified: currentDate,
    //   changeFrequency: "weekly",
    //   priority: 0.5,
    // },
    // {
    //   url: "https://kp.ledy-teurupun.my.id/kontakKami",
    //   lastModified: currentDate,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
    // {
    //   url: "https://kp.ledy-teurupun.my.id/fasilitas",
    //   lastModified: currentDate,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
  ];
}
