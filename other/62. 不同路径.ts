// !依然动态规划问题

export function uniquePath(m: number, n: number): number {
  const memo: number[][] = Array.from({ length: m }, (v, k) => {
    return Array.from({ length: n }, (e, j) => {
      if (k === 0) return 1;
      else if (j === 0) return 1;
      return 0;
    });
  });
  return uniquePathMemo(m - 1, n - 1, memo);

  function uniquePathMemo(m: number, n: number, memo: number[][]): number {
    if (memo[m][n] === 0) memo[m][n] = uniquePathMemo(m, n - 1, memo) + uniquePathMemo(m - 1, n, memo);
    return memo[m][n];
  }
}

console.log(uniquePath(5, 3));
