import type { ArchetypeName, TrailerReport } from "../types/diagnosis.ts";

interface ShareExperience {
  trailerReport: TrailerReport;
  similarProtagonistTendencies: string[];
}

export const shareExperienceReports: Record<ArchetypeName, ShareExperience> = {
  "Dream Explorer": {
    trailerReport: {
      openingNarration: "退屈な日常の向こうで、まだ誰も見たことのない扉が開く。",
      middleConflict: "理想を信じるほど、準備不足と仲間の不安が行く手をふさぐ。",
      finalChoice: "安全な場所へ戻るか、震える手で新しい世界の一歩目を選ぶか。",
      trailerTagline: "未知は、あなたを待っている。",
      trailerCopy: "希望だけでは進めない。それでも、希望がなければ物語は始まらない。",
    },
    similarProtagonistTendencies: [
      "未知の世界へ最初に踏み出す冒険型主人公",
      "仲間の不安ごと未来へ連れていく夢追い型主人公",
      "安全な正解より、物語の続きを選ぶ人物",
    ],
  },
  Wanderer: {
    trailerReport: {
      openingNarration: "地図にない道を歩くたび、自分の輪郭が少しずつ見えてくる。",
      middleConflict: "自由を求めるほど、帰る場所と選ぶ責任が重くなる。",
      finalChoice: "旅を続けるか、自分で選んだ場所に立ち止まるか。",
      trailerTagline: "答えは、目的地ではなく道の途中にある。",
      trailerCopy: "これは逃避ではない。自分の人生を自分の言葉で見つける旅だ。",
    },
    similarProtagonistTendencies: [
      "居場所を探し続ける旅人型主人公",
      "自由と現実の間で自分の答えを選ぶ人物",
      "出会いを通して内面の真実へ近づく主人公",
    ],
  },
  "Visionary Hero": {
    trailerReport: {
      openingNarration: "希望が失われかけた世界で、ひとりの声が人々の顔を上げさせる。",
      middleConflict: "守りたい人が増えるほど、自分の弱さを隠せなくなる。",
      finalChoice: "すべてを背負う英雄でいるか、希望を仲間へ手渡すか。",
      trailerTagline: "光は、ひとりで背負うものではない。",
      trailerCopy: "理想を語る勇気と、誰かに託す勇気。その両方が未来を変える。",
    },
    similarProtagonistTendencies: [
      "未来への希望で仲間を導く英雄型主人公",
      "理想と責任を同時に背負う光のリーダー",
      "人を守りながら新しい時代へ進む人物",
    ],
  },
  Seeker: {
    trailerReport: {
      openingNarration: "誰も気づかない違和感が、静かな主人公を真実へ導く。",
      middleConflict: "知れば知るほど、守りたいものと暴くべきものが衝突する。",
      finalChoice: "沈黙を選ぶか、知った真実を背負って前へ進むか。",
      trailerTagline: "真実は、見つけた者を変えてしまう。",
      trailerCopy: "これは謎解きではない。知ることの重さを引き受ける物語だ。",
    },
    similarProtagonistTendencies: [
      "静かに真実を追う観察者型主人公",
      "世界の矛盾を読み解く探究型主人公",
      "行動より理解から物語を動かす人物",
    ],
  },
  Revolutionary: {
    trailerReport: {
      openingNarration: "誰も声を上げない世界で、ひとつの怒りが未来への火種になる。",
      middleConflict: "変えるための戦いは、仲間の恐れと自分の焦りを映し出す。",
      finalChoice: "壊すだけで終わるか、変化の後に続く未来を引き受けるか。",
      trailerTagline: "世界は、黙っていては変わらない。",
      trailerCopy: "正義は叫びでは終わらない。続く未来を作る覚悟が試される。",
    },
    similarProtagonistTendencies: [
      "理不尽な世界へ立ち向かう革命家型主人公",
      "怒りを戦略へ変えて物語を動かす人物",
      "現状維持を壊し、未来の責任を背負う主人公",
    ],
  },
  Rogue: {
    trailerReport: {
      openingNarration: "ルールの外側で生きるその人物は、誰よりも状況の抜け道を知っている。",
      middleConflict: "自由でいるほど、信頼されたい本音が弱点になる。",
      finalChoice: "ひとりで勝つか、誰かと組んでさらに大きな舞台へ進むか。",
      trailerTagline: "縛られない者だけが、見える道がある。",
      trailerCopy: "自由は孤独の証明ではない。信頼しても、あなたは自由でいられる。",
    },
    similarProtagonistTendencies: [
      "ルールの隙間から局面を変えるアウトロー型主人公",
      "正面突破より機転で勝つ自由人",
      "信頼と独立の間で揺れるダークヒーロー的主人公",
    ],
  },
  Commander: {
    trailerReport: {
      openingNarration: "混乱の中で、誰かが決断しなければならない。その視線は自然とあなたへ集まる。",
      middleConflict: "理想の勝利を求めるほど、仲間への厳しさと責任が重くなる。",
      finalChoice: "命令で人を動かすか、仲間が自ら立てる未来を作るか。",
      trailerTagline: "率いるとは、背負うことだ。",
      trailerCopy: "勝つだけでは物語は終わらない。誰を立ち上がらせたかが問われる。",
    },
    similarProtagonistTendencies: [
      "前線で仲間を率いる指揮官型主人公",
      "理想と秩序を同時に背負うリーダー",
      "決断によって集団の運命を動かす人物",
    ],
  },
  Adventurer: {
    trailerReport: {
      openingNarration: "安全な場所に答えはない。答えは、踏み出した先の土埃の中にある。",
      middleConflict: "経験で突破してきた主人公に、準備不足という現実が迫る。",
      finalChoice: "勢いだけで進むか、経験を知恵へ変えて仲間を生かすか。",
      trailerTagline: "世界は、触れて初めてわかる。",
      trailerCopy: "冒険は無謀ではない。現実を動かすための最初の一歩だ。",
    },
    similarProtagonistTendencies: [
      "現場で世界を切り拓く冒険家型主人公",
      "経験から勝ち筋をつかむ行動派主人公",
      "机上の正解より実地の一歩で物語を動かす人物",
    ],
  },
  Advocate: {
    trailerReport: {
      openingNarration: "小さな声が押しつぶされる世界で、その人物だけは聞こえないふりができなかった。",
      middleConflict: "守りたい相手がいるほど、怒りと疲労が心を削っていく。",
      finalChoice: "すべてを背負うか、声を集めて現実を変える力にするか。",
      trailerTagline: "優しさは、ときに世界への反抗になる。",
      trailerCopy: "誰かの痛みを言葉にした瞬間、物語はもう後戻りできない。",
    },
    similarProtagonistTendencies: [
      "弱い立場の声を社会へ届ける代弁者型主人公",
      "共感を行動へ変える信念型主人公",
      "正しさと優しさの間で戦う人物",
    ],
  },
  Mediator: {
    trailerReport: {
      openingNarration: "対立する声が響く部屋で、その人物だけが沈黙の奥にある本音を聞いていた。",
      middleConflict: "双方を理解できるからこそ、自分の本音だけが置き去りになる。",
      finalChoice: "衝突を避け続けるか、関係を進めるための真実を告げるか。",
      trailerTagline: "橋を架ける者も、いつか選ばなければならない。",
      trailerCopy: "調和は逃避ではない。壊れた関係を前へ進める勇気だ。",
    },
    similarProtagonistTendencies: [
      "対立を対話へ戻す調停者型主人公",
      "人の本音をつなぎ直す橋渡し役",
      "勝敗より関係の再生で物語を動かす人物",
    ],
  },
  Guardian: {
    trailerReport: {
      openingNarration: "大切なものを守るため、その人物は誰よりも先に危機の影を見つける。",
      middleConflict: "守りたい気持ちが強いほど、変化そのものが脅威に見えてくる。",
      finalChoice: "過去を守り続けるか、未来へ進むための守り方を選ぶか。",
      trailerTagline: "守るとは、止めることではない。",
      trailerCopy: "本当に大切なものは、形を変えても守り抜ける。",
    },
    similarProtagonistTendencies: [
      "仲間と価値観を守る守護者型主人公",
      "危機の中で土台を支える防衛型リーダー",
      "失う恐れと未来への責任を背負う人物",
    ],
  },
  Caretaker: {
    trailerReport: {
      openingNarration: "世界を救う大声ではなく、誰かの日常を支える小さな手から物語は始まる。",
      middleConflict: "頼られるほど、自分の疲れと願いは静かに見えなくなっていく。",
      finalChoice: "誰かのために消耗し続けるか、自分も守る支援の形を選ぶか。",
      trailerTagline: "支える人にも、物語がある。",
      trailerCopy: "献身は自己犠牲で終わらない。優しさを続けるための選択が始まる。",
    },
    similarProtagonistTendencies: [
      "身近な人の日常を守る支援型主人公",
      "派手な勝利より生活の安定を作る人物",
      "誰かを支えながら自分の境界も学ぶ主人公",
    ],
  },
  Judge: {
    trailerReport: {
      openingNarration: "誰もが空気を読んで黙る中、その人物だけが公平さの欠落を見逃さなかった。",
      middleConflict: "正しさを貫くほど、仲間との距離と孤独が深くなる。",
      finalChoice: "断罪で終わるか、未来のための基準を示すか。",
      trailerTagline: "正義は、言葉にした瞬間から試される。",
      trailerCopy: "白黒をつけるだけでは足りない。次へ進むための公正さが問われる。",
    },
    similarProtagonistTendencies: [
      "不公平を見抜き基準を示す裁定者型主人公",
      "空気より正義を選ぶ規律型主人公",
      "断罪ではなく公正な未来を作る人物",
    ],
  },
  Operator: {
    trailerReport: {
      openingNarration: "感情が渦巻く現場で、その人物は静かに最短ルートを見つけていた。",
      middleConflict: "結果を出すほど、置き去りにした感情が仲間との距離になる。",
      finalChoice: "任務だけを完了するか、誰のための成果なのかを引き受けるか。",
      trailerTagline: "動け。迷う時間は少ない。",
      trailerCopy: "成果は冷静さから生まれる。だが、物語を残すのはその意味だ。",
    },
    similarProtagonistTendencies: [
      "現場を最短で動かす実行者型主人公",
      "感情より任務遂行で局面を変える人物",
      "混乱をタスクへ分解する現場運用型主人公",
    ],
  },
  Architect: {
    trailerReport: {
      openingNarration: "誰もが目の前の混乱に飲まれる中、その人物は世界の設計図を見ていた。",
      middleConflict: "正しい構造を見抜くほど、人の感情と速度が計画を揺らす。",
      finalChoice: "完璧な設計を守るか、人を巻き込みながら未来の仕組みを作るか。",
      trailerTagline: "世界は、もう一度設計できる。",
      trailerCopy: "派手な勝利ではない。未来に残る仕組みこそが、この主人公のラストシーンだ。",
    },
    similarProtagonistTendencies: [
      "未来を設計する参謀型主人公",
      "組織の裏側で物語を動かす設計者",
      "派手な勝利より構造改革で世界を変える人物",
    ],
  },
  Strategist: {
    trailerReport: {
      openingNarration: "勝利は偶然ではない。その人物は、誰よりも早く敗北の条件を読んでいた。",
      middleConflict: "最適解を探すほど、人の心は作戦通りに動かないことを知る。",
      finalChoice: "安全な計画に留まるか、自分自身もリスクを取って局面を変えるか。",
      trailerTagline: "勝ち筋は、静かな場所で組み上がる。",
      trailerCopy: "表舞台に立たなくても、物語の流れを変える者がいる。",
    },
    similarProtagonistTendencies: [
      "全体を読んで勝ち筋を作る軍師型主人公",
      "裏方で局面を支配する戦略家",
      "感情より構造とタイミングで物語を動かす人物",
    ],
  },
};
