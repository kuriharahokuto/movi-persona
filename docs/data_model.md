
Version: 2.0

# MOVI Persona

Data Model Specification

---

# Purpose

本ドキュメントは

MOVI Persona

における共通データ構造を定義する。

対象

- Question Data
    
- User Responses
    
- Score Calculation
    
- Archetype Results
    
- Report Generation
    

---

# Design Principles

The system must be:

- Deterministic
    
- Offline-capable
    
- API-independent
    
- JSON-compatible
    

---

# Core Dimensions

Canonical Dimension Codes

```text
EXP_PRAG
EMP_STR
REB_GUA
IDE_REA
```

---

Dimension Meaning

```text
EXP_PRAG
Explorer vs Pragmatist

EMP_STR
Empath vs Strategist

REB_GUA
Rebel vs Guardian

IDE_REA
Idealist vs Realist
```

---

# Secondary Traits

Canonical Trait Codes

```text
RISK
SACRIFICE
COLLECTIVISM
JUSTICE
```

---

# Question Model

Each question must follow:

```json
{
  "id": "Q01",
  "dimension": "EXP_PRAG",
  "scene": "string",
  "choices": []
}
```

---

# Choice Model

```json
{
  "id": "A",
  "label": "string",
  "scores": {
    "Explorer": 3,
    "RISK": 2
  }
}
```

---

Rules

- scores may contain multiple entries
    
- score values are integers
    
- minimum = 0
    
- maximum = 3
    

---

# User Response Model

```json
{
  "userId": "anonymous",
  "answers": {
    "Q01": "A",
    "Q02": "B",
    "Q03": "C"
  }
}
```

---

# Raw Score Model

Purpose

質問回答後の生スコア

```json
{
  "Explorer": 12,
  "Pragmatist": 8,
  "Empath": 10,
  "Strategist": 14,
  "Rebel": 9,
  "Guardian": 13,
  "Idealist": 15,
  "Realist": 7,
  "RISK": 9,
  "SACRIFICE": 6,
  "COLLECTIVISM": 4,
  "JUSTICE": 10
}
```

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

Fields

dominant

Winning Pole

difference

Absolute percentage-point difference between positivePercentage and negativePercentage

balanced

Difference <= 5

---

# Secondary Trait Result

```json
{
  "RISK": 82,
  "SACRIFICE": 45,
  "COLLECTIVISM": 66,
  "JUSTICE": 91
}
```

---

Range

0-100

Normalized Percentage

---

# Archetype Result Model

```json
{
  "archetype": "Dream Explorer",
  "confidence": 78
}
```

---

Rules

archetype

Must exist in archetypes.md

confidence

0-100

---

# Complete Diagnosis Result

```json
{
  "archetype": "Dream Explorer",

  "confidence": 78,

  "dimensions": {

    "EXP_PRAG": {
      "dominant": "Explorer",
      "positivePole": "Explorer",
      "negativePole": "Pragmatist",
      "positivePercentage": 60,
      "negativePercentage": 40,
      "difference": 20,
      "balanced": false
    },

    "EMP_STR": {
      "dominant": "Empath",
      "positivePole": "Empath",
      "negativePole": "Strategist",
      "positivePercentage": 52,
      "negativePercentage": 48,
      "difference": 3,
      "balanced": true
    },

    "REB_GUA": {
      "dominant": "Rebel",
      "positivePole": "Rebel",
      "negativePole": "Guardian",
      "positivePercentage": 55,
      "negativePercentage": 45,
      "difference": 10,
      "balanced": false
    },

    "IDE_REA": {
      "dominant": "Idealist",
      "positivePole": "Idealist",
      "negativePole": "Realist",
      "positivePercentage": 57.5,
      "negativePercentage": 42.5,
      "difference": 15,
      "balanced": false
    }
  },

  "secondaryTraits": {
    "RISK": 82,
    "SACRIFICE": 44,
    "COLLECTIVISM": 61,
    "JUSTICE": 90
  }
}
```

---

# Result Template Input

result_templates.md receives:

```json
{
  "archetype": "...",
  "confidence": 78,
  "dimensions": {},
  "secondaryTraits": {}
}
```

Display labels are generated from canonical internal codes.

Internal storage keys must remain canonical codes.

---

# Archetype Mapping Input

mapping.md requires

```json
{
  "EXP_PRAG": "Explorer",
  "EMP_STR": "Empath",
  "REB_GUA": "Rebel",
  "IDE_REA": "Idealist"
}
```

---

# Validation Rules

Every diagnosis result must contain:

- archetype
    
- confidence
    
- dimensions
    
- secondaryTraits
    

---

Confidence Range

0 <= confidence <= 100

---

Dimension Count

Exactly 4

---

Secondary Trait Count

Exactly 4

---

# Secondary Trait Naming Rule

Canonical Code

RISK

Display Name

Risk Taking

Japanese

挑戦性

---

Canonical Code

SACRIFICE

Display Name

Sacrifice

Japanese

自己犠牲性

---

Canonical Code

COLLECTIVISM

Display Name

Collectivism

Japanese

集団志向

---

Canonical Code

JUSTICE

Display Name

Justice Orientation

Japanese

正義志向

# MVP Storage Strategy

Version 1

Local Storage Only

No Accounts

No Authentication

No Cloud Database

---

Stored Data

```json
{
  "completedDiagnoses": []
}
```

---

# Future Expansion

Version 2+

Optional

- User Accounts
    
- Progress Tracking
    
- Diagnosis History
    
- Movie Collection System
    
- Social Features
    

---

Future fields must remain backward compatible.

---

# Final Rule

All services must use this document as the canonical data structure.

No component may introduce incompatible field names or alternative schemas.
