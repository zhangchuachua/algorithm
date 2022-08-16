// *1263. 推箱子；难度为：hard；标签：数组，BFS，堆；链接：https://leetcode.cn/problems/minimum-moves-to-move-a-box-to-their-target-location/

// TODO 未完成
export function minPushBox(grid: string[][]) {
  let T;
  let B;
  let S;
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      switch (grid[i][j]) {
        case 'T':
          T = [i, j];
          break;
        case 'B':
          B = [i, j];
          break;
        case 'S':
          S = [i, j];
          break;
        default:
          continue;
      }
      if (T && B && S) {
        break;
      }
    }
  }
  return [T, B, S];
};

console.log(minPushBox([["#", "#", "#", "#", "#", "#"],
  ["#", "T", ".", ".", "#", "#"],
  ["#", ".", "#", "B", ".", "#"],
  ["#", ".", ".", ".", ".", "#"],
  ["#", ".", ".", ".", "S", "#"],
  ["#", "#", "#", "#", "#", "#"]]))