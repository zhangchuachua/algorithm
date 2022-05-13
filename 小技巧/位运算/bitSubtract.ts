// *位减法 既然实现了位加法，那么位减法也就差不多了  a - b = a + (-b)
import bitAdd from "./bitAdd";
export default function bitSubtract(a: number, b: number): number {
  // *需要将 b 变成 -b 可以使用 ~ 按位取反，那么将符号位也就取反了，但是因为其他位同时也取反了，所以 ~b != -b
  // *这个时候只需要将 ~b + 1 就可以了
  return bitAdd(a, bitAdd(~b , 1));
}