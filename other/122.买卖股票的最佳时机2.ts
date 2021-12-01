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

console.log(maxProfit([7, 1, 5, 3, 6, 4]));

// !动态规划解决问题 只是为了熟悉动态规划，但是使用贪心思路来解题是最好的。
export function maxProfitDP(prices: number[]): number {

}
