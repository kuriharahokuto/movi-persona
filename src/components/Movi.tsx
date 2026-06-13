import { useEffect, useState } from "react";

import moviImage from "../data/Movi.png";

const moviMessages = [
  "君はどんな主人公かな？",
  "診断は3分で終わるよ！",
  "映画ポスターも作れるよ！",
  "16人の主人公が待ってるよ！",
];

interface MoviProps {
  className?: string;
  message?: string;
  compact?: boolean;
}

export function Movi({
  className = "",
  message = "診断すると、君だけの映画ポスターも作れるよ！",
  compact = false,
}: MoviProps) {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);
  }, [message]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentMessage((previousMessage) => {
        const nextCandidates = moviMessages.filter((candidate) => candidate !== previousMessage);
        const nextIndex = Math.floor(Math.random() * nextCandidates.length);

        return nextCandidates[nextIndex] ?? moviMessages[0];
      });
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex items-center justify-end gap-2 ${compact ? "flex-col" : "flex-col"} ${className}`}
      aria-label="映画案内ロボット Movi"
    >
      <div
        className={`movi-bubble relative z-10 flex items-center justify-center rounded-md text-center text-xs font-bold leading-5 tracking-[0.02em] ${
          compact ? "h-14 max-w-[150px] px-2.5" : "h-16 max-w-[230px] px-4 sm:text-sm"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(16,16,16,0.96), rgba(4,4,4,0.94))",
          border: "1px solid rgba(212, 175, 55, 0.45)",
          boxShadow:
            "0 18px 44px rgba(0, 0, 0, 0.48), 0 0 24px rgba(212, 175, 55, 0.12)",
          color: "#f5f5f5",
        }}
      >
        <span className="text-cinema-gold">Movi</span>
        <span className="mx-1 text-cinema-silver">:</span>
        {currentMessage}
      </div>
      <img
        src={moviImage}
        width="360"
        height="360"
        alt="映画案内ロボット Movi"
        className={`movi-float h-auto object-contain drop-shadow-[0_0_24px_rgba(212,175,55,0.22)] transition duration-300 hover:-translate-y-1.5 ${
          compact
            ? "w-[92px] min-w-[92px]"
            : "w-[34vw] max-w-[140px] min-w-[96px] sm:max-w-[190px] lg:max-w-[220px]"
        }`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
