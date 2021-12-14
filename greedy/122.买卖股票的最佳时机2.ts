// !贪心算法  难度: medium
// !这道题也是一个动态规划题，

// *我的思路还是有问题，想到了一部分，但是实现的方式上还有问题。
export function maxProfit(prices: number[]): number {
  // * 这是我最开始的做法，很复杂，而且还是错的，虽然说也想到了遇到高的就卖出的操作，虽然不是在最低点卖出的，但是结果是一样的。（注意：这个数组不能排序，因为数组代表的是时间，我们不能对时间排序）
  // *我的做法是：遍历prices，过程中使用查找有没有大于 prices[i] 的，如果有就把prices[i]暂存在current中，然后让 i，等于大于current的元素的索引（还专门写了一个函数），使用count记录下当前差值。然后继续查找有没有大于prices[i]元素，继续上面的操作。    但是： [7,1,5,3,6,4]这个数组就出错了，这个数组的正确情况下需要 1买，5卖，3买，6卖 ，我是针对 [1,2,3,4,5] 这个数组，直接剩余数组中有大于当前元素的就使用current保留该值。 所以说我的结果是 1买，5卖，5买，6卖，结果为 5 。因为卖了5后，发现剩余数组中还有大于5的，所以我直接又买入了。但是在 [1,2,3,4,5] 这个数组就没问题。
  // let current;
  // let count = 0;
  // let i = 0;
  // while (i < prices.length) {
  //   if (current === undefined) {
  //     const result = hasMoreThan(prices, prices[i], i);
  //     if (result !== -1) {
  //       current = prices[i];
  //       i = result;
  //     }
  //   } else if (prices[i] > current) {
  //     count += prices[i] - current;
  //     const result = hasMoreThan(prices, prices[i], Number(i));
  //     if (result !== -1) {
  //       current = prices[i];
  //       i = result;
  //     }
  //   }
  //   console.log(current, count);
  //   i++;
  // }
  //
  // function hasMoreThan(nums: number[], target: number, start: number): number {
  //   return nums.slice(start + 1).findIndex(item => {
  //     return item > target;
  //   });
  // }
  //
  // return count;

  // !其实这道题根本不需要那么复杂，只需要遍历prices数组，然后与前一天作比较就可以了，如果前一天小于今天，那么我们就在前一天买入，今天卖出，这样就是稳定赚了，而且其实结果是一样的，与最低点买，最高点买一样，可以思考一下。
  let count = 0;
  for (let i in prices) {
    if (prices[Number(i) - 1] < prices[i]) {
      count += prices[i] - prices[Number(i) - 1];
    }
  }
  return count;
}

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));

// !动态规划解决问题 只是为了熟悉动态规划，但是使用贪心思路来解题是最好的。
// *还可以优化其空间复杂度，因为使用到的只是 [i-1][0,1]
// !通过这道题也学会了，定义数组，不一定都是看参数的维度，要结合实际来分析数组的维度。而且无论是哪个维度，数组的长度并不是固定的，可以根据题目定义不同的状态。 比如这道题，第二维数组长度为2。
// *第一步分析数组维度和数组元素含义，该数组应该是一个二维数组，因为涉及到了当前利润和是否持有股票两个方面（这个还是需要具体分析，我一开始也没有想到，还是看到了题解才明白过来的，而且因为这道题对于买卖次数没有限制，所以可以不用考虑买卖次数）。然后就是数组元素的含义：dp[i]表示第i天，dp[i][0]表示第i天不持有股票，dp[i][1]表示第i天持有股票。
// *第二步，分析数组每个元素之间的关系。也就是状态转移方程， dp[i][0]表示当前不持有股票，那么它的值应该有两种情况，前一天也不持有：dp[i-1][0]。前一天持有，但是今天卖出了: dp[i-1][1] + prices[i]; 应该取最大的哪一个，所以值为：max(dp[i-1][0], dp[i-1][1] + prices[i])。 那么 dp[i][1] 同理：前一天也持有：dp[i-1][1], 前一天不持有，今天买入，dp[i-1][0] - prices[i]; 同样取最大的值。 max(dp[i-1][1], dp[i-1][0] - prices[i]);
// !还有一个方面，我们最后返回结果，只需要返回 dp[i][0] 就是了，也就是返回最后一天不持有股票的情况，因为对于 [i-1] 天，只有两个情况，持有股票，或者不持有股票，如果不持有股票，最后一天还买入股票，不合理。 如果持有股票，最后一天必须要卖出，比如说 5 元购入，最后一天 1 元卖出，亏4元。但是如果不卖就亏 5 元。
// *第三步：初始值，当第一天时，如果不持有，那么 dp[0][0] = 0，如果买入，那么 dp[0][1] = -prices[0];
// !注意：在购买次数没有限制的情况下，上述的状态转移方程其实已经考虑所有的情况了，所以不管什么情况都可以套用上面的方程，比如说：[1,2,3,4,5] 贪心算法的做法是只要高于就会买入卖出，但是对于这里的情况，第1天时，dp[0][0] = 0, dp[0][1] = -1; 第二天时 dp[1][0] = 1，dp[1][1] = -1 第二天不持有股票，就是最大值应该是第一天持有股票，然后今天卖出，所以值为 1。 第二天持有股票，最大值应该是 -1，也就是前一天持有股票，如果我们再购入股票，就不满足max了，而且在这里也就避免了同时买入多只股票的情况，因为题目中明确规定不能这样。  以此类推：dp[2][0] = 2, dp[2][1] = -1;dp[3][0] = 3, dp[3][1] = -1;dp[4][0] = 4, dp[4][1] = -1; 得出结果为 4 这里看起来好像也是贪心算法每一天都进行买入卖出。但是其实不是的，这里就是第一天买入，最后一天进行卖出。
export function maxProfitDP(prices: number[]): number {
  const dp: [number, number][] = Array.from({ length: prices.length }, (v, i) => {
    if (i === 0) return [0, -prices[0]];
    return [0, 0];
  });// *初始化数组，第二维数组长度为2.s

  for (let i = 1; i < dp.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]); // *状态转移方程
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[prices.length - 1][0];// *只需要返回最后一天不持有股票的情况。
}

console.log(maxProfitDP([1, 2, 3, 4, 5]));


// *对于更多的此类问题，https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/mai-mai-gu-piao-wen-ti-by-chen-wei-f-gc4k/ 可以看这个题解，定义了三维数组，一个状态转移方程解决全部此类问题。
