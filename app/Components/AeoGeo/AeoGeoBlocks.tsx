export type AnswerBlock = {
  type: "aeo" | "geo";
  question: string;
  answer: string | string[];
};

type Props = {
  blocks: AnswerBlock[];
  schema?: object | object[];
};

// AEO/GEO answer blocks + JSON-LD for answer engines and generative search.
export default function AeoGeoBlocks({ blocks, schema }: Props) {
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <div className="w-full bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {blocks.map((b, i) => (
            <section
              key={b.question}
              className={`${b.type}-answer-block ${
                i === blocks.length - 1 && blocks.length % 2 === 1 ? "md:col-span-2" : ""
              } rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6`}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-[#10446C] dark:text-white mb-3">
                {b.question}
              </h2>
              {(Array.isArray(b.answer) ? b.answer : [b.answer]).map((p) => (
                <p
                  key={p}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
