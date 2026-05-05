# =========================================
# 人間AIプロジェクト：安全リファクタリング指示書
# Human-AI Project: Safe Refactoring Spec
# =========================================

# =========================================
# ■ 日本語版
# =========================================

## ■ 目的
本プロジェクトは、1800行以上のHTML/JSゲームを安全にモジュール分割し、
データ駆動・ステージ差し替え可能な構造へ移行することを目的とする。

重要：
- ゲーム挙動は一切変更しない
- 改善ではなく「構造分解」が目的
- ロジック変更は禁止

---

## ■ 全体設計思想

### ① 責務分離
以下を完全に分離する：

- 行動（AI）
- 表現（描画）
- 情報（UI）
- データ（テキスト・設定）
- 環境（ステージ）
- メタ情報（バージョン・履歴）

---

### ② データ駆動設計
- セリフやパラメータはコードから排除
- 外部データで制御
- AIは状態コードのみ出力

---

### ③ ステージ差し替え構造
- 同一AIで複数ゲーム性を実現
- ステージは数値＋テキスト差し替え
- ロジックは共通エンジンとして固定

---

## ■ 最終フォルダ構成

/index.html

/core/
  gameLoop.js
  stateManager.js
  config.js

/entities/
  human.js
  block.js

/world/
  world.js
  collapse.js

/render/
  renderer.js
  spriteCache.js
  zOrder.js

/ui/
  text_system.js
  score.js

/text/
  human_text_jp.js
  human_text_us.js
  human_text_base.js

/stage/
  stage_jp.js
  stage_us.js
  stage_loader.js

/data/
  constants.js
  rules.js

/meta/
  version.js
  changelog.js
  buildInfo.js

---

## ■ 各レイヤー責務

### core
ゲーム全体制御・ループ管理

### entities
AIと物理オブジェクトの挙動のみ

### world
地形・崩壊などの環境

### render
描画専用（ロジック禁止）

### ui
スコア・UI表示

### text
セリフデータのみ（ロジック禁止）

### stage
ゲーム性パラメータ

### data
物理・ルールの固定定数

### meta
バージョン・履歴・ビルド情報（ゲーム非依存）

---

## ■ textシステムルール

- human.jsは状態コードのみ出力
- テキストは外部辞書で解決

例：
FALL / CLIMB / DROWN / IDLE

---

## ■ stageルール

- 数値パラメータのみ
- テキストセット指定のみ
- 行動ロジック禁止

---

## ■ metaルール

- version.js：バージョン管理
- changelog.js：変更履歴（ソース内から移設）
- buildInfo.js：ビルド情報

禁止：
- ゲームロジック混入
- stage/dataとの統合

---

## ■ 絶対禁止ルール

- human.jsにセリフを書く
- renderにゲームロジックを書く
- stageにif分岐を入れる
- textに処理ロジックを書く
- metaをゲームロジックに利用する

---

## ■ 成功条件

- ゲーム挙動が完全一致
- 物理・速度・ランダム性変化なし
- UI崩壊なし
- AI挙動変化なし

---

## ■ 失敗条件

- 挙動変化
- 機能欠落
- UI崩壊
- ランダム性変化

---

## ■ 最終目標

- 完全モジュール化
- データ駆動化
- ステージ差し替え構造
- 行動と表現の完全分離
- メタ情報の完全分離

---

# =========================================
# ■ English Version
# =========================================

## ■ Purpose
This project aims to safely modularize a 1800+ line HTML/JS game
into a fully data-driven architecture with stage-swappable design.

Important rules:
- Game behavior must NOT change
- This is structural refactoring only
- No logic changes allowed

---

## ■ Core Design Principles

### ① Separation of Concerns
Strict separation of:

- Behavior (AI)
- Rendering (visuals)
- UI (interface)
- Data (text/config)
- World (stage/environment)
- Meta information (version/history/build)

---

### ② Data-Driven Design
- No dialogue inside code
- External data controls all text and parameters
- AI outputs only state codes

---

### ③ Stage-Swappable Architecture
- Same AI, multiple game variations
- Stage defines parameters only
- Core engine remains fixed

---

## ■ Final Folder Structure

/index.html

/core/
  gameLoop.js
  stateManager.js
  config.js

/entities/
  human.js
  block.js

/world/
  world.js
  collapse.js

/render/
  renderer.js
  spriteCache.js
  zOrder.js

/ui/
  text_system.js
  score.js

/text/
  human_text_jp.js
  human_text_us.js
  human_text_base.js

/stage/
  stage_jp.js
  stage_us.js
  stage_loader.js

/data/
  constants.js
  rules.js

/meta/
  version.js
  changelog.js
  buildInfo.js

---

## ■ Layer Responsibilities

### core
Main game loop and state control

### entities
AI behavior and object logic only

### world
Environment and collapse system

### render
Rendering only (NO logic allowed)

### ui
Score and interface display

### text
Pure dialogue data (NO logic)

### stage
Game balancing parameters only

### data
Global constants and rules

### meta
Versioning, changelog, build metadata (non-game logic)

---

## ■ Text System Rules

- human.js outputs ONLY state codes

Example:
FALL / CLIMB / DROWN / IDLE

- Text is resolved externally via dictionaries

---

## ■ Stage Rules

- Numeric parameters only
- Text pack selection only
- No behavior logic allowed

---

## ■ Meta Rules

- version.js → version control
- changelog.js → moved from source history
- buildInfo.js → build/debug info

STRICT RULE:
- Must NOT affect gameplay logic
- Must NOT be used by AI behavior

---

## ■ Absolute Forbidden Rules

- No dialogue inside human.js
- No game logic inside render
- No branching inside stage
- No logic inside text files
- No gameplay dependency on meta

---

## ■ Success Criteria

- Identical gameplay behavior
- No physics or timing changes
- No UI breaking
- No AI behavior deviation

---

## ■ Failure Criteria

- Any behavior change
- Missing features
- UI corruption
- Randomness changes

---

## ■ Final Goal

- Fully modular architecture
- Data-driven text system
- Stage-swappable design
- Complete separation of behavior and presentation
- Meta-layer isolation