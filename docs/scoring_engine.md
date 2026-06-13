
Version: 3.0

# MOVI Persona

Scoring Engine Specification

---

# Purpose

本ドキュメントは MOVI Persona のスコアリング仕様を定義する。

本仕様は以下を定義する。

- Score Aggregation
    
- Normalization
    
- Dimension Calculation
    
- Archetype Selection
    
- Confidence Calculation
    
- Balanced Detection
    
- Secondary Trait Processing
    

本ドキュメントは診断ロジックの唯一の正規仕様である。

---

# Priority

優先順位

1. scoring_engine.md
    
2. data_model.md
    
3. mapping.md
    
4. archetypes.md
    
5. questions.md
    
6. result_templates.md
    

矛盾が発生した場合は上位ドキュメントを採用する。

---

# Core Dimensions

The diagnosis model uses four core dimensions.

---

EXP_PRAG

Explorer ↔ Pragmatist

---

EMP_STR

Empath ↔ Strategist

---

REB_GUA

Rebel ↔ Guardian

---

IDE_REA

Idealist ↔ Realist

---

# Secondary Traits

Secondary Traits never determine archetypes.

---

RISK

Risk Taking

挑戦性

---

SACRIFICE

Sacrifice

自己犠牲性

---

COLLECTIVISM

Collectivism

集団志向

---

JUSTICE

Justice Orientation

正義志向

---

# Score Aggregation

Purpose

回答選択肢から生スコアを集計する。

---

Example

```json
{
  "Explorer": 12,
  "Pragmatist": 8,
  "Empath": 10,
  "Strategist": 14,
  "Rebel": 11,
  "Guardian": 7,
  "Idealist": 15,
  "Realist": 5,
  "RISK": 9,
  "SACRIFICE": 6,
  "COLLECTIVISM": 4,
  "JUSTICE": 8
}
```

---

# Maximum Score Calculation

Purpose

理論上の最大スコアを算出する。

固定値は禁止。

---

Calculation Rule

For each question:

1. 選択肢を確認する
    
2. 対象Poleの最大値を取得する
    
3. 全質問を合計する
    

---

Formula

maxScoreByPole

=

Σ

highest contribution per question

---

Question definitions are the single source of truth.

Hardcoded maximum values are prohibited.

---

# Normalization

Purpose

質問数変更に依存しない比較を可能にする。

---

Formula

Normalized Score

=

Raw Score

/

Max Score

×

100

---

Range

0 - 100

---

Example

Explorer Raw

12

Explorer Max

16

Result

75

---

# Pole Percentage

Purpose

Dimension内での優勢度を算出する。

---

Formula

Pole Percentage

=

Pole Score

/

(Pole A + Pole B)

×

100

---

Example

Explorer

12

Pragmatist

8

Explorer %

60

Pragmatist %

40

---

# Dominant Pole Selection

Archetype selection uses normalized pole percentages.

Raw scores must not be used.

---

Example

Explorer %

60

Pragmatist %

40

Result

Explorer

---

# Tie Break Rule

If Pole Percentages are equal:

Select Positive Pole.

---

EXP_PRAG

Explorer

---

EMP_STR

Empath

---

REB_GUA

Rebel

---

IDE_REA

Idealist

---

# Balanced Detection

Purpose

Balanced状態を検出する。

Balancedは説明用であり、

タイプ判定には使用しない。

---

Formula

Absolute Difference

<= 5%

---

Example

Explorer 52%

Pragmatist 48%

Balanced = true

---

Example

Empath 70%

Strategist 30%

Balanced = false

---

# Dimension Result Model

```json
{
  "EXP_PRAG": {
    "dominant": "Explorer",
    "positivePole": "Explorer",
    "negativePole": "Pragmatist",
    "positivePercentage": 60,
    "negativePercentage": 40,
    "difference": 20,
    "balanced": false
  }
}
```

---

# Archetype Selection

Inputs

EXP_PRAG

EMP_STR

REB_GUA

IDE_REA

---

Example

Explorer

Empath

Rebel

Idealist

↓

Dream Explorer

---

Example

Pragmatist

Strategist

Guardian

Realist

↓

Strategist

---

Official mapping is defined in mapping.md

---

# Confidence Calculation

Purpose

診断結果の明確さを示す。

---

Dimension Strength

Formula

Abs(PoleA% - PoleB%)

---

Example

60

40

↓

20

---

Example

80

20

↓

60

---

Confidence

=

Average(

DimensionStrengths

)

---

Example

20

40

60

30

↓

Average

37.5

↓

Confidence

38

---

# Confidence Levels

90-100

Very Strong

---

75-89

Strong

---

60-74

Moderate

---

40-59

Mixed

---

0-39

Balanced

---

# Confidence Cap

Apply the lowest matching cap.

Question Count < 16

Maximum Confidence = 80

---

Question Count < 12

Maximum Confidence = 70

---

Question Count < 8

Maximum Confidence = 60

---

# Secondary Trait Processing

Purpose

結果の個性化

---

Formula

Trait %

=

Trait Raw

/

Trait Max

×

100

---

Example

RISK

9 / 12

↓

75

---

Secondary Traits never influence:

- Archetype
    
- Dominant Pole
    
- Confidence

If Trait Max is 0:

Trait Percentage = 0

and the trait must not be displayed as a measured trait.
    

---

Secondary Traits may influence:

- Narrative Reports
    
- Character Flavor
    
- Screenwriter Analysis
    
- Behavioral Intelligence Report
    

---

# Validation Requirements

Every Core Dimension must satisfy:

---

Pole A Max Score

=

Pole B Max Score

---

Examples

Explorer Max

16

Pragmatist Max

16

PASS

---

Explorer Max

16

Pragmatist Max

12

FAIL

If validation fails:

Diagnosis must not run.

The question configuration must be treated as invalid.

---

# Required Checks

Before release:

- Dimension Coverage Validation
    
- Pole Balance Validation
    
- Normalization Validation
    
- Confidence Validation
    
- Archetype Mapping Validation
    

All must pass.

---

# Future Compatibility

The system must remain stable if:

- Questions increase
    
- Questions decrease
    
- New result reports are added
    
- Secondary Traits are expanded
    

Archetype determination must remain unchanged.

---

# Prohibited

Do not use:

- AI inference
    
- Randomness
    
- Hidden modifiers
    
- Dynamic weighting
    
- External APIs
    

The same answers must always produce the same result.

---

# Final Rule

MOVI Persona determines archetypes using:

4 Core Dimensions

EXP_PRAG

EMP_STR

REB_GUA

IDE_REA

Secondary Traits are narrative modifiers only.

They must never override archetype selection.
