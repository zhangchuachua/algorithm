// !动态规划题，相当是 62 不同路径 的另一个版本。

// *第一步：考虑数组元素的含义：这个题求的是最短的路径，那么数组中存的应该就是最短的路径。因为题目是一个网格，那么数组应该是一个二维数组。
// *第二步：考虑大问题与小问题之间的联系: 要取得到达 grid[m][n] 的最小路径，那么必然是 grid[m-1][n] grid[m][n-1] 中较小的哪一个路径加上 grid[m][n] 本身的路径。所以我们就要去求得 grid[m-1][n] grid[m][n-1] 较小的路径，然后依次递归，直到遇到初始值。
// *第三步：找出初始值，因为只能向下或者向右走，那么对于第一行和第一列都只能有一种方式到达， 第一行就只能向右，第一列就只能向下。 所以第一行，第一列的值应该是累加的，比如 [[1,2,3],[2,3,4]] 初始值应该是： [[1,3,6], [3,-1,-1]]
// * 可以使用迭代的方式， 力扣上就是使用的迭代的方式。    还可以进一步优化空间复杂度，我这种写法内存消耗很大，在力扣上只超过了 9% 的人。
export function minPathSum(grid: number[][]): number {
  // !typescript 中 this可以手动指定类型，但是必须要放在第一个。  我这里如果不手动指定的话，会一直报错，this有隐式的any类型。 然后 Array.from 的第三个函数就是第二个函数中的this指向。 然后如果使用  箭头函数的话那么这个this不会生效，而是指向更外面的this。 比如我内层的Array.from 使用的就是 箭头函数，this确实外层的this
  // *使用Array.from() 生成二维数组 运用到了第三个参数。
  const memory: number[][] = Array.from(grid, function (this: { firstRow: number, firstCol: number }, v, k) {
    return Array.from(grid[k], (e, j) => {
      if (k === 0) {
        if (j === 0) {
          (this as any).firstCol += e;
        }
        this.firstRow += e;
        return this.firstRow;
      } else if (j === 0) {
        this.firstCol += e;
        return this.firstCol;
      }
      return -1;
    });
  }, { firstRow: 0, firstCol: 0 });
  return minPathSumMemo(grid.length - 1, grid[0].length - 1, memory);

  // *没什么好说的，与之前的递归形式一样
  function minPathSumMemo(m: number, n: number, memo: number[][]): number {
    if (memo[m][n] === -1) memo[m][n] = Math.min(minPathSumMemo(m - 1, n, memo), minPathSumMemo(m, n - 1, memo)) + grid[m][n];
    return memo[m][n];
  }
}

console.log(minPathSum([[1, 2, 3], [2, 3, 4]]));
