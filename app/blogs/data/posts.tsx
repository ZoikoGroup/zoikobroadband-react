import Link from "next/link";
import type { ReactNode } from "react";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://zoikobroadband.com"
).replace(/\/$/, "");

export type BlogSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  keywords: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  intro: ReactNode;
  sections: BlogSection[];
  faqs: BlogFaq[];
};

/* ---------- Shared content building blocks (website theme) ---------- */

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-5">
    {children}
  </p>
);

const UL = ({ items }: { items: ReactNode[] }) => (
  <ul className="mb-6 space-y-2">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex gap-3 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed"
      >
        <span
          className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#f5c241]"
          aria-hidden="true"
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Table = ({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: ReactNode[][];
  caption?: string;
}) => (
  <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
    <table className="w-full text-left text-sm md:text-base">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead className="bg-[#10446C] text-white">
        <tr>
          {head.map((h) => (
            <th key={h} scope="col" className="px-4 py-3 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-t border-gray-200 dark:border-gray-800 odd:bg-white even:bg-[#f4f8fb] dark:odd:bg-gray-900 dark:even:bg-gray-950"
          >
            {row.map((cell, j) => (
              <td
                key={j}
                className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => {
  const cls =
    "font-semibold text-[#10446C] dark:text-[#f5c241] underline underline-offset-4 hover:text-[#f5c241] dark:hover:text-white transition-colors";
  return href.startsWith("http") ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
};

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg md:text-xl font-bold text-[#10446C] dark:text-white mt-6 mb-2">
    {children}
  </h3>
);

const Callout = ({ children }: { children: ReactNode }) => (
  <div className="mb-6 rounded-xl border-l-4 border-[#f5c241] bg-[#f4f8fb] dark:bg-gray-900 px-5 py-4 text-gray-800 dark:text-gray-200 text-base md:text-lg leading-relaxed">
    {children}
  </div>
);

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-gray-900 dark:text-white">
    {children}
  </strong>
);

/* ------------------------------ Posts ------------------------------ */

export const posts: BlogPost[] = [];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
