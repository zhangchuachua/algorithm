// !位运算原理解析：https://juejin.cn/post/6923563274822746126
/**
 * 注意
 * ! 1. 以下实现的位运算都只能计算整数情况
 * ! 2. 因为没有使用 BigInt 所以只能应付小范围的数字，也就是 32 位范围: [-2^31, 2^31 - 1]
 * ! 3. 无法通过 leetcode 29 的测试，因为代码中使用了很多循环，对于某些情况会超时
 *
 */
import bitAdd from "./bitAdd";
import bitSubtract from "./bitSubtract";
import bitMultiplication from "./bitMultiplication";
import bitDivision from "./bitDivision";