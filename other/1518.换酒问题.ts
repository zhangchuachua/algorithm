// !一个简单的递归

// *难度为简单，没啥说的
export function numWaterBottles(numBottles: number, numExchange: number): number {
  let sum = 0;
  let emptyBottle = 0;

  function numWaterBottlesOneTimes(num: number) {
    sum += num;
    if (num + emptyBottle < numExchange) return;
    const exchange = Math.floor((num + emptyBottle) / numExchange);
    emptyBottle = (num + emptyBottle) % numExchange;
    numWaterBottlesOneTimes(exchange);
  }

  numWaterBottlesOneTimes(numBottles);
  return sum;
}

console.log(numWaterBottles(15, 4));

// *这道题还可以直接使用数学计算的方式直接得出答案。
// !第一步，首先，我们拥有 b 瓶酒，那么一定能喝到这 b 瓶酒
// !第二步，用空酒瓶来换酒，换完再喝，喝完再换，每次换到一瓶酒意味着多一个空酒瓶，每次损失的瓶子为：e - 1（假设需要 e 个空瓶换一瓶酒），假设我们一共可以换 n 次酒瓶，列出式子为：b - n(e-1) < e 解出来 n 的值，就是最多能换多少次酒瓶。 n > (b - e) / (e - 1) 也就是说 n 最小为 (b - e) / (e - 1) + 1 最后再加上，
export function numWaterBottlesMath(numBottles: number, numExchange: number): number {
  return numBottles >= numExchange ? Math.floor((numBottles - numExchange) / (numExchange - 1)) + 1 + numBottles : numBottles;
}
