# rules.md

Version: 2.0

# Personality Framework

This document defines the canonical personality dimensions used by the MOVI Persona system.

The scoring logic is defined in:

docs/scoring_engine.md

This document only describes the meaning of each dimension.

---

# Dimension Architecture

Each archetype is calculated from four primary dimensions.

Each dimension consists of two opposing poles.

---

# Dimension A

Internal Code:

EXP_PRAG

Explorer vs Pragmatist

---

Explorer

Japanese:  
探検者

Description:

未知への好奇心を持ち、  
新しい可能性を追求する傾向。

Questions:

- 新しい挑戦
    
- 未知への反応
    
- 冒険心
    

---

Pragmatist

Japanese:  
現実主義者

Description:

現実性や実用性を優先し、  
安定した成果を求める傾向。

Questions:

- 安定性
    
- 実行可能性
    
- 現実判断
    

---

# Dimension B

Internal Code:

EMP_STR

Empath vs Strategist

---

Empath

Japanese:  
共感者

Description:

他者の感情や人間関係を重視する。

Questions:

- 共感
    
- 対人関係
    
- 感情理解
    

---

Strategist

Japanese:  
戦略家

Description:

感情よりも論理や最適解を重視する。

Questions:

- 論理判断
    
- 長期計画
    
- 効率性
    

---

# Dimension C

Internal Code:

REB_GUA

Rebel vs Guardian

---

Rebel

Japanese:  
反逆者

Description:

既存のルールや権威へ疑問を持ち、  
必要であれば変革を選ぶ。

Questions:

- 権威への反応
    
- 独立性
    
- 自由
    

---

Guardian

Japanese:  
守護者

Description:

秩序や共同体を維持することを重視する。

Questions:

- 責任感
    
- 安定性
    
- 組織意識
    

---

# Dimension D

Internal Code:

IDE_REA

Idealist vs Realist

---

Idealist

Japanese:  
理想主義者

Description:

信念や理想を優先する。

Questions:

- 信念
    
- 正義感
    
- 理想
    

---

Realist

Japanese:  
現実主義者

Description:

結果や実現可能性を優先する。

Questions:

- 現実判断
    
- 損益計算
    
- 実行可能性
    

---

# Mapping Rule

Dimension results are mapped into archetypes using:

docs/mapping.md

---

# Scoring Rule

Scores are calculated only by:

docs/scoring_engine.md

No other document may define scoring logic.

---

# Source of Truth

For any conflict:

1. scoring_engine.md
    
2. mapping.md
    
3. archetypes.md
    
4. rules.md
    

Higher priority documents override lower priority documents.