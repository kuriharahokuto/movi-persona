import type { LegalPageKey } from "../../data/legalPages.ts";

interface FooterProps {
  onNavigate: (page: LegalPageKey) => void;
}

const footerLinks: { label: string; page: LegalPageKey }[] = [
  { label: "利用規約", page: "terms" },
  { label: "プライバシーポリシー", page: "privacy" },
  { label: "免責事項", page: "disclaimer" },
  { label: "お問い合わせ", page: "contact" },
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-white/10 py-8">
      <nav aria-label="フッターリンク" className="flex flex-wrap gap-x-5 gap-y-3">
        {footerLinks.map((link) => (
          <button
            key={link.page}
            type="button"
            onClick={() => onNavigate(link.page)}
            className="text-left text-sm font-bold text-cinema-silver transition hover:text-cinema-gold"
          >
            {link.label}
          </button>
        ))}
      </nav>
      <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-neutral-500">
        © 2026 MOVI Persona. All Rights Reserved.
      </p>
    </footer>
  );
}
