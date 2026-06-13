interface SimilarProtagonistListProps {
  tendencies: string[];
}

export function SimilarProtagonistList({ tendencies }: SimilarProtagonistListProps) {
  return (
    <ul className="grid gap-2">
      {tendencies.map((tendency) => (
        <li key={tendency} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-3">
          {tendency}
        </li>
      ))}
    </ul>
  );
}
