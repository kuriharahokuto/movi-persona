import type { ArchetypeMovieProfile, ArchetypeName, SecondaryTraitCode } from "../types/diagnosis.ts";

const variantBySecondaryTrait: Record<SecondaryTraitCode, string> = {
  RISK: "危険地帯へ",
  JUSTICE: "正義の境界線",
  COLLECTIVISM: "仲間を置き去りにするな",
  SACRIFICE: "誰かのための選択",
};

const endingThemeBySecondaryTrait: Record<SecondaryTraitCode, string> = {
  RISK: "恐れを越えて踏み出すこと",
  JUSTICE: "正しさを守り抜くこと",
  COLLECTIVISM: "仲間と共に進むこと",
  SACRIFICE: "誰かのために選ぶこと",
};

const createMovieProfile = (
  archetypeId: ArchetypeName,
  movieTitle: string,
  movieCatchCopy: string,
  baseTrailerLine: string,
): ArchetypeMovieProfile => ({
  archetypeId,
  movieTitle,
  movieCatchCopy,
  baseTrailerLine,
  variantBySecondaryTrait,
  endingThemeBySecondaryTrait,
});

export const archetypeMovieProfiles: Record<ArchetypeName, ArchetypeMovieProfile> = {
  "Dream Explorer": createMovieProfile(
    "Dream Explorer",
    "境界線の向こうへ",
    "まだ誰も知らない世界へ、最初の一歩を踏み出す者。",
    "閉ざされた地平の先に、あなたはまだ名前のない希望を見つける。",
  ),
  Wanderer: createMovieProfile(
    "Wanderer",
    "風の行き先",
    "誰かの地図ではなく、自分の風を信じて進む者。",
    "決められた道を外れた瞬間、物語はあなた自身の旅になる。",
  ),
  "Visionary Hero": createMovieProfile(
    "Visionary Hero",
    "夜明けを信じる者",
    "終わりかけた世界に、もう一度夜明けを見せる者。",
    "誰もが諦めかけた場所で、あなたは未来の光を指し示す。",
  ),
  Seeker: createMovieProfile(
    "Seeker",
    "真実の地図",
    "隠された真実を追い、物語の奥へ進む者。",
    "小さな違和感を手がかりに、あなたは世界の裏側へ踏み込む。",
  ),
  Revolutionary: createMovieProfile(
    "Revolutionary",
    "最初の火",
    "変わらない世界に、最初の火を灯す者。",
    "沈黙が支配する街で、あなたの一言が時代を動かし始める。",
  ),
  Rogue: createMovieProfile(
    "Rogue",
    "ルールなき夜を越えて",
    "決められたルールを越え、自分だけの出口を探す者。",
    "追い詰められた夜ほど、あなたは誰も知らない抜け道を見つける。",
  ),
  Commander: createMovieProfile(
    "Commander",
    "旗を掲げる者",
    "迷う人々を束ね、旗の下に進路を示す者。",
    "恐れで止まった仲間たちの前で、あなたは進む理由を掲げる。",
  ),
  Adventurer: createMovieProfile(
    "Adventurer",
    "崖の向こう側",
    "危険の向こうにある突破口へ、迷わず走る者。",
    "地図が途切れた場所で、あなたの行動が次の道を作り出す。",
  ),
  Advocate: createMovieProfile(
    "Advocate",
    "声なき願い",
    "声なき願いを、物語の中心へ押し上げる者。",
    "誰かが飲み込んだ本音を、あなたは見過ごさず言葉に変える。",
  ),
  Mediator: createMovieProfile(
    "Mediator",
    "二つの岸をつなぐ橋",
    "対立する心をつなぎ、壊れかけた関係を救う者。",
    "分断された人々の間で、あなたは最後の対話を諦めない。",
  ),
  Guardian: createMovieProfile(
    "Guardian",
    "最後の砦",
    "揺れる世界で、大切なものを最後まで守る者。",
    "崩れゆく場所に残り、あなたは守るべき灯を背に立ち上がる。",
  ),
  Caretaker: createMovieProfile(
    "Caretaker",
    "灯を守る人",
    "傷ついた誰かのそばに残り、灯を消さない者。",
    "戦いの後に残された痛みへ、あなたは静かに手を差し伸べる。",
  ),
  Judge: createMovieProfile(
    "Judge",
    "正義の天秤",
    "感情と利益の中で、正しさの線を引く者。",
    "誰もが都合のいい答えを求める時、あなたは揺れない基準を示す。",
  ),
  Operator: createMovieProfile(
    "Operator",
    "沈黙の任務",
    "感情が揺れる世界で、最後に任務を完了する者。",
    "混乱の中心で、あなたは言葉よりも確かな一手で道を開く。",
  ),
  Architect: createMovieProfile(
    "Architect",
    "未来の設計図",
    "誰も見ていない未来を、静かに設計する者。",
    "崩れた世界の瓦礫の中で、あなたは次に続く仕組みを描く。",
  ),
  Strategist: createMovieProfile(
    "Strategist",
    "勝利は夜明け前に",
    "夜明け前の盤面で、勝利への一手を読む者。",
    "誰も気づかない数手先で、あなたは物語の結末を準備する。",
  ),
};
