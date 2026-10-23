import type { MetadataRoute } from "next";
import { SITE_URL, getAllPosts } from "./blogs/data/posts";

const staticRoutes = [
  "",
  "/fibre-packages",
  "/business-broadband",
  "/digital-lines",
  "/bundles",
  "/check-my-postcode",
  "/refer-a-friend",
  "/why-zoiko",
  "/get-help",
  "/setup-installation",
  "/payments-billing",
  "/report-a-fault",
  "/contact-us",
  "/about-us",
  "/our-sustainability",
  "/careers",
  "/zoiko-group",
  "/partnership",
  "/terms-conditions",
  "/privacy-notice",
  "/cookies-policy",
  "/ofcom-speed-commitment",
  "/accessibility-statement",
  "/blogs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/blogs" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const blogs: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...blogs];
}
