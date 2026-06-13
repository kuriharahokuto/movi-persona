import { useState } from "react";

import { ja } from "../../i18n/ja.ts";
import type { ResultViewModel } from "../../types/diagnosis.ts";

interface ShareImageCardProps {
  result: ResultViewModel;
  imageSrc: string;
}

type GenerateStatus = "idle" | "generating" | "saved" | "failed";

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image failed to load."));
    image.src = src;
  });

const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] => {
  const lines: string[] = [];
  let currentLine = "";

  for (const character of text) {
    const nextLine = currentLine + character;
    if (context.measureText(nextLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = character;
    } else {
      currentLine = nextLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const drawTextLines = (
  context: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
): number => {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
};

const drawContainedImage = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  const drawWidth = imageRatio > targetRatio ? width : height * imageRatio;
  const drawHeight = imageRatio > targetRatio ? width / imageRatio : height;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  context.fillStyle = "#050505";
  context.fillRect(x, y, width, height);
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
};

export const createShareCardFileName = (result: ResultViewModel): string =>
  `${result.archetype.name.replaceAll(" ", "_").toUpperCase()}_share_card.png`;

export const generateShareCardBlob = async (
  result: ResultViewModel,
  imageSrc: string,
): Promise<Blob> => {
  const poster = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1600;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not available.");
  }

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#0B1020");
  gradient.addColorStop(0.55, "#0A0A0A");
  gradient.addColorStop(1, "#000000");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(212, 175, 55, 0.16)";
  context.fillRect(70, 70, 1060, 1460);
  context.fillStyle = "#080808";
  context.fillRect(84, 84, 1032, 1432);

  context.save();
  context.beginPath();
  context.roundRect(120, 130, 430, 645, 18);
  context.clip();
  drawContainedImage(context, poster, 120, 130, 430, 645);
  context.restore();

  context.strokeStyle = "rgba(212, 175, 55, 0.72)";
  context.lineWidth = 4;
  context.strokeRect(120, 130, 430, 645);

  context.fillStyle = "#D4AF37";
  context.font = "700 28px sans-serif";
  context.fillText("MOVI Persona", 610, 160);

  context.fillStyle = "#B8B8B8";
  context.font = "700 22px sans-serif";
  context.fillText("Your Life, Your Movie", 610, 195);

  context.fillStyle = "#B8B8B8";
  context.font = "700 26px sans-serif";
  context.fillText("あなた主演の映画", 610, 250);

  context.fillStyle = "#F5F5F5";
  context.font = "900 68px sans-serif";
  drawTextLines(context, wrapText(context, result.movieProfile.movieTitle, 430), 610, 335, 78);

  context.fillStyle = "#D4AF37";
  context.font = "700 30px sans-serif";
  drawTextLines(context, wrapText(context, result.movieProfile.movieCatchCopy, 430), 610, 520, 42);

  context.fillStyle = "#B8B8B8";
  context.font = "700 24px sans-serif";
  context.fillText("主人公タイプ", 610, 650);

  context.fillStyle = "#F5F5F5";
  context.font = "900 44px sans-serif";
  drawTextLines(context, wrapText(context, result.archetype.japaneseName, 430), 610, 710, 54);

  context.fillStyle = "#B8B8B8";
  context.font = "700 26px sans-serif";
  drawTextLines(context, wrapText(context, result.archetype.name, 430), 610, 775, 34);

  context.fillStyle = "#D4AF37";
  context.font = "700 28px sans-serif";
  drawTextLines(context, wrapText(context, result.heroComparison.title, 960), 120, 835, 38);
  drawTextLines(context, wrapText(context, result.heroComparison.primaryAxis, 960), 120, 885, 38);

  context.fillStyle = "#F5F5F5";
  context.font = "700 28px sans-serif";
  context.fillText("物語の手がかり", 120, 970);

  result.cinematicScores.slice(0, 3).forEach((score, index) => {
    const x = 120 + index * 340;
    context.fillStyle = "rgba(255, 255, 255, 0.06)";
    context.fillRect(x, 1015, 300, 112);
    context.fillStyle = "#B8B8B8";
    context.font = "700 24px sans-serif";
    context.fillText(score.label, x + 24, 1060);
    context.fillStyle = "#D4AF37";
    context.font = "900 42px sans-serif";
    context.fillText(String(score.value), x + 24, 1110);
  });

  context.fillStyle = "#F5F5F5";
  context.font = "700 34px sans-serif";
  context.fillText("あなたはどんな映画の主人公？", 120, 1260);

  context.fillStyle = "#B8B8B8";
  context.font = "500 30px sans-serif";
  drawTextLines(context, wrapText(context, result.trailerReport.trailerCopy, 960), 120, 1325, 44);

  context.fillStyle = "#D4AF37";
  context.font = "700 30px sans-serif";
  context.fillText("#MOVIPersona", 120, 1480);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Canvas failed to create a PNG blob."));
      }
    }, "image/png");
  });
};

export const downloadShareCardBlob = (blob: Blob, fileName: string): void => {
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(blob);
  link.download = fileName;
  link.href = objectUrl;
  link.click();
  URL.revokeObjectURL(objectUrl);
};

export function ShareImageCard({ result, imageSrc }: ShareImageCardProps) {
  const [status, setStatus] = useState<GenerateStatus>("idle");

  const handleDownload = async () => {
    setStatus("generating");

    try {
      const blob = await generateShareCardBlob(result, imageSrc);
      downloadShareCardBlob(blob, createShareCardFileName(result));
      setStatus("saved");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-md border border-cinema-gold/25 bg-black/40 p-4 sm:grid-cols-[120px_1fr]">
        <img
          src={imageSrc}
          alt={`${result.archetype.japaneseName}の上映ポスター`}
          className="aspect-[4/5] w-full max-w-[180px] rounded-md bg-black object-contain"
        />
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cinema-gold">
            あなた主演の映画
          </p>
          <p className="text-2xl font-black text-neutral-50">{result.movieProfile.movieTitle}</p>
          <p className="text-sm font-bold leading-6 text-cinema-gold">{result.movieProfile.movieCatchCopy}</p>
          <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cinema-silver">
              主人公タイプ
            </p>
            <p className="mt-1 text-lg font-black text-neutral-50">{result.archetype.japaneseName}</p>
            <p className="text-xs text-cinema-silver">{result.archetype.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.cinematicScores.slice(0, 3).map((score) => (
              <span
                key={score.label}
                className="rounded-full border border-cinema-gold/30 px-3 py-1 text-xs text-cinema-gold"
              >
                {score.label} {score.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        className="min-h-12 rounded-md bg-cinema-gold px-5 py-3 text-sm font-bold tracking-[0.08em] text-neutral-950 transition hover:bg-[#e5c65c]"
      >
        {status === "generating" ? ja.share.generating : ja.share.savePng}
      </button>

      {status === "saved" && (
        <p className="text-sm text-cinema-silver" role="status">
          {ja.share.pngSaved}
        </p>
      )}
      {status === "failed" && (
        <p className="text-sm text-cinema-silver" role="alert">
          {ja.share.pngFailed}
        </p>
      )}
    </div>
  );
}
