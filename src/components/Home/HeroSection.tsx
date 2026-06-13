import { archetypes } from "../../data/archetypes.ts";
import { ja } from "../../i18n/ja.ts";
import type { ArchetypeName } from "../../types/diagnosis.ts";
import { Movi } from "../Movi.tsx";
import { StartButton } from "./StartButton.tsx";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  const featuredArchetypeNames: ArchetypeName[] = [
    "Dream Explorer",
    "Rogue",
    "Advocate",
    "Strategist",
  ];
  const featuredNameSet = new Set<ArchetypeName>(featuredArchetypeNames);
  const featuredArchetypes = featuredArchetypeNames.map((name) => archetypes[name]);
  const hiddenArchetypes = Object.values(archetypes).filter(
    (archetype) => !featuredNameSet.has(archetype.name),
  );
  const scrollToGallery = () => {
    document.getElementById("protagonist-gallery")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-8 py-8">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cinema-gold sm:tracking-[0.34em]">
          {ja.home.eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-neutral-50 sm:text-7xl">
          {ja.home.title}
        </h1>
        <p className="max-w-none text-2xl font-black leading-tight text-neutral-50 sm:whitespace-nowrap sm:text-4xl xl:text-5xl">
          {ja.home.lead}
        </p>
        <p className="max-w-2xl text-base font-semibold leading-7 text-cinema-silver sm:text-xl">
          {ja.home.subLead}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <StartButton onClick={onStart}>{ja.home.start}</StartButton>
          <StartButton onClick={scrollToGallery} variant="secondary">
            {ja.home.intro}
          </StartButton>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ja.home.trustItems.map((item) => (
          <div key={item.title} className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-sm font-bold text-neutral-50">{item.title}</p>
            <p className="mt-1 text-xs leading-5 text-cinema-silver">{item.description}</p>
          </div>
        ))}
      </div>

      <section className="space-y-5 rounded-md border border-cinema-gold/20 bg-black/30 p-5 shadow-gold sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px] lg:items-start">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cinema-gold">
              Result Preview
            </p>
            <h2 className="text-2xl font-black text-neutral-50">{ja.home.benefitsTitle}</h2>
            <Movi
              compact
              className="float-right ml-3 mt-1 max-w-[150px] lg:hidden"
              message="映画ポスターも作れるよ！"
            />
            <div className="space-y-1 text-base font-semibold leading-8 text-neutral-100 sm:text-lg">
              {ja.home.benefitsLead.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="max-w-2xl text-sm leading-7 text-cinema-silver">
              {ja.home.benefitsClosing}
            </p>
          </div>
          <Movi
            className="mx-auto hidden w-full max-w-[170px] sm:max-w-[190px] lg:flex lg:max-w-[220px] lg:justify-self-end"
            message="診断すると、君だけの映画ポスターも作れるよ！"
          />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinema-gold">
            {ja.home.benefitsSummaryTitle}
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {ja.home.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-3"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-cinema-gold">
                {benefit.marker}
              </p>
              <h3 className="mt-2 text-sm font-bold text-neutral-50">{benefit.title}</h3>
              <p className="mt-1 text-xs leading-5 text-cinema-silver">{benefit.description}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section id="protagonist-gallery" className="scroll-mt-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-neutral-50">{ja.home.galleryTitle}</h2>
          <p className="max-w-2xl text-sm leading-7 text-cinema-silver">{ja.home.galleryLead}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredArchetypes.map((archetype) => (
            <article
              key={archetype.name}
              className="overflow-hidden rounded-md border border-white/10 bg-cinema-surface/80 shadow-poster"
            >
              <img
                src={archetype.imagePath}
                alt={`${archetype.japaneseName}の主人公ポスター`}
                className="aspect-[4/5] w-full bg-black object-contain"
              />
              <div className="space-y-2 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cinema-gold">
                  {archetype.name}
                </p>
                <p className="text-sm font-bold text-neutral-50">{archetype.japaneseName}</p>
                <p className="text-xs leading-5 text-cinema-silver">{archetype.tagline}</p>
                <p className="rounded-full border border-cinema-gold/25 bg-cinema-gold/10 px-2 py-1 text-[11px] font-semibold leading-5 text-cinema-gold">
                  {ja.archetypeTitles[archetype.name]}
                </p>
                <p className="text-xs font-bold leading-5 text-neutral-100">
                  {ja.archetypeComparisonAxes[archetype.name]}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="space-y-4 rounded-md border border-white/10 bg-cinema-surface/70 p-4 shadow-poster">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {hiddenArchetypes.map((archetype) => (
              <div
                key={archetype.name}
                className="relative overflow-hidden rounded-md border border-white/10 bg-black/40"
                aria-hidden="true"
              >
                <img
                  src={archetype.imagePath}
                  alt=""
                  className="aspect-[4/5] w-full object-cover blur-sm saturate-50"
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>
            ))}
          </div>
          <div className="space-y-3 text-center">
            <p className="text-lg font-black text-neutral-50">{ja.home.galleryHiddenTitle}</p>
            <div className="flex justify-center pt-1">
              <StartButton onClick={onStart}>{ja.home.galleryCtaButton}</StartButton>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-cinema-gold/25 bg-black/35 p-5 shadow-gold sm:p-6">
        <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr] sm:items-start">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cinema-gold">
              Evidence
            </p>
            <h2 className="text-2xl font-black text-neutral-50">{ja.home.evidenceTitle}</h2>
            <p className="text-sm leading-7 text-cinema-silver">{ja.home.evidenceLead}</p>
          </div>
          <div className="space-y-4">
            <ul className="grid gap-2 sm:grid-cols-2" aria-label="参考にしている理論">
              {ja.home.evidenceItems.map((item) => (
                <li
                  key={item.title}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-3"
                >
                  <p className="text-sm font-bold text-neutral-100">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-cinema-silver">{item.description}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-7 text-cinema-silver">{ja.home.evidenceBody}</p>
            <p className="border-l-2 border-cinema-gold/70 pl-3 text-xs leading-6 text-neutral-400">
              {ja.home.evidenceDisclaimer}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
