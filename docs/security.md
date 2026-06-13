# Security Policy

Version: 1.0

# セキュリティポリシー

MOVI Persona プロジェクトにおける  
セキュリティ方針を定義する。

本ドキュメントは

- 開発者
    
- AIエージェント（Codex等）
    
- 将来の共同開発者
    

が参照する公式仕様書である。

---

# Security First Principle

## 基本方針

機能追加よりもセキュリティを優先する。

新機能は以下を満たすこと。

- 個人情報を漏洩しない
    
- APIキーを公開しない
    
- 認証を回避できない
    
- 他人のデータへアクセスできない
    

---

# MVP Security Rules

## 初期バージョン方針

MVPでは

- ログイン機能なし
    
- 個人情報収集なし
    
- データベースなし
    

を原則とする。

診断はブラウザ内で完結する。

---

目的

攻撃対象を最小化するため。

---

# API Policy

## API利用方針

Phase1では外部AI APIを使用しない。

禁止

- OpenAI API
    
- Claude API
    
- Gemini API
    

を前提とした必須機能

---

許可

純粋なフロントエンド処理

- スコア計算
    
- タイプ判定
    

---

目的

コスト削減

攻撃面削減

情報漏洩防止

---

# Secret Management

## 秘密情報管理

絶対禁止

APIキーをコードへ直接記述すること。

禁止例

const SECRET_VALUE = "xxxxx"

---

許可

環境変数

.env

.env.local

---

Git管理禁止

.env

.env.local

.env.production

---

AIエージェントへの指示

Never hardcode secrets.

Never expose API keys to frontend code.

Use environment variables.

---

# Authentication Policy

## 認証ポリシー

認証機能は自作しない。

---

禁止

独自ログインシステム

独自パスワード管理

独自セッション管理

---

推奨

- Clerk
    
- Supabase Auth
    
- Firebase Auth
    
- Auth0
    

---

理由

認証は最も攻撃されやすい領域であるため。

---

# Authorization Policy

## アクセス制御

全てのユーザーデータは所有者のみ閲覧可能とする。

---

禁止例

/user/123

↓

/user/124

へ変更すると他人の情報が閲覧できる

---

全てのデータ取得時に

認証

所有権確認

を行う。

---

# Password Policy

## パスワード方針

将来認証を導入する場合

パスワードは保存しない。

認証プロバイダーへ委任する。

---

禁止

平文保存

独自暗号化

---

# Data Classification

## データ分類

### Public

公開可能

- 診断ロジック
    
- 質問
    
- アーキタイプ情報
    

---

### Internal

内部情報

- 分析データ
    
- 管理設定
    

---

### Private

個人情報

- メールアドレス
    
- 映画履歴
    
- 診断履歴
    
- レビュー
    

---

Private情報は最小限しか保存しない。

---

# Data Minimization

## 最小収集原則

必要なデータのみ収集する。

収集しないもの

- 住所
    
- 電話番号
    
- 生年月日
    

---

収集する場合

理由を明確化する。

---

# Logging Policy

## ログ管理

ログに保存禁止

- パスワード
    
- APIキー
    
- トークン
    
- クレジットカード情報
    

---

許可

- エラー内容
    
- システムイベント
    

---

# OWASP Compliance

## OWASP Top10 準拠

以下を最低限の対策対象とする。

### A01

Broken Access Control

アクセス制御不備

---

### A03

Injection

インジェクション攻撃

---

### A04

Insecure Design

危険な設計

---

### A05

Security Misconfiguration

設定ミス

---

### A07

Authentication Failures

認証不備

---

### A09

Logging Failures

監査ログ不足

---

# AI Security

## AI機能導入時

将来的に

AI分析

AIレビュー補助

AI推薦

を実装する場合

OWASP LLM Top 10を参照する。

---

対象

Prompt Injection

Data Leakage

Model Abuse

Excessive Agency

---

# Content Security

## コンテンツ管理

ユーザー投稿は信頼しない。

全ての入力値を検証する。

---

対策

- XSS対策
    
- HTMLサニタイズ
    
- Markdownサニタイズ
    

---

# Copyright Policy

## 著作権ポリシー

映画作品の権利を尊重する。

---

許可

映画タイトル

公開年

監督名

ジャンル

短い紹介文

---

要確認

ポスター画像

公式画像

公式ロゴ

---

禁止

映画本編映像保存

大量のセリフ転載

大量のレビュー転載

---

# AI Generated Content

## AI生成画像

利用可能

---

条件

完全オリジナル

---

禁止

既存映画キャラクター模倣

著名キャラクター再現

著作権侵害となる生成

---

# Dependency Policy

## ライブラリ管理

利用ライブラリは最小限にする。

定期的に

- npm audit
    
- dependency review
    

を実施する。

---

# Incident Response

## インシデント対応

情報漏洩が発覚した場合

1. 機能停止
    
2. 原因調査
    
3. 影響範囲特定
    
4. 修正
    
5. 再発防止策策定
    

---

# Security Review Checklist

リリース前に確認

□ APIキー漏洩なし

□ 認証回避不可

□ 他人のデータ閲覧不可

□ XSS対策済み

□ OWASP確認済み

□ 著作権確認済み

□ ログへ機密情報なし

□ 使用ライブラリ確認済み

---

# Rule For AI Agents

Security requirements are mandatory.

Security requirements override convenience.

If a feature conflicts with this document,  
security requirements take priority.

---

# Final Principle

ユーザーの信頼は  
どんな機能よりも重要である。

便利さのために  
セキュリティを犠牲にしない。
