# Villain Diagnosis

Version: 2.0

## Status

Coming Soon

Villain Diagnosis is not included in Phase 1 MVP as an active diagnosis flow.
The current implementation displays a sequel-style preview on the MOVI Persona result page.

---

## Core Decision

Villain Diagnosis must be designed as an independent diagnosis.

It may use the protagonist result as a sequel hook, but the final Villain Diagnosis should not require the user to complete MOVI Persona first.

### Supported Entry Modes

#### 1. Sequel Mode

User completes MOVI Persona first.

Flow:

1. User receives protagonist result.
2. Result page displays Villain Diagnosis preview.
3. The preview copy uses the protagonist type as emotional context.
4. When Villain Diagnosis is released, the user can start from this page.
5. If protagonist result exists locally, it may be used as optional context.

Use case:

- Stronger narrative continuity
- Better conversion from free protagonist diagnosis to paid villain diagnosis
- Feels like a sequel movie

#### 2. Standalone Mode

User starts Villain Diagnosis directly.

Flow:

1. User opens Villain Diagnosis landing page.
2. User answers villain-specific questions.
3. Scoring uses dark parameters and villain archetypes directly.
4. No protagonist result is required.

Use case:

- New users can buy or try Villain Diagnosis directly.
- SNS links to Villain Diagnosis work without forcing the protagonist flow.
- Paid product can stand alone.

### Rule

The protagonist result is optional context, not a required input.

---

## Concept

MOVI Persona is the first movie.

Villain Diagnosis is the sequel.

The protagonist creates a story through choices.
However, every protagonist has the possibility of falling.

Villain Diagnosis explores the question:

> What would happen if your belief went too far?

This is not a simple inversion of the protagonist archetype.
It is a separate diagnosis designed around darker psychological parameters.

---

## Result Page Placement

The Coming Soon section is displayed near the bottom of the protagonist result page.

Recommended protagonist result page order:

1. Protagonist result
2. Trailer report
3. Character overview
4. Behavioral analysis
5. Recommended movies
6. Compatibility / allies
7. End roll / sharing
8. Villain Diagnosis Coming Soon

The section should feel like a sequel trailer after the end roll, not like a feature advertisement.

---

## Visual Theme

### Protagonist Diagnosis

- Gold: `#D4AF37`
- Black background

### Villain Diagnosis

- Deep Red: `#B22222`
- Crimson: `#8B0000`
- Black background

Gold must not be used as the main accent in Villain Diagnosis UI.
The visual tone should feel premium and dangerous, not horror-like.

---

## Copy Direction

### Eyebrow

`NEXT MOVIE`

or

`COMING SOON`

### Main Copy

```text
あなたの中に眠るヴィランは誰だ？

信念は、時に世界を救う。

そして時に、世界を壊す。

もしあなたが主人公ではなくなったら、

どんなヴィランになるだろう。
```

### Trailer Card Copy

```text
COMING SOON

VILLAIN PERSONALITY DIAGNOSIS

主人公は終わった。

次は、

あなたの闇が主役になる。
```

### Disabled Button

```text
ヴィラン診断を待つ
```

The button is disabled in the current MVP.

---

## Protagonist To Villain Preview Map

These examples are preview copy for the sequel hook.
They do not define the final Villain Diagnosis scoring model.

| Protagonist Archetype | Villain Preview | Japanese Name | Description                     |
| --------------------- | --------------- | ------------- | ------------------------------- |
| Dream Explorer        | Abyss Walker    | 深淵を歩く者        | 未知への探究が、深淵への執着へ変わった者            |
| Wanderer              | Hollow Drifter  | 空虚な漂流者        | どこにも属さない自由が、すべてを拒む孤独へ変わった者      |
| Visionary Hero        | False Messiah   | 偽りの救世主        | 未来を信じる力が、自分だけが世界を救えるという妄信へ変わった者 |
| Seeker                | Truth Eater     | 真実を喰らう者       | 真実への渇望が、人の希望まで暴く冷酷さへ変わった者       |
| Revolutionary         | Firestarter     | 火を放つ者         | 変革への意志が、燃やし尽くす破壊衝動へ変わった者        |
| Rogue                 | Anarchist       | 無秩序の使徒        | 自由への渇望が、秩序そのものを憎む破壊へ変わった者       |
| Commander             | Conqueror       | 征服者           | 人を導く力が、勝利だけを追い続ける支配へ変わった者       |
| Adventurer            | Daredevil       | 破滅の挑戦者        | 可能性を切り拓く勇気が、危険そのものへの依存へ変わった者    |
| Advocate              | Fanatic         | 狂信者           | 信念の強さが、異なる声を焼き払う正義の暴走へ変わった者     |
| Mediator              | Appeaser        | 沈黙の調停者        | 対立を恐れる優しさが、真実を隠す欺瞞へ変わった者        |
| Guardian              | Warden          | 監獄の守護者        | 守りたい想いが、自由を奪う管理へ変わった者           |
| Caretaker             | Martyr          | 殉教者           | 支えたい想いが、自己犠牲を他者にも強いる救済へ変わった者    |
| Judge                 | Inquisitor      | 断罪者           | 公平さへのこだわりが、例外を許さない断罪へ変わった者      |
| Operator              | Cleaner         | 掃除屋           | 結果を出す力が、感情も痕跡も消す冷徹さへ変わった者       |
| Architect             | Overseer        | 監視設計者         | 未来を設計する力が、世界を管理する独裁へ変わった者       |
| Strategist            | Manipulator     | 操者            | 先を読む力が、人を駒として扱う支配へ変わった者         |

---

## Villain Diagnosis Should Not Depend On Protagonist Diagnosis

### Reason

If Villain Diagnosis requires MOVI Persona first, the paid feature has several weaknesses:

- New users cannot enter directly from SNS.
- Paid conversion requires two diagnosis flows.
- Users who already took the protagonist diagnosis may not repeat the flow.
- Marketing becomes harder because Villain Diagnosis cannot stand alone.
- The villain result becomes predictable if it is only a dark version of the protagonist result.

### Recommended Architecture

Villain Diagnosis should have its own:

- Landing page
- Question set
- Scoring model
- Result page
- Share card
- Paid unlock flow in the future

Protagonist Diagnosis can pass optional context if available.

Example:

```ts
type VillainEntryContext = {
  entryMode: 'standalone' | 'sequel'
  protagonistType?: ProtagonistArchetype
  protagonistScores?: ProtagonistScores
}
```

The villain scoring engine must still work when `protagonistType` is undefined.

---

## Future Diagnosis Model

Villain Diagnosis uses dark parameters, not just protagonist axes.

### Dark Parameters

| Parameter | Japanese Label | Meaning |
|---|---|---|
| Obsession | 執着 | 目的や対象を手放せない傾向 |
| Desire for Control | 支配欲 | 状況や人を管理したい傾向 |
| Need for Recognition | 承認欲求 | 認められたい、特別でありたい傾向 |
| Revenge Drive | 復讐心 | 傷や裏切りに対して報復へ向かう傾向 |
| Lack of Empathy | 共感欠如 | 他者の痛みより目的を優先する傾向 |
| Idealism Run Wild | 理想主義の暴走 | 理想のために犠牲を正当化する傾向 |
| Tolerance for Loneliness | 孤独耐性 | 孤独でも目的を進められる傾向 |
| Nihilism | 虚無 | 意味や秩序への不信が強い傾向 |

---

## Villain Archetype Scoring

Villain result should be decided by direct scoring against villain archetypes.

Each villain archetype has a target profile.

### Villain Archetype Profiles

| Villain | Core Parameters |
|---|---|
| Abyss Walker | Obsession, Tolerance for Loneliness, Nihilism |
| Hollow Drifter | Nihilism, Tolerance for Loneliness, Lack of Empathy |
| False Messiah | Need for Recognition, Idealism Run Wild, Desire for Control |
| Truth Eater | Obsession, Lack of Empathy, Nihilism |
| Firestarter | Revenge Drive, Idealism Run Wild, Obsession |
| Anarchist | Nihilism, Revenge Drive, Lack of Empathy |
| Conqueror | Desire for Control, Need for Recognition, Lack of Empathy |
| Daredevil | Obsession, Nihilism, Revenge Drive |
| Fanatic | Idealism Run Wild, Obsession, Lack of Empathy |
| Appeaser | Desire for Control, Fear of Conflict, Lack of Honesty |
| Warden | Desire for Control, Idealism Run Wild, Obsession |
| Martyr | Need for Recognition, Obsession, Idealism Run Wild |
| Inquisitor | Idealism Run Wild, Lack of Empathy, Desire for Control |
| Cleaner | Lack of Empathy, Desire for Control, Tolerance for Loneliness |
| Overseer | Desire for Control, Obsession, Lack of Empathy |
| Manipulator | Desire for Control, Lack of Empathy, Need for Recognition |

Additional internal parameters may be added later if needed.

---

## Question Design Direction

Villain questions should be different from protagonist questions.

Protagonist Diagnosis asks:

> How do you move the story forward?

Villain Diagnosis asks:

> What do you justify when you are wounded, cornered, ignored, or betrayed?

The questions should test:

- What the user cannot forgive
- What the user tries to control
- What the user sacrifices first
- Whether the user seeks recognition, revenge, order, truth, freedom, or rescue
- How the user reacts when people do not understand them
- Whether the user protects ideals, people, ego, truth, or power

### Example Question

```text
ACT 1 / The Wound

あなたの功績は、別の人物のものとして称えられた。

仲間は沈黙し、真実を知る者も口を閉ざしている。

あなたの中で、何かが静かに軋む。

どうする？
```

Options:

```text
A. 真実を明らかにする。誰が傷ついても構わない。
B. 今は笑って受け流す。だが、この借りは必ず返す。
C. 誰にも期待しない。次からは、自分だけで進む。
```

Scoring example:

- A: Obsession +2, Idealism Run Wild +1
- B: Revenge Drive +2, Need for Recognition +1
- C: Tolerance for Loneliness +2, Nihilism +1

---

## Question Count

Recommended MVP:

- 12 questions minimum
- 16 questions preferred if consistency with protagonist diagnosis is important

For paid Villain Diagnosis, 16 questions is better because it feels more substantial.

---

## Result Page Direction

Villain result should mirror protagonist result UI, but use red accents.

### Required Result Sections

1. Your Villain Movie
2. Villain Archetype
3. Villain Motto
4. Fall Trigger
5. Dark Strength
6. Fatal Weakness
7. Final Scene
8. Redemption Route
9. Opposing Protagonist Type
10. Share Card

### Example

```text
あなた主演の闇映画

灰の王冠

救うはずの世界を、
自分の形に作り変える者。

ヴィランタイプ
Overseer / 監視設計者

堕ちる引き金
誰も未来を見ようとしないと感じた時。

闇の強み
長期的な構造を読み、世界そのものを設計できる。

致命的な弱点
人を設計図の一部として見始める。

救済ルート
未来を設計する前に、誰かの現在を聞くこと。
```

---

## Paid Feature Direction

Villain Diagnosis may become a paid sequel feature.

Current MVP rules:

- Do not show price
- Do not show payment UI
- Do not add checkout
- Do not add authentication
- Do not add API or DB
- Display Coming Soon only

Future paid copy should use movie-series framing such as:

```text
続編を解放する
```

Possible paid structure:

Free preview:

- Villain type name
- One-line copy
- Locked result card

Paid unlock:

- Full villain report
- Fall trigger
- Dark strength
- Fatal weakness
- Redemption route
- Opposing protagonist type
- Share card

---

## Security And Privacy

Current Coming Soon section:

- Does not collect user input
- Does not send data externally
- Does not call external APIs
- Does not require authentication
- Does not store additional data

Future Villain Diagnosis must continue to follow the security policy defined in `docs/security.md`.

---

## MVP Implementation Scope

Implemented now:

- Result page Coming Soon section
- Sequel-trailer style copy
- Crimson visual theme
- Disabled waiting button
- Limited protagonist-to-villain preview examples

Not implemented now:

- Villain questions
- Villain scoring engine
- Villain result page
- Payment
- Authentication
- Server processing
- External API integration

---

## Implementation Notes For Codex

1. Update `villain.md` with this specification.
2. Expand protagonist-to-villain preview examples from 8 to all 16 protagonist archetypes.
3. Keep Coming Soon section disabled.
4. Do not add payment implementation yet.
5. Do not require protagonist result for future Villain Diagnosis.
6. Prepare data structures so standalone Villain Diagnosis can be implemented later.
7. Keep UI red-themed and separate from protagonist gold theme.
