// !每日一题
// 使用js的数组转字符串进行操作，很明显，时间超过
export function findNthDigit(n: number): number {
  const arr = Array.from({ length: n }, (value, key) => {
    return key + 1;
  });
  return Number(arr.join('')[n - 1]);
}

// *直接计算得出，因为是计算，所以时间使用很少，时间复杂度是 O(log10^n) 也就是10为底，也就是 n 的位数。
// *这道题有一个规律 1~9 都是一位数，所以只有 9 个数， 10~99 都是 2 位数，所以一共有 90 * 2个数， 100~999 都是 3 位数，所以一共有 900 * 3 个数字，所以不同位数的数字为： 9*(位数)*10^(位数-1) 所以我们只需要求出当前的位数，然后使用 n 减去低位的数字总量，比如 求 11 为的数字，也就是n=11， 我们知道 1~9 都是一位数， n = 11 大于 9 所以 n 当前的位置应该是二位数， n-9=2  2/2-1 = 0 所以当前对应的应该是二位数里面的第0个数字，也就是 10 + 0 = 10, 然后再通过求余得出在第几位就可以了。
export function findNthDigitMath(n: number): number {
  let num = 1; // *这里记录数字的位数
  let difference = n; // *这里记录减去低位数数字总量后的值也就是  -9, -180, -2700...
  let part = 9 * num * (10 ** (num - 1));// *计算低位数数字总量的表达式
  while (difference > part) {
    difference -= part;
    num++;
    part = 9 * num * (10 ** (num - 1));
  }
  const index = Math.ceil(difference / num) - 1; // *计算出当前对应的索引，比如说 n = 11 index = 0; 表示当前数字是十位数的第一个元素 n = 190 index = 0; 表示当前数字是百位数的第一个元素
  const value = 10 ** (num - 1) + index;
  const remainder = difference - (index * num); // *减去多余的位数，剩下就是当前value对应的位，比如说value = 10，remainder = 1，表示对应 10 中的第一个数字为1，如果 remainder = 2表示对应第二个数字为0
  return Number(String(value)[remainder - 1]);// *remainder 与索引不一样，需要 -1
}

// TODO 这道题还可以使用二分查找的方式来做。


console.log(findNthDigit(10000), findNthDigitMath(10000));

