import { useState } from "react";

import { ja } from "../../i18n/ja.ts";

interface ShareButtonProps {
  text: string;
}

type CopyStatus = "idle" | "copied" | "failed" | "unsupported";

export function ShareButton({ text }: ShareButtonProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      setCopyStatus("unsupported");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-cinema-gold px-5 py-3 text-sm font-bold tracking-[0.08em] text-neutral-950 transition hover:bg-[#e5c65c]"
      >
        {copyStatus === "copied" ? ja.share.copied : ja.share.copy}
      </button>

      {copyStatus === "copied" && (
        <p className="text-sm text-cinema-silver" role="status">
          {ja.share.copiedMessage}
        </p>
      )}

      {copyStatus === "failed" && (
        <p className="text-sm text-cinema-silver" role="alert">
          {ja.share.failedMessage}
        </p>
      )}

      {copyStatus === "unsupported" && (
        <p className="text-sm text-cinema-silver" role="alert">
          {ja.share.unsupportedMessage}
        </p>
      )}

      <textarea
        readOnly
        value={text}
        aria-label={ja.share.textAreaLabel}
        className="min-h-36 rounded-md border border-white/10 bg-black/40 p-3 text-sm leading-6 text-neutral-100 outline-none focus:border-cinema-gold/70"
        onFocus={(event) => event.currentTarget.select()}
      />
    </div>
  );
}
