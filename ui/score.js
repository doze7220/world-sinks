// スコア管理用（現在は高度のみだが拡張用）
export let score = 0;

export function addScore(points) {
  score += points;
}

export function resetScore() {
  score = 0;
}
