interface StartButtonProps {
  children: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function StartButton({ children, onClick, variant = "primary" }: StartButtonProps) {
  const className =
    variant === "primary"
      ? "bg-cinema-gold text-neutral-950 shadow-gold hover:bg-[#e5c65c]"
      : "border border-cinema-gold/40 bg-transparent text-cinema-gold hover:border-cinema-gold";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-12 rounded-md px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] transition ${className}`}
    >
      {children}
    </button>
  );
}
