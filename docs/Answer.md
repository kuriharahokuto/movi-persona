# Answer Guide

このファイルは、各アーキタイプを検証目的で出力するための回答パターンです。

診断ロジックは `docs/scoring_engine.md` と `docs/mapping.md` に従います。  
Secondary Traits は結果演出用であり、アーキタイプ判定には使われません。

---

## 基本ルール

各Core Dimensionは4問ずつで構成されています。

| 質問 | Dimension | Aを選ぶと強くなる極 | Cを選ぶと強くなる極 |
|---|---|---|---|
| Q01-Q04 | EXP_PRAG | Explorer | Pragmatist |
| Q05-Q08 | EMP_STR | Empath | Strategist |
| Q09-Q12 | REB_GUA | Rebel | Guardian |
| Q13-Q16 | IDE_REA | Idealist | Realist |

確実に狙ったアーキタイプを出す場合は、BではなくAまたはCに統一してください。  
Bは中間回答であり、検証用の確定パターンには向きません。

---

## 16アーキタイプ回答一覧

| Archetype | 日本語名 | Q01 | Q02 | Q03 | Q04 | Q05 | Q06 | Q07 | Q08 | Q09 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dream Explorer | 夢追い人 | A | A | A | A | A | A | A | A | A | A | A | A | A | A | A | A |
| Wanderer | 放浪者 | A | A | A | A | A | A | A | A | A | A | A | A | C | C | C | C |
| Visionary Hero | 理想の英雄 | A | A | A | A | A | A | A | A | C | C | C | C | A | A | A | A |
| Seeker | 探究者 | A | A | A | A | A | A | A | A | C | C | C | C | C | C | C | C |
| Revolutionary | 革命家 | A | A | A | A | C | C | C | C | A | A | A | A | A | A | A | A |
| Rogue | アウトロー | A | A | A | A | C | C | C | C | A | A | A | A | C | C | C | C |
| Commander | 指揮官 | A | A | A | A | C | C | C | C | C | C | C | C | A | A | A | A |
| Adventurer | 冒険家 | A | A | A | A | C | C | C | C | C | C | C | C | C | C | C | C |
| Advocate | 代弁者 | C | C | C | C | A | A | A | A | A | A | A | A | A | A | A | A |
| Mediator | 調停者 | C | C | C | C | A | A | A | A | A | A | A | A | C | C | C | C |
| Guardian | 守護者 | C | C | C | C | A | A | A | A | C | C | C | C | A | A | A | A |
| Caretaker | 世話人 | C | C | C | C | A | A | A | A | C | C | C | C | C | C | C | C |
| Judge | 審判者 | C | C | C | C | C | C | C | C | A | A | A | A | A | A | A | A |
| Operator | 工作員 | C | C | C | C | C | C | C | C | A | A | A | A | C | C | C | C |
| Architect | 設計者 | C | C | C | C | C | C | C | C | C | C | C | C | A | A | A | A |
| Strategist | 軍師 | C | C | C | C | C | C | C | C | C | C | C | C | C | C | C | C |

---

## 軸ごとの見方

アーキタイプは以下4つの極の組み合わせで決まります。

| Archetype | EXP_PRAG | EMP_STR | REB_GUA | IDE_REA |
|---|---|---|---|---|
| Dream Explorer | Explorer | Empath | Rebel | Idealist |
| Wanderer | Explorer | Empath | Rebel | Realist |
| Visionary Hero | Explorer | Empath | Guardian | Idealist |
| Seeker | Explorer | Empath | Guardian | Realist |
| Revolutionary | Explorer | Strategist | Rebel | Idealist |
| Rogue | Explorer | Strategist | Rebel | Realist |
| Commander | Explorer | Strategist | Guardian | Idealist |
| Adventurer | Explorer | Strategist | Guardian | Realist |
| Advocate | Pragmatist | Empath | Rebel | Idealist |
| Mediator | Pragmatist | Empath | Rebel | Realist |
| Guardian | Pragmatist | Empath | Guardian | Idealist |
| Caretaker | Pragmatist | Empath | Guardian | Realist |
| Judge | Pragmatist | Strategist | Rebel | Idealist |
| Operator | Pragmatist | Strategist | Rebel | Realist |
| Architect | Pragmatist | Strategist | Guardian | Idealist |
| Strategist | Pragmatist | Strategist | Guardian | Realist |

---

## 例

### Rogueを出したい場合

Rogue は以下の組み合わせです。

| Dimension | 必要な極 | 回答 |
|---|---|---|
| EXP_PRAG | Explorer | Q01-Q04をA |
| EMP_STR | Strategist | Q05-Q08をC |
| REB_GUA | Rebel | Q09-Q12をA |
| IDE_REA | Realist | Q13-Q16をC |

したがって回答は以下です。

```text
Q01 A
Q02 A
Q03 A
Q04 A
Q05 C
Q06 C
Q07 C
Q08 C
Q09 A
Q10 A
Q11 A
Q12 A
Q13 C
Q14 C
Q15 C
Q16 C
```

---

## 注意

- この表は検証・デバッグ用です。
- 実際の診断体験では、ユーザーが自然に選んだ回答を使ってください。
- B回答を含めると、近い別タイプや分岐度の高い結果になることがあります。
- 同じ回答パターンでは必ず同じアーキタイプが出力されます。
