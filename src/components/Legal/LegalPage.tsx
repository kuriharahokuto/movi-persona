import type { LegalPage as LegalPageData } from "../../data/legalPages.ts";

interface LegalPageProps {
  page: LegalPageData;
  onBackHome: () => void;
}

const officialXUrl = "https://x.com/MOVIPersona";

const renderParagraph = (paragraph: string) => {
  if (!paragraph.includes(officialXUrl)) {
    return paragraph;
  }

  const [before, after] = paragraph.split(officialXUrl);

  return (
    <>
      {before}
      <a
        href={officialXUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-cinema-gold underline decoration-cinema-gold/50 underline-offset-4 transition hover:text-[#e5c65c]"
      >
        {officialXUrl}
      </a>
      {after}
    </>
  );
};

export function LegalPage({ page, onBackHome }: LegalPageProps) {
  return (
    <article className="py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cinema-gold">
        MOVI Persona Policy
      </p>
      <h1 className="mt-4 text-4xl font-black text-neutral-50 sm:text-5xl">{page.title}</h1>
      <p className="mt-4 text-base leading-8 text-cinema-silver">{page.lead}</p>

      <div className="mt-8 grid gap-5">
        {page.sections.map((section) => (
          <section key={section.title} className="rounded-md border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-black text-cinema-gold">{section.title}</h2>
            <div className="mt-3 grid gap-3 text-sm leading-7 text-cinema-silver">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{renderParagraph(paragraph)}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <button
        type="button"
        onClick={onBackHome}
        className="mt-8 min-h-12 rounded-md border border-cinema-gold/40 px-5 py-3 text-sm font-bold tracking-[0.08em] text-cinema-gold transition hover:border-cinema-gold"
      >
        トップへ戻る
      </button>
    </article>
  );
}
