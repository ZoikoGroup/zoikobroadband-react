import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, formatDate, getAllPosts } from "./data/posts";

export const metadata: Metadata = {
  title: "Blogs | Broadband Guides, Tips & UK News | Zoiko Broadband",
  description:
    "Read the Zoiko Broadband blog for UK broadband news, switching guides, deal comparisons and tips to get faster, more reliable internet at home and work.",
  alternates: { canonical: `${SITE_URL}/blogs` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blogs`,
    siteName: "Zoiko Broadband",
    title: "Zoiko Broadband Blogs",
    description:
      "UK broadband news, switching guides, deal comparisons and connectivity tips.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoiko Broadband Blogs",
    description:
      "UK broadband news, switching guides, deal comparisons and connectivity tips.",
  },
};

export default function BlogsPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zoiko Broadband Blogs",
    url: `${SITE_URL}/blogs`,
    publisher: { "@type": "Organization", name: "Zoiko Broadband", url: SITE_URL },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blogs/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      description: p.metaDescription,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="w-full bg-[#10446C] dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">
          <p className="text-[#f5c241] font-semibold tracking-wide uppercase text-sm mb-3">
            Zoiko Broadband Blog
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Broadband Guides, Tips &amp; UK News
          </h1>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Practical advice to help you choose, switch and get the most from
            your broadband at home and at work.
          </p>
        </div>
      </section>

      {/* Blog list */}
      <section className="w-full bg-[#f4f8fb] dark:bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No blogs yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="flex flex-1 flex-col"
                    aria-label={post.title}
                  >
                    <div className="relative h-44 bg-gradient-to-br from-[#10446C] to-[#1c6aa3] p-6 flex items-end">
                      <span className="absolute top-5 left-6 rounded-full bg-[#f5c241] px-3 py-1 text-xs font-bold text-[#10446C]">
                        {post.category}
                      </span>
                      <h2 className="text-white text-xl font-bold leading-snug line-clamp-3">
                        {post.title}
                      </h2>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <span aria-hidden="true">•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 flex-1">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#10446C] dark:text-[#f5c241] group-hover:gap-3 transition-all">
                        Read more <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
