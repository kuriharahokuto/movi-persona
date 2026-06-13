# MOVI Persona

MOVI Personaサービス

---

## 概要

MOVI Persona は、

「もしあなたが映画の主人公だったら？」

をテーマにした映画主人公タイプ診断サービスです。

ユーザーは映画のワンシーンのような状況で意思決定を行い、その回答をもとに映画的アーキタイプへ分類されます。

診断結果では、

- 映画主人公タイプ
    
- 強み
    
- 弱み
    
- 行動傾向
    
- おすすめ映画
    

などを確認できます。

---

## コンセプト

一般的な性格診断ではなく、

「映画の主人公としての自分」

を発見することを目的としています。

ユーザーは映画の中に入り込んだような体験を通じて、自身の価値観や行動傾向を知ることができます。

---

## 参考理論

本サービスは以下の理論を参考に設計されています。

### Big Five Personality Theory

人格特性モデル

---

### Narrative Identity Theory

人は人生を物語として理解するという理論

---

### Moral Psychology

道徳的意思決定の研究

---

### Behavioral Analysis

行動から動機や傾向を分析する考え方

---

## 診断フロー

1. 映画的状況の質問へ回答
    
2. 心理軸スコアを集計
    
3. 映画アーキタイプを判定
    
4. 結果ページを表示
    

---

## 診断軸

現在は4 Core Dimensionsと4 Secondary Traitsを採用

Core Dimensions

EXP_PRAG
Explorer ↔ Pragmatist

EMP_STR
Empath ↔ Strategist

REB_GUA
Rebel ↔ Guardian

IDE_REA
Idealist ↔ Realist

Secondary Traits

RISK
SACRIFICE
COLLECTIVISM
JUSTICE
    

---

## 映画アーキタイプ

現在は16タイプを採用

例

- Dream Explorer（夢追い人）
    
- Guardian（守護者）
    
- Revolutionary（革命家）
    
- Strategist（戦略家）
    
- Wanderer（放浪者）
    
- Judge（裁定者）
    

など

詳細は

docs/archetypes.md

を参照。

---

## プロジェクト構成

```text
MOVI Persona/
  project/
    README.md
    AGENTS.md
  docs/
    rules.md
    archetypes.md
    mapping.md
    axis_validation.md
    questions.md
    result_templates.md
    data_model.md
    scoring_engine.md
  src/
```

---

## MVP機能

### 診断機能

映画シーン形式の質問

---

### スコアリング機能

心理軸集計

---

### アーキタイプ判定

16タイプ分類

---

### 結果画面

診断結果表示

---

### SNS共有

診断結果の共有

---

## 将来構想

### 映画推薦機能

診断結果からおすすめ映画を提案

---

### 映画履歴マップ

鑑賞映画を可視化

---

### 映画MBTI

映画的価値観診断

---

### AI分析

診断結果の深掘り解説

---

### 映画レビュー支援

SNS投稿文の自動生成

---

## 開発方針

- MVPを最優先
    
- フロントエンドのみで開始
    
- 診断ロジックとUIを分離
    
- 設定ファイル駆動で管理
    
- 将来的なAI統合を考慮
    

---

## 開発ロードマップ

Phase 1

診断エンジン完成

---

Phase 2

映画推薦機能

---

Phase 3

ユーザーアカウント

---

Phase 4

コミュニティ機能

---

Phase 5

AI映画コンシェルジュ

---

## Goal

ユーザーが診断終了後に

「自分がどんな映画主人公なのか分かった」

と感じられる体験を提供する。
