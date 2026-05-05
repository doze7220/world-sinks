# 仕様書

### 概要
本仕様は、HTML5 Canvas と JavaScript で実装されたパズルゲーム「世界沈没」の技術仕様書。コードベースの主要関数・データ構造・ゲームフロー・パラメータを明記する。

---

## 1. 主要定数（抜粋）
- **COLS** = `6` : フィールド列数  
- **ROWS** = `12` : 表示行数  
- **TOTAL_ROWS** = `200` : ワールド全行数  
- **SIZE** = `40` : 1セルのピクセルサイズ  
- **METERS_PER_ROW** = `10` : 1行あたりのメートル換算  
- **GOAL_METERS** = `200` : クリア目標（メートル）  
- **BLOCK_TYPES** = `4` : ブロック種類数  
- **RANDOM_SHAPE** = `true` : ブロック形状ランダム化  
- **LIMIT_HEIGHT** = `6` : 安全高度から積める上限行数  
- **WATER_SPEED** = `0.15` : 水位上昇速度（内部係数）  
- **BOMB_CHECK_INTERVAL** = `5` : 爆弾発生チェック間隔（秒）  
- **ANIM_GLOW_SEC** = `0.5`, **ANIM_CRACK_SEC** = `1.0` : 消去アニメ時間

---

## 2. データ構造
- **grid** : `Array[TOTAL_ROWS][COLS]`  
  - 値の型と意味：  
    - `0` : 空  
    - `1..BLOCK_TYPES` : ブロック色（数値）  
    - `{ type:'block', color, renderOffsetY, fallDelay, state?, timer? }` : ブロックオブジェクト  
    - `{ type:'bomb', timer, state?, crackTimer? }` : 爆弾オブジェクト  
    - `9` : 地面（底）
- **pair** : `{ x, y, rot, size, c[], rx, ry, rrot }` : 現在落下中のブロック群  
- **fallingBombs[]** : `[{ x, y, timer }]` : 落下中の爆弾（ワールド座標）  
- **particles[] / confetti[]** : エフェクト配列（位置・速度・寿命・色）  
- **state** : `"title" | "intro" | "playing" | "clear" | "gameover"`  
- **floodPhase** : `"none" | "blink" | "countdown"`

---

## 3. 主要関数と責務
- **createInitialGrid()** : ワールド初期化（底部2行を埋める）  
- **newPair()** : 新しい落下ペア生成（size 2〜4、色配列 `c`）  
- **getShapeOffsets(size, rot)** : 形状オフセット（回転対応）  
- **blocks(p)** : 論理座標のブロック配列を返す  
- **renderBlocks(p)** : 描画補間済み座標を返す（rx,ry,rrot使用）  
- **updatePairRender()** : 描画補間（rx,ry,rrot）を更新  
- **hit(bs)** : 衝突判定（視覚的トップを考慮）  
- **merge()** : `pair` を `grid` に統合、`applyLimit()` 呼び出し  
- **flagErase()** : DFS による同色グループ検出、4個以上で `state:'cracking'` を付与  
- **applyLimit()** : 高度制限超過ブロックの削除（`LIMIT_HEIGHT`）  
- **startCascade() / updateCascade(dt)** : カスケード（落下→消去→再落下）管理  
- **forceGravity() / setupGravity()** : 即時重力 / 落下アニメ準備  
- **startFloodGrace() / updateFloodGrace()** : 水没猶予（点滅→カウントダウン）管理  
- **startGameOver()** : ゲームオーバー遷移と演出開始  
- **update(dt)** : フレーム毎の状態更新（爆弾チェック・水位・ペア落下・cascade 等）  
- **draw() / drawRadar()** : メイン描画・レーダー描画

---

## 4. ゲームフロー（詳細）
1. **タイトル / Intro**：`state = "title"` → `intro` 表示（`INTRO_LINES` / `INTRO_CONTROLS`）  
2. **開始**：`resetGame()` → `state = "playing"`  
3. **落下フェーズ**：`pair` が生成され `drop` による時間で `pair.y++`。`hit()` で着地判定。  
4. **着地**：着地時に `merge()` → `pair = null` → `startCascade()`（または `setupGravity()`）  
5. **カスケード**：`fall_setup` → `falling` → `erase_setup` → `cracking` → `fall_setup/limit` の順で処理。  
6. **消去**：`flagErase()` が 4 連結以上を検出 → `state:'cracking'` を付与 → タイマー経過で消去・パーティクル発生。  
7. **高度更新**：`updateSafe()` で `safeLine` を再計算 → `heightMeters()` を算出。  
8. **水位判定**：`water` が `heightMeters()` を超えると `startFloodGrace()` → 点滅→カウントダウン→`startGameOver()`。  
9. **爆弾**：`BOMB_CHECK_INTERVAL` ごとに確率で `fallingBombs` を生成。着地で `grid` に `type:'bomb'` を置き、タイマーで爆発し周囲を破壊。  
10. **クリア**：`heightMeters() >= GOAL_METERS` で `state = "clear"` → 紙吹雪演出。

---

## 5. 入力仕様
- **Keyboard**  
  - `Space` : タイトル/イントロ/クリア/ゲームオーバーの進行（`spaceReleased` でデバウンス）  
  - `ArrowLeft` / `ArrowRight` : `pair.x-- / pair.x++`（移動後 `hit()` で戻す）  
  - `ArrowUp` : `pair.rot = (rot + 1) % 4`（ウォールキック `[-1,1,-2,2]` を試行）  
  - `ArrowDown` : `fast = true`（離すと `fast = false`）  
- **Touch（推奨実装）**  
  - 左右スワイプ：左右移動  
  - タップ：回転  
  - 下スワイプ：高速落下

---

## 6. 描画仕様（UI）
- **メインキャンバス**：左側プレイエリア（`OFFSET_X`）、右側レーダー（`RADAR_CANVAS_W`）  
- **ライン表示**：水位（青）、安全高度（白）、ゴール（黄）を画面上に描画  
- **レーダー**：ワールド全体の水位・安全高度・ゴール・カメラ範囲を縮尺表示（`radarYByMeters()` を使用）  
- **演出**：パーティクル（破壊）、confetti（クリア）、爆弾のフラッシュ・カウント表示

---

## 7. パフォーマンスと注意点
- **描画最適化**：`TOTAL_ROWS = 200` のため、描画・走査は表示範囲（`cameraY` ± margin）に限定することを推奨。  
- **型の一貫性**：`grid` のセルが数値とオブジェクトで混在しているため、判定箇所での型チェックが多い。将来的にセルを常にオブジェクト化すると可読性が向上。  
- **安全停止**：`MAX_CASCADE_STEPS` による無限ループ防止が実装済み。停止時はデバッグ出力を活用する。  
- **低スペック対策**：パーティクル・confetti の上限を設けるモードを用意する。

---

## 8. 拡張案（技術的）
- 難易度別パラメータ（`WATER_SPEED`, `BOMB_PROB_*`）を外部設定化（JSON）  
- シード固定のデバッグモード（乱数再現）  
- セーブ/ロード（到達高度、スコア）  
- モバイル最適化（タッチ、UIスケール）

