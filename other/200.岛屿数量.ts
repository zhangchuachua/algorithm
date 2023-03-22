const ignore = ["0", "2"];

// *还是比较简单的，就是遍历每个节点，如果遇到一个岛，就可以让岛的数量加1，然后立马去感染这个岛的其他地方；
function numIslands(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  function dfs(x: number, y: number) {
    if (ignore.includes(grid[x][y])) return;// 唯一注意的就是这里，注意不要死循环了；
    grid[x][y] = "2";
    if (x > 0) dfs(x - 1, y);
    if (y > 0) dfs(x, y - 1);
    if (y < n - 1) dfs(x, y + 1);
    if (x < m - 1) dfs(x + 1, y);
  }

  let count = 0;
  grid.forEach((arr, i) => {
    arr.forEach((item, j) => {
      if (grid[i][j] === "1") count++;
      dfs(i, j);
    });
  });

  return count;
}

const grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
];

console.log(numIslands(grid));

export {};
