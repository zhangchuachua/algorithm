// *473.火柴拼正方形 https://leetcode.cn/problems/matchsticks-to-square/  标签：位运算，数组，动态规划，回溯，状态压缩

// *这道题的难点在于：知道边长，但是如何选取对应的元素只和等于这个边长，每个元素还只能用一次。 官方提供的解法有回溯，和看不懂的 位运算 + 动态规划；目前只需要掌握回溯方法就可以了， 状态压缩已经属于比较高级的解法了。
export function makesquare(matchsticks: number[]): boolean {
  // *长度小于 4 直接返回
  if (matchsticks.length < 4) return false;
  // *求边的长度
  const edge = matchsticks.reduce((a, b) => a + b) / 4;
  // *如果是小数 那么直接返回false
  if (Math.floor(edge) !== edge) return false;
  // *最大的值大于边长时直接返回  false
  if (Math.max(...matchsticks) > edge) return false;
  // *排序，排序后先填充大的值，可以有效减少回溯的次数
  matchsticks.sort((a, b) => b - a);
  // 创建边
  const edges = new Array(4).fill(0);
  edges[0] = matchsticks[0];

  // 回溯函数
  function dfs(matchsticksIndex: number): boolean {
    // *当所有元素用完时返回 true，因为上面通过计算得出了边长，然后又在回溯过程中确定了 edges 中每条边 <= edge 所以能够执行到这一步时，那么就可以确定当前 edges 每条边都等于 edge 所以返回 true
    if (matchsticksIndex >= matchsticks.length) return true;
    // *循环每条边
    for (let i = 0; i < edges.length; i++) {
      // 当前边 + 当前的火柴长度
      edges[i] += matchsticks[matchsticksIndex];
      // *如果 edges[i] < 边长，那么进入下一次 dfs ，并且根据 dfs 的结果进行下一步处理
      if (edges[i] <= edge && dfs(matchsticksIndex + 1)) return true;
      // *如果上一步没有返回，那么说明 edges[i] > edge 或者 dfs(matchsticksIndex + 1) = false，那么说明，当前 edges[i] 虽然小于 edge 但是当前的加的方法，会导致后续结果不正确，比如 [5,5,5,5,4,4,4,4,3,3,3,3] -> 5 + 5 = 10 < 12 但是后面火柴棍不能得到 12 了。
      // *所以这里又减去 matchsticks[matchsticksIndex] 然后进入下一条边
      edges[i] -= matchsticks[matchsticksIndex];
    }
    return false;
  }

  return dfs(1);
}

// *剪枝优化 这里的解法进行了一些优化  参考了一下评论区老哥的思路
export function makesquareOptimization(matchsticks: number[]): boolean {
  // *长度小于 4 直接返回
  if (matchsticks.length < 4) return false;
  // *求边的长度
  const edge = matchsticks.reduce((a, b) => a + b) / 4;
  // *如果是小数 那么直接返回false
  if (Math.floor(edge) !== edge) return false;
  // *最大的值大于边长时直接返回  false
  if (Math.max(...matchsticks) > edge) return false;
  // *排序，排序后先填充大的值，可以有效减少回溯的次数
  matchsticks.sort((a, b) => b - a);

  // *这里并不像上面的方法，不断回溯四条边，不断填充四条边。 这里是回溯火柴棍长度，首先填满一条边，只要三条边都能够被填满，那么就说明可以构成正方形
  // flag 用来记录火柴棍是否被使用过，因为火柴棍只能使用一次
  function dfs(flag: boolean[], fullNum: number, currentIndex: number, sum: number): boolean {
    // *当填满三条边时直接返回 true
    if (fullNum >= 3) return true;
    // *sum 用于记录距离填满当前边还差多少，如果 sum 为 0 那么说明当前填满了，进入下一条边，所以 fullNum + 1, sum = edge
    if (!sum) return dfs(flag, fullNum + 1, 0, edge);

    // 这里循环的是火柴棍
    for (let i = currentIndex; i < matchsticks.length; ++i) {
      // 当前火柴棍使用过 跳过
      if (flag[i]) continue;
      // 如果当前火柴棍的长度大于 sum 跳过
      if (matchsticks[i] > sum) continue;
      // *将火柴棍标记为使用过
      flag[i] = true;
      // *进入递归，currentIndex + 1 , sum 也需要减去当前火柴棍的长度
      if (dfs(flag, fullNum, i + 1, sum - matchsticks[i])) return true;
      // *如果上面的结果为 false 那么说明使用的当前火柴棍无法构成正方形。所以不再使用该火柴棍 所以将 flag[i] 又切换为 false
      flag[i] = false;
      // !这里是剪枝的很重要一步，因为当前长度的火柴棍结果为 false，那么跳过该长度的火柴棍
      while (i + 1 < matchsticks.length && matchsticks[i + 1] === matchsticks[i]) i++;
    }
    return false;
  }

  return dfs(new Array(matchsticks.length).fill(false), 0, 0, edge);
}


// console.log(makesquareOptimization([13, 11, 1, 8, 6, 7, 8, 8, 6, 7, 8, 9, 8]))

// *这里是我理解错误写的方法，看了上面的优化解法，感觉还能够再优化一下，我想的是使用一个外循环，在循环中进行回溯，每次填满一个边，那么填满三个边就说明可以构成正方形。
// !但是外循环，就会导致已经无法回溯到之前已经填满的边。因为我以为只要一条边填满了，那么与其他的边就没有关系了，但是忽略了某些情况下只有固定搭配才能够得出正方形，比如说 [13, 11, 9, 8, 8, 8, 8, 8, 7, 7, 6, 6, 1] => [13, 6, 6], [9, 8, 8], [8, 8, 8, 1], [11, 7, 7] 但是在我下面的算法中就变成了 [13, 11, 1], [9, 8, 8] 然后剩下的怎么也填不满 25 了所以返回 false
// *之所以要使用回溯算法，就是为了列举每种可能，但是这里却忽略了哪种情况，是错误的。
export function makesquareOptimizationSelf(matchsticks: number[]): boolean {
  if (matchsticks.length < 4) return false;
  const edge = matchsticks.reduce((a, b) => a + b) / 4;
  if (Math.floor(edge) !== edge) return false;
  if (Math.max(...matchsticks) > edge) return false;
  matchsticks.sort((a, b) => b - a);

  const flag = new Array(matchsticks.length).fill(false);

  function dfs(sum: number): boolean {
    if (!sum) return true;

    for (let i = 0; i < matchsticks.length; i++) {
      if (flag[i]) continue;
      if (matchsticks[i] > sum) continue;
      flag[i] = true;
      if (dfs(sum - matchsticks[i])) return true;
      flag[i] = false;
      while (i < matchsticks.length && matchsticks[i + 1] === matchsticks[i]) i++;
    }
    return false;
  }

  for (let i = 0; i < 3; i++) {
    if (!dfs(edge)) return false;
  }

  return true;
}

console.log(makesquareOptimizationSelf([13, 11, 1, 8, 6, 7, 8, 8, 6, 7, 8, 9, 8]))


// *状态压缩解法，比较高级的解法，这是我找的题解，并不是我自己完成的
export function makesquareDP(matchsticks: number[]): boolean {
  const total = matchsticks.reduce((a, b) => a + b)// 累加
  if (total % 4 != 0) {// 如果不是4的倍数直接返回
    return false
  }
  const n = matchsticks.length, line = Math.floor(total / 4)
  const allPicked = (1 << n) - 1;// *位运算 假设 n = 5 那么 allPicked = 31 = 0b11111 一共有 5 位，就可以
  const dp = new Array(1 << n).fill(-1)
  dp[0] = 0
  for (let i = 0; i <= allPicked; i++) {
    for (let j = 0; j < n; j++) {
      if ((i >> j & 1) != 0) {
        const before = i & ~(1 << j)
        if (dp[before] >= 0 && matchsticks[j] + dp[before] <= line) {
          dp[i] = (dp[before] + matchsticks[j]) % line
        }
      }
    }
  }
  return dp[allPicked] == 0;
}

// console.log(makesquareDP([1, 2, 1, 2, 2]));