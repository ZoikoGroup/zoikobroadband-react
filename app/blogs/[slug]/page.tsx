import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  formatDate,
  getAllPosts,
  getPostBySlug,
} from "../data/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blogs/${post.slug}`;

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "article",
      url,
      siteName: "Zoiko Broadband",
      title: post.title,
      description: post.metaDescription,
      locale: "en_GB",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: "en-GB",
      articleSection: post.category,
      keywords: post.keywords.join(", "),
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Zoiko Broadband",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/ZBLogo.svg` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="w-full bg-[#10446C] dark:bg-gray-950 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-white">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#f5c241] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blogs" className="hover:text-[#f5c241] transition-colors">
                  Blogs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>

          <span className="inline-block rounded-full bg-[#f5c241] px-3 py-1 text-xs font-bold text-[#10446C] mb-4">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base text-white/85">
            <span>By {post.author}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1fr_300px]">
          <article className="min-w-0 max-w-3xl">
            {post.intro}

            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#10446C] dark:text-[#f5c241] mt-10 mb-4 leading-snug">
                  {section.heading}
                </h2>
                {section.body}
              </section>
            ))}

            {/* FAQs */}
            {post.faqs.length > 0 && (
              <section id="faqs" className="scroll-mt-32">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#10446C] dark:text-[#f5c241] mt-10 mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {post.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f4f8fb] dark:bg-gray-950 px-5 py-4"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                        <span className="text-[#10446C] dark:text-[#f5c241] text-xl transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-[#10446C] dark:bg-gray-950 p-8 text-center text-white">
              <h2 className="text-2xl font-bold">Ready to review your broadband?</h2>
              <p className="mt-3 text-white/90">
                Check what&apos;s available at your address and compare Zoiko
                broadband plans in minutes.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/check-my-postcode"
                  className="rounded-full bg-[#f5c241] px-6 py-3 font-bold text-[#10446C] hover:bg-[#ffd566] transition-colors"
                >
                  Check my postcode
                </Link>
                <Link
                  href="/fibre-packages"
                  className="rounded-full border-2 border-white px-6 py-3 font-bold text-white hover:bg-white hover:text-[#10446C] transition-colors"
                >
                  View broadband plans
                </Link>
              </div>
            </div>
          </article>

          {/* Table of contents */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Table of contents"
              className="sticky top-32 rounded-2xl border border-gray-200 dark:border-gray-800 bg-[#f4f8fb] dark:bg-gray-950 p-6"
            >
              <p className="text-lg font-bold text-[#10446C] dark:text-[#f5c241] mb-4">
                In this article
              </p>
              <ol className="space-y-2 text-sm">
                {post.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-[#10446C] dark:hover:text-[#f5c241] transition-colors"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
                {post.faqs.length > 0 && (
                  <li>
                    <a
                      href="#faqs"
                      className="text-gray-700 dark:text-gray-300 hover:text-[#10446C] dark:hover:text-[#f5c241] transition-colors"
                    >
                      Frequently Asked Questions
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          </aside>
        </div>
      </section>

      {/* Related / back */}
      <section className="w-full bg-[#f4f8fb] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {related.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-[#10446C] dark:text-[#f5c241] mb-6">
                More from our blog
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blogs/${p.slug}`}
                    className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
                  >
                    <p className="text-xs font-bold text-[#10446C] dark:text-[#f5c241] mb-2">
                      {p.category}
                    </p>
                    <h3 className="font-bold text-gray-900 dark:text-white leading-snug">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </>
          )}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 font-semibold text-[#10446C] dark:text-[#f5c241] hover:gap-3 transition-all"
          >
            <span aria-hidden="true">←</span> Back to all blogs
          </Link>
        </div>
      </section>
    </>
  );
}
