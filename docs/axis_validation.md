
Version: 2.0

# MOVI Persona

Axis Validation Specification

---

# Purpose

本ドキュメントは

MOVI Persona

における心理軸の妥当性を定義する。

目的は以下である。

- 軸の重複を防ぐ
    
- 軸の偏りを防ぐ
    
- アーキタイプ判定の安定化
    
- 質問設計の指針を提供する
    

---

# Design Philosophy

本システムは

心理学的診断

ではなく

MOVI Persona Archetype

を目的とする。

---

本システムは

以下を重視する。

- エンターテインメント性
    
- 自己理解
    
- 映画的没入感
    
- 再利用性
    

---

本システムは

以下を目的としない。

- 医学的診断
    
- 精神疾患評価
    
- 臨床心理評価
    
- 採用評価
    

---

# Model Architecture

Version 2.0から

12軸モデルを廃止する。

---

採用モデル

4 Core Dimensions

4 Secondary Traits

---

# Core Dimensions

Purpose

16アーキタイプを決定する。

---

## EXP_PRAG

Explorer

vs

Pragmatist

---

Measures

- 冒険性
    
- 未知への反応
    
- 新規性選好
    
- 実用性
    

---

Question Themes

- 未知の選択
    
- リスク
    
- 新しい環境
    

---

## EMP_STR

Empath

vs

Strategist

---

Measures

- 共感
    
- 感情理解
    
- 論理判断
    
- 効率性
    

---

Question Themes

- 人間関係
    
- 対立解決
    
- チーム判断
    

---

## REB_GUA

Rebel

vs

Guardian

---

Measures

- 独立性
    
- 権威への態度
    
- 変革志向
    
- 秩序維持
    

---

Question Themes

- ルール
    
- 組織
    
- 反抗
    
- 責任
    

---

## IDE_REA

Idealist

vs

Realist

---

Measures

- 理想
    
- 信念
    
- 正義感
    
- 現実性
    

---

Question Themes

- 正義
    
- 利益
    
- 損失
    
- 信念
    

---

# Core Dimension Requirements

Each Core Dimension must be measured multiple times.

---

Minimum

3 Questions

per Dimension

---

Recommended

4-5 Questions

per Dimension

---

Example

EXP_PRAG

4 Questions

EMP_STR

4 Questions

REB_GUA

4 Questions

IDE_REA

4 Questions

Valid

---

# Dimension Balance Rule

No Core Dimension should dominate measurement coverage.

---

Maximum Difference

±1 Question

between dimensions

---

Invalid Example

EXP_PRAG

8 Questions

EMP_STR

2 Questions

REB_GUA

2 Questions

IDE_REA

2 Questions

---

# Secondary Traits

Purpose

結果の個性化

アーキタイプ決定には使用しない。

---

# RISK

Japanese

挑戦性

---

Measures

- 危険許容度
    
- 挑戦志向
    
- 大胆さ
    

---

Usage

Result Narratives

Character Flavor

---

# SACRIFICE

Japanese

自己犠牲性

---

Measures

- 献身性
    
- 自己犠牲
    
- 他者優先
    

---

Usage

Result Narratives

Relationship Analysis

---

# COLLECTIVISM

Japanese

集団志向

---

Measures

- 仲間意識
    
- チーム志向
    
- 協力性
    

---

Usage

Result Narratives

Leadership Analysis

---

# JUSTICE

Japanese

正義志向

---

Measures

- 公平性
    
- 道徳観
    
- 信念
    

---

Usage

Result Narratives

Behavioral Analysis

---

# Secondary Trait Rules

Secondary Traits must never determine:

- Archetype
    
- Primary Type
    
- Confidence Score
    

---

Secondary Traits may influence:

- Character Overview
    
- Behavioral Analysis
    
- Screenwriter Report
    
- Behavioral Intelligence Report
    

---

# Coverage Validation

Before release:

Every Core Dimension must satisfy:

- Minimum Question Count
    
- Balanced Coverage
    
- Positive Pole Coverage
    
- Negative Pole Coverage
    

---

Example

Explorer

appears

4 times

Valid

---

Pragmatist

appears

1 time

Invalid

---

# Quality Validation Checklist

Questions should:

✓ Present meaningful trade-offs

✓ Reflect movie-like situations

✓ Avoid obvious good/bad answers

✓ Avoid politically loaded choices

✓ Avoid moral superiority framing

✓ Support both poles equally

---

# Red Flags

The following indicate poor measurement quality:

---

One pole appears significantly more often

---

Only one question measures a dimension

---

A question measures multiple dimensions inconsistently

---

A single question determines an archetype

---

A secondary trait influences archetype selection

---

# Validation Output

Question audits should produce:

```json
{
  "EXP_PRAG": {
    "questionCount": 4,
    "coverage": "PASS"
  },
  "EMP_STR": {
    "questionCount": 4,
    "coverage": "PASS"
  },
  "REB_GUA": {
    "questionCount": 4,
    "coverage": "PASS"
  },
  "IDE_REA": {
    "questionCount": 4,
    "coverage": "PASS"
  }
}
```

---

# Final Rule

MOVI Persona uses:

4 Core Dimensions

to determine archetypes.

4 Secondary Traits

to personalize narrative output.

Secondary Traits must never override archetype calculation.
