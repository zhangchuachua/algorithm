// *leetcode 29 两数相除，在不使用乘法，除法，取模的情况下求的两数相除的结果
// const MAX = 2147483647; // 2^31 - 1
// const MIN = -2147483648; // -2^31
// *开始看到这道题，以为使用位运算做的，结果发现位运算里面太多的循环，导致并不能通过测试
// *除法的定义其实非常简单，比如 10 / 3 = x => 3x = 10 => x + x + x = 10 所以我们只需要循环执行 +除数 操作，直到和大于或者小于被除数时，就可以得到当前的商。当然使用减法也是可以的。 这就是暴力求解的做法
// !但是单纯的循环执行 +除数 操作非常耗时，所以需要对步长进行调整，每一次相加如果小于被除数，那么就将步长加一，如果大于被除数了就调整步长为 0 再次重复上述操作，直到相加结果大于被除数，并且步长为0
// *比如 16 / 3 第一次 +3, 第二次 +6，第三次 +12 因为第三次的结果已经大于 16 了所以我们需要调整为步长，第四次 +3，第五次 +6 因为第五次又超过了被除数，所以再次调整步长，第六次 +3 第七次 +6 又超过了被除数，再次调整步长 第八次 +3 依旧超过了被除数，并且步长为 0 所以直接返回商
export default function divide(dividend: number, divisor: number): number {
  // 一系列剪枝操作
  // 除数与被除数相等时直接 返回 1
  if (dividend === divisor) return 1;
  // 除数为 1 时直接返回除数
  if (divisor === 1) return dividend;
  // 除数为 -1 时，如果被除数为 2^31 那么溢出了，所以直接返回 2^31 - 1，否则就返回被除数取反
  if (divisor === -1) {
    if (dividend === -2147483648) return 2147483647;
    return ~dividend + 1;
  }
  // *统一两个数的符号
  const _dividend = dividend < 0 ? ~dividend + 1 : dividend;
  const _divisor = divisor < 0 ? ~divisor + 1 : divisor;
  // 除数大于被除数返回 0
  if(_divisor > _dividend) return 0;
  // 用于存储当前的和
  let sum = 0;
  // 商
  let quotient = 0;
  // 步长
  let step = 0;
  // *注意在 js 中 number 因为包含了浮点数，只剩下了 32 位，然后还有一位符号位，所以整数部分只有 31 位，所以步长不能溢出，这里就是确定最大步长 31 减去当前除数的位数就是最大步长
  const stepMax = 31 - _divisor.toString(2).length;
  while (1) {
    // *首先计算出当前 加数
    const tempDivisor = _divisor << step;
    // 如果 和 大于被除数
    if ((sum + tempDivisor) > _dividend) {
      // 如果步长为 0 那么直接返回
      if (step === 0) break;
      // 否则将步长重置为 0，并且跳过这次循环
      step = 0;
      continue;
    }
    // sum 存储和
    sum += tempDivisor;
    // !quotient 应该存储当前相加的 _divisor 的个数，那么就应该是 (_divisor << step) / _divisor 所以得到 1 << step
    quotient += 1 << step;
    // *确保 step <= stepMax
    step = step < stepMax ? step + 1 : step;
  }
  // *判断符号 ^ 异或的规则是，0 ^ 0 = 0, 1^1=0, 0^1=1, 1^0=1 相同得0，不同得1 这与正负数之间的操作一样，所以可以用来判断符号
  if ((dividend ^ divisor) < 0) return -quotient;
  return quotient;
}

console.log(divide(10, 3));
