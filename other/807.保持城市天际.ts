// !标签是贪心，但是我没有找到使用贪心实现的方案，或者说我也不确定我当前的实现是不是贪心，需要看一下解析~ 看过了解析，就是贪心，准确的来说是贪心的做法，但是我完全不了解。

// *这道题的思路还是很简单，这道题题目的字太多了，其实简单点来看，就是针对数组的每个元素，在保证不影响四个方向上“天际线”的前提下，能取到的最大值。在数组中看来，四个方向，其实就是横向和纵向，“天际线”就是横向和纵向的最大值。也就是说当前元素能取到的最大值，就是两个方向上的 最大值 中的 较小的一位。 比如说第一个元素为 3 ，横向最大值为 8，纵向最大值为 9，为了不影响天际线，这个元素的最大值只能为 8，因为需要横向纵向看上去 **不会超过原有的最大值**。 可以在数组中画图试一下。
// !时间复杂度为 O(n^2) 空间复杂度为 O(n);
export function maxIncreaseKeepingSkyline(grid: number[][]): number {
  let res = 0;
  // *因为 横向纵向的最大值，是固定的，所以我们可以使用变量进行存储，不需要每次在进行取值。
  const colMax: number[] = Array.from({ length: grid.length }); // *纵向最大值，初始化一个数组，数组不能纵向进行遍历，所以需要使用一个数组进行存储
  for (let i = 0; i < grid.length; i++) {
    const rowMax = Math.max(...grid[i]); // *横向的最大值，因为每次循环都是一行一行进行循环，所以只需要取得当前横向最大值就可以了。
    for (let j = 0; j < grid.length; j++) {
      if (!colMax[j]) {
        colMax[j] = getColMax(grid, j) as number; // *对当前纵向最大值进行赋值，写了一个简单的函数进行取值
      }
      // *对res进行操作 当前能取得的最大值 - 原有的值
      res += Math.min(rowMax, colMax[j]) - grid[i][j];
    }
  }

  function getColMax(grid: number[][], colIndex: number): number | undefined {
    let max: number | undefined;
    for (let col = 0; col < grid.length; col++) {
      const current = grid[col][colIndex];
      if (!max) max = current;
      else if (current > max) max = current;
    }
    return max;
  }

  return res;
}
