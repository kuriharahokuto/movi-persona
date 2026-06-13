import { useEffect, useState } from "react";

import moviThinkingImage from "../../data/Movi_thinking.png";

const thinkingMessages = [
  "直感で選んでみよう！",
  "正解はないよ！",
  "一番ワクワクする選択は？",
  "主人公ならどうするかな？",
  "迷ったら心で選ぼう！",
  "考えすぎなくて大丈夫！",
  "君らしい答えを選んでね！",
];

export function QuestionMovi() {
  const [message, setMessage] = useState(thinkingMessages[0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessage((previousMessage) => {
        const candidates = thinkingMessages.filter((candidate) => candidate !== previousMessage);
        const nextIndex = Math.floor(Math.random() * candidates.length);

        return candidates[nextIndex] ?? thinkingMessages[0];
      });
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none ml-auto flex w-[128px] flex-col items-center gap-1.5 pr-2 sm:w-[148px] sm:pr-4"
      aria-hidden="true"
    >
      <div
        className="question-movi-bubble relative flex h-10 items-center justify-center rounded-md px-2 text-center text-[10px] font-bold leading-4 sm:h-12 sm:text-xs sm:leading-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,16,16,0.96), rgba(4,4,4,0.94))",
          border: "1px solid rgba(212, 175, 55, 0.45)",
          boxShadow:
            "0 14px 34px rgba(0, 0, 0, 0.42), 0 0 18px rgba(212, 175, 55, 0.10)",
          color: "#f5f5f5",
        }}
      >
        {message}
      </div>
      <span className="question-movi-tail" aria-hidden="true" />
      <img
        src={moviThinkingImage}
        width="160"
        height="160"
        alt=""
        className="movi-float h-auto w-[86px] object-contain opacity-90 drop-shadow-[0_0_20px_rgba(212,175,55,0.16)] sm:w-[104px]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
