import { useEffect, useState } from "react";

import moviReportImage from "../../data/Movi_report.png";

const moviReportMessages = [
  "ここから君の性格を詳しく分析するよ！",
  "君の仲間達が見つかったよ！",
  "脚本家、行動分析官からもレポートが届いているよ！",
  "おすすめの映画は…",
  "君の上映ポスターを作成したよ～",
  "ここから君の物語を詳しく見ていくよ！",
  "主人公スコアの次は、君だけの映画予告編だよ！",
  "まだ終わりじゃないよ。物語の続きも見てみよう！",
  "君の強みと弱みを、映画みたいに読み解いていくよ！",
];

const getRandomMessage = (currentMessage?: string): string => {
  if (moviReportMessages.length <= 1) {
    return moviReportMessages[0];
  }

  const candidates = moviReportMessages.filter((message) => message !== currentMessage);
  return candidates[Math.floor(Math.random() * candidates.length)];
};

export function ResultMovi() {
  const [message, setMessage] = useState(() => getRandomMessage());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMessage((currentMessage) => getRandomMessage(currentMessage));
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="mb-9 mt-2 flex flex-col items-center gap-4 sm:mb-10 sm:mt-0 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
      <img
        src={moviReportImage}
        width="180"
        height="180"
        alt="レポートを届けるMovi"
        className="movi-float h-auto w-[96px] object-contain drop-shadow-[0_0_24px_rgba(212,175,55,0.22)] sm:w-[124px] lg:w-[146px]"
        loading="eager"
        decoding="async"
      />
      <div
        className="result-movi-intro-bubble relative flex h-32 w-full max-w-[620px] flex-col justify-center rounded-md px-5 py-4 text-sm font-bold leading-7 text-neutral-100 sm:h-28 sm:px-6 sm:py-5 sm:text-base"
        style={{
          backgroundColor: "#080808",
          border: "1px solid rgba(212,175,55,0.55)",
          boxShadow: "0 18px 46px rgba(0,0,0,0.42)",
        }}
      >
        <p className="text-xs font-black tracking-[0.22em] text-cinema-gold">Movi's REPORT</p>
        <p className="mt-2 flex min-h-14 items-center text-base font-black leading-7 text-neutral-50 sm:min-h-12 sm:text-lg">
          {message}
        </p>
      </div>
    </section>
  );
}
