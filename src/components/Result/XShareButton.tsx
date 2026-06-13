import { useState } from "react";

import { ja } from "../../i18n/ja.ts";
import type { ResultViewModel } from "../../types/diagnosis.ts";
import {
  createShareCardFileName,
  downloadShareCardBlob,
  generateShareCardBlob,
} from "./ShareImageCard.tsx";

interface XShareButtonProps {
  result: ResultViewModel;
  imageSrc: string;
}

type ShareStatus =
  | "idle"
  | "preparing"
  | "shared"
  | "ready"
  | "imageFailed"
  | "copyFailed"
  | "intentFailed";

const copyText = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const openXIntent = (text: string): boolean => {
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  const openedWindow = window.open(intentUrl, "_blank", "noopener,noreferrer");

  return openedWindow !== null;
};

export function XShareButton({ result, imageSrc }: XShareButtonProps) {
  const [status, setStatus] = useState<ShareStatus>("idle");
  const [showManualText, setShowManualText] = useState(false);

  const handleShare = async () => {
    setStatus("preparing");
    setShowManualText(false);

    let pngBlob: Blob;
    try {
      pngBlob = await generateShareCardBlob(result, imageSrc);
    } catch {
      setStatus("imageFailed");
      return;
    }

    const fileName = createShareCardFileName(result);
    const pngFile = new File([pngBlob], fileName, { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [pngFile] })) {
      try {
        await navigator.share({
          title: ja.share.webShareTitle,
          text: result.xShareText,
          files: [pngFile],
        });
        setStatus("shared");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          setStatus("idle");
          return;
        }
      }
    }

    downloadShareCardBlob(pngBlob, fileName);
    const copied = await copyText(result.xShareText);
    const opened = openXIntent(result.xShareText);

    if (!copied) {
      setShowManualText(true);
      setStatus("copyFailed");
      return;
    }

    if (!opened) {
      setShowManualText(true);
      setStatus("intentFailed");
      return;
    }

    setStatus("ready");
  };

  return (
    <div className="grid gap-3 rounded-md border border-cinema-gold/25 bg-cinema-gold/10 p-4">
      <button
        type="button"
        onClick={handleShare}
        disabled={status === "preparing"}
        className="min-h-12 rounded-md bg-cinema-gold px-5 py-3 text-sm font-bold tracking-[0.08em] text-neutral-950 transition hover:bg-[#e5c65c] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "preparing" ? ja.share.preparingX : ja.share.prepareX}
      </button>

      <p className="text-sm leading-7 text-cinema-silver">{ja.share.xShareGuide}</p>

      {status === "shared" && (
        <p className="text-sm leading-7 text-cinema-silver" role="status">
          {ja.share.webShareComplete}
        </p>
      )}

      {status === "ready" && (
        <p className="text-sm leading-7 text-cinema-silver" role="status">
          {ja.share.xShareReady}
        </p>
      )}

      {status === "imageFailed" && (
        <p className="text-sm leading-7 text-cinema-silver" role="alert">
          {ja.share.pngFailed}
        </p>
      )}

      {status === "copyFailed" && (
        <p className="text-sm leading-7 text-cinema-silver" role="alert">
          {ja.share.copyFailedManual}
        </p>
      )}

      {status === "intentFailed" && (
        <p className="text-sm leading-7 text-cinema-silver" role="alert">
          {ja.share.xIntentFailed}
        </p>
      )}

      {showManualText && (
        <textarea
          readOnly
          value={result.xShareText}
          aria-label={ja.share.textAreaLabel}
          className="min-h-36 rounded-md border border-white/10 bg-black/40 p-3 text-sm leading-6 text-neutral-100 outline-none focus:border-cinema-gold/70"
          onFocus={(event) => event.currentTarget.select()}
        />
      )}
    </div>
  );
}
