# result_experience.md

Version: 1.0

# Purpose

本ドキュメントは MOVI Persona の結果画面体験を改善するための仕様書である。

目的は以下。

- ユーザーが「当たっている」と感じる結果文にする
    
- SNSで共有したくなる結果画面にする
    
- 英語と日本語の混在を減らす
    
- MOVI Personaとしての没入感を高める
    
- 結果画面の滞在時間を伸ばす
    

---

# Result Page Priority

結果画面はこのサービスの最重要画面である。

診断ロジックよりも、ユーザーが結果を読んだときの納得感・共感・共有したさを重視する。

---

# Language Rule

MVPのUI表示言語は日本語に統一する。

以下の英語ラベルは日本語へ変更する。

Character Overview  
→ あなたの人物像

Core Dimensions  
→ 主人公タイプ分析

Secondary Traits  
→ 行動傾向

Strengths  
→ 強み

Blind Spots  
→ 弱み・注意点

Behavioral Analysis  
→ 行動分析

Screenwriter Report  
→ 脚本家レポート

Behavioral Intelligence Report  
→ 行動分析官レポート

Recommended Movies  
→ おすすめ映画

View Full Report  
→ 詳細レポートを見る

Your Archetype  
→ あなたの主人公タイプ

Confidence  
→ 診断の明確度

---

# Result Hero Section

結果画面の最上部は映画ポスター風にする。

必須表示:

- アーキタイプ画像
    
- アーキタイプ名
    
- 日本語名
    
- タグライン
    
- 診断の明確度
    
- 希少性風コピー
    

Example:

ARCHITECT

設計者

未来の仕組みを構築する戦略家

あなたは「感情で走る主人公」ではなく、  
物語全体の構造を見抜き、未来を設計するタイプです。

---

# Character Overview

目的:

ユーザーに「これは自分に当てはまる」と感じてもらう。

文字量:

最低 300〜500文字

内容:

- 基本的な価値観
    
- 判断基準
    
- 周囲からどう見られやすいか
    
- 本人が自覚しにくい特徴
    
- 強みと弱みの表裏一体
    

Example Tone:

あなたは、混乱した状況の中でも感情に飲み込まれにくい人物です。

周囲が勢いで動いているときでも、  
一歩引いて全体の構造を見ようとします。

そのため、他人からは冷静、慎重、少し距離がある人だと思われることがあります。

しかし実際には、何もしないために黙っているのではありません。

あなたの中では、物事をどの順番で動かせばよいか、  
誰をどこに配置すべきか、  
どの選択が長期的に最も良い結果につながるかを考えています。

---

# Cinematic Identity Scores

結果画面に共有したくなる数値を追加する。

これらは診断ロジックを変更しない。

既存のCore DimensionsとSecondary Traitsから表示用に算出する。

表示項目例:

- 主人公適性
    
- 参謀適性
    
- 革命家指数
    
- 守護者指数
    
- ダークヒーロー指数
    
- 共感型リーダー指数
    
- 冒険衝動
    
- 正義感指数
    

注意:

これらは娯楽用指標であり、心理診断や医学的評価ではない。

---

# Example Score Labels

Architect向け:

主人公適性  
72

参謀適性  
94

未来設計力  
96

感情暴走リスク  
18

孤独な戦略家度  
81

---

Dream Explorer向け:

主人公適性  
92

冒険衝動  
95

未知への耐性  
88

安定志向  
22

物語を動かす力  
90

---

Guardian向け:

守護者指数  
96

仲間を守る力  
91

責任感  
88

改革衝動  
28

信頼される主人公度  
89

---

# Behavioral Intelligence Report

行動分析官レポートは、情報機関風の演出にする。

ただし、実在のCIA / FBI / 公的機関を名乗らない。

表記:

行動分析官レポート

文体:

- 冷静
    
- 分析的
    
- 少し専門家風
    
- 断定しすぎない
    

Example:

対象者は、混乱した状況下でも感情的反応より構造把握を優先する傾向がある。

短期的な称賛よりも、長期的に機能する仕組みを重視する。

集団内では前面に立つよりも、全体の動線を設計する役割を担いやすい。

一方で、判断速度を求められる場面では、分析が長引き行動が遅れる可能性がある。

Assessment:

- Strategic Stability: High
    
- Emotional Reactivity: Low
    
- Long-term Planning: High
    
- Social Visibility: Medium
    

---

# Screenwriter Report

脚本家レポートは映画との相性を高めるために必ず表示する。

Example:

もしあなたが映画の主人公なら、  
物語の序盤では目立たない人物として登場するでしょう。

周囲が衝動的に動く中で、  
あなたは状況を観察し、誰も気づいていない構造を見抜きます。

中盤では、混乱したチームや崩れかけた計画を再設計する役割を担います。

終盤では、派手な勝利ではなく、  
未来へ残る仕組みを作ることで物語を終わらせるタイプです。

---

# Share Section

SNS共有を促す。

表示内容:

- アーキタイプ名
    
- 日本語名
    
- タグライン
    
- 代表スコア3つ
    
- 画像
    
- 共有用テキスト
    

Example Share Text:

私は「ARCHITECT / 設計者」タイプでした。

未来の仕組みを構築する戦略家。

主人公適性 72  
参謀適性 94  
未来設計力 96

あなたはどんな映画の主人公？  
#MOVIPersona

---

# Result Page Structure

推奨順序:

1. Hero Poster
    
2. Short Emotional Summary
    
3. Cinematic Identity Scores
    
4. あなたの人物像
    
5. 主人公タイプ分析
    
6. 行動傾向
    
7. 強み
    
8. 弱み・注意点
    
9. 脚本家レポート
    
10. 行動分析官レポート
    
11. おすすめ映画
    
12. 共有セクション
    

---

# Quality Rules

結果文は短すぎてはいけない。

各アーキタイプの説明は、最低でも以下を満たす。

- Character Overview: 300文字以上
    
- Screenwriter Report: 250文字以上
    
- Behavioral Intelligence Report: 250文字以上
    

---

# Do Not

- 英語と日本語を混在させすぎない
    
- 旧12軸名を表示しない
    
- 医学的診断のように見せない
    
- 実在機関の公式分析のように見せない
    
- APIやAI生成に依存しない
    
- フォールバック文言で結果を薄めない
    

---

# Final Goal

ユーザーが結果画面を見たときに、以下の感情を持つこと。

「これ、けっこう自分っぽい」

「友達にもやらせたい」

「自分の結果を共有したい」