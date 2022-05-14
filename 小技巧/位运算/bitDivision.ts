// *位除法
// *位除法 a / b = quotient, quotient * b = a;
// leetcode 29
import bitAdd from "./bitAdd";

// !这个写法无法通过 leetcode 的测试，因为其中有 极大数 运算时会出现位溢出
export default function bitDivision(a: number, b: number): number {
  if (b === 0) throw TypeError('b cant be 0');
  let quotient = 0;
  let product = 0;
  // 依旧取正数
  const _a = a < 0 ? bitAdd(~a, 1) : a;
  const _b = b < 0 ? bitAdd(~b, 1) : b;
  // 还可以使用减法来做
  // *因为 quotient * b = a; 但是当前 quotient 是未知的，所以需要从零开始对 quotient 进行 +1 直到下一次的 product > _a 时截止
  // *为什么是下一次的 product 呢？不是本次的 product 呢？假设 a = 8, b = 3 那么预期输出 2，当 quotient = 2, product = 6 时 product 依旧小于 8 所以会再一次循环，得到的 quotient = 3;
  // *为什么循环的条件是 <= 呢，假设 a = 8, b = 2 当 quotient = 3, bitAdd(product, _b) = 8 此时应该再进行一次循环，当条件中不包含等于时就结束了，得到 quotient = 3, 但是预期得到 4
  while (bitAdd(product, _b) <= _a) {
    quotient = bitAdd(quotient, 1);
    console.log(quotient);
    product = bitAdd(product, _b);
  }
  // 判断符号位
  if ((a ^ b) < 0) {
    quotient = bitAdd(~quotient, 1);
  }

  return quotient;
}

console.log(bitDivision(2147483647, 2));