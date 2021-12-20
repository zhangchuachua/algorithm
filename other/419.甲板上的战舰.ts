// *这道题读了半天没有搞懂意思啊，其实意思不是叫我们自己填充战舰，而是甲板上已经有战舰了，我们需要计算出战舰的数量而已。

// *时间复杂度为 O(m*n) 因为数组大小为 m * n 因为 aroundHasX 中的循环次数是固定的。 空间复杂度为 o(1)
// *解题思路也比较简单，就是遍历数组，遇到 X 就去判断它周围还有没有 X 如果它上下左右四个方位有 X 的话，就表示是同一艘战舰。如果确定是战舰了，就把他修改为 Y 遇到 Y 的时候会直接跳过。然后在使用一个变量来计算数量就可以了。
export function countBattleships(board: string[][]): number {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // *遍历数组
      if (board[i][j] === "X" && !aroundHasX(i, j)) {
        // *遇到 X 就判断它的上下左右，如果上下左右都为空，那么说它是还没有计入的战舰，就 sum ++ 然后把它标记为已经计入的战舰。
        sum++;
        board[i][j] = "Y";
      }
    }
  }

  function aroundHasX(i: number, j: number) {
    // 函数用于判断当前 X 是否是已经计入的战舰
    let arr = [
      // *四个方位的索引值
      [i, j - 1],
      [i, j + 1],
      [i - 1, j],
      [i + 1, j],
    ];
    let tmp = false;
    arr.forEach(([x, y]) => {
      if (board?.[x]?.[y] === "Y") {
        // *如果有一个方位被记入了，那么说明当前战舰已经被记入了
        tmp = true;
        board[i][j] = "Y";
      }
    });
    return tmp;
  }

  return sum;
}

// *思路类似，但是这个的优化更好，  官方做法
export const countBattleshipsOfficial = function (board: string[][]): number {
  const row = board.length;
  const col = board[0].length;
  let ans = 0; // *依然使用变量计数
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      if (board[i][j] === "X") {
        // 如果当前为 X
        board[i][j] = "."; // *这里计数后 变为 '.' 不是 Y
        // *因为题中说了，战舰只可能是横向或纵向连续的 所以这里分为两个for循环，遍历横向和纵向，如果遇到 X 就修改为 '.'
        // !这样循环的话，不需要数组存储四个方位，而且按照情况进行循环，循环次数更少。
        for (let k = j + 1; k < col && board[i][k] === "X"; ++k) {
          board[i][k] = ".";
        }
        for (let k = i + 1; k < row && board[k][j] === "X"; ++k) {
          board[k][j] = ".";
        }
        // 加入计数
        ans++;
      }
    }
  }
  return ans;
};

// TODO 题中还要求能不能一次扫描算法，只使用 O(1) 然后不修改甲板的值。
