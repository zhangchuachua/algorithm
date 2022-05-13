// *位乘法
// *乘法也很简单， a * b = b₁ + b₂ + ... + b𝑎
import bitAdd from "./bitAdd";

export default function bitMultiplication(a: number, b: number): number {
  let product = 0;
  // *注意，不能直接使用 a, b 作为循环条件，因为 a, b 可能是负数
  // *所以要使用正数进行操作，当 a, b 为负数时，获取其正数
  const _a = a < 0 ? bitAdd(~a, 1) : a;
  const _b = b < 0 ? bitAdd(~b, 1) : b;

  // *再使用正数操作
  for(let i = 0; i < _b; i = bitAdd(i, 1)) {
    product = bitAdd(product, _a);
  }

  // *判断符号，当 a, b 符号相同时，积肯定为正数，当 a, b符号相反时肯定为负数，所以这里相当于对 a, b 的符号位进行异或处理，就可以得到积的符号
  if ((a ^ b) < 0) {
    product = bitAdd(~product, 1);
  }
  return product;
}
console.log(bitMultiplication(-10, -3));