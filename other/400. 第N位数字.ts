// !每日一题

export function findNthDigit(n: number): number {
  const arr = Array.from({ length: n }, (value, key) => {
    return key + 1;
  });
  return Number(arr.join('')[n - 1]);
}

export function findNthDigitMath(n: number): number {
  if (n < 10) return n;
  n = (n - 9) / 2;
  let num:number|string = Math.ceil(n);
  const hasDecimal = num !== n;
  num = String(num+9);
  return hasDecimal ? +num['0'] : +num['1'];
}

console.log(findNthDigitMath(99), findNthDigit(99));
