import randomArr from "./randomArr";
import { iPerformance } from "../小技巧/iPerformance";

// !归并排序的时间复杂度和空间复杂度都非常优秀，而且还是稳定的排序方式，所以一定要掌握。
// *它使用了分而治之的思想，将大数组优先分解为小数组，进行排序，然后再合并为大数组。 https://juejin.cn/post/6844903895789993997#heading-1 这个网址里面有分析时间复杂度和空间复杂度的内容。
// *对于一个排序算法是否稳定，就是看他是否会多次调换两个元素的位置，比如说两个元素时 5,2正确的应该是2,5稳定的排序算法，只会交换一次他们的位置，让他们变成正确的排序。 而不稳定的算法就会交换一次或者多次，最终才成为正确的顺序。
// *归并排序的空间复杂度，按照上诉网址的分析，因为函数调用栈，一次只能一个函数进行执行，一个函数内部只会有一个最大为n的新数组，函数调用完成后数组空间就被释放了，所以无论递归多少层，空间复杂度都是 o(n) left,mid 这些常数忽略
// *时间复杂度，拆分数组，每次都拆分成两个，所以拆分数组需要 logn 步，然后在我这里的写法里，排序使用n步，然后赋值又使用了n步，所以应该是 O(2nlogn) 不知道这里的算法是否正确。
export function mergeSort(nums: number[], start: number = 0, end: number = nums.length - 1): number[] {
  if (start >= end) return nums;
  const mid = start + end >> 1; // * >> 的优先级低于 + 所以完全不用加括号
  mergeSort(nums, start, mid);// !注意这里的分组方式： 应该是 start -> mid 而不是 start -> mid - 1 如果是这样的分组： 第一 如果是四个元素比如 1,2,3,4 mid计算出来为1，这个时候的分组为： [0] [1,2,3] 这样分组根本不合理；
  mergeSort(nums, mid + 1, end); // ! 第二：当start为0.end为1时会陷入死循环 mid = 0 + 1 >> 1 = 0 当执行到这里的时候，就会一直重复 0 1 0
  let left = start;
  let right = mid + 1;
  // !归并排序这里真的需要一个新的数组作为中间存储  https://visualgo.net/zh/sorting 动画演示
  let index = 0; // *为新数组声明一个索引。
  const arr = new Array(end - start + 1); // *新建一个数组，数组的长度为 end - start + 1 ，也就是截取的长度。
  while (left <= mid && right <= end) { // *这里及其下面的两个while循环都是为了处理数组的大小排列问题。 以中间值为基准分隔出两个数组，然后需要按照顺序把大的数或者小的数优先放在前面，直到一个指针溢出边界值。如果两边的数组还有值，就把剩余的值放到新数组里面。 所以这里判断条件是两边的指针，都在指定范围内时。  我的表达能力不是很好，还是看动画演示准确一点。
    // !当然如果这里不适用三个while循环，只使用一个while循环然后通过if进行判断也是没有问题的，但是其实循环次数都是差不多的，而这种写法更美观。
    if (nums[left] < nums[right]) arr[index++] = nums[left++]; // *这里再赋值的同时，移动指针。
    else arr[index++] = nums[right++];
  }
  while (left <= mid) arr[index++] = nums[left++]; // *这里就是如果数组还剩余就全部放到新数组里面去。
  while (right <= end) arr[index++] = nums[right++];// *这里同上，但是一般来说，只有一个或者0个数组有剩余的元素。因为都会移动到一个数组的末尾才结束。
  // !这里就是将新数组的值再一个一个赋值给原本的数组。因为新数组的值都是排序好了的。  但是注意赋给原本的数组的时候要注意应该对应正确的索引值。 这里的做法不好，下面的做法更好  应该可以对这里的方法进行改造。
  for (let j = 0; j < arr.length; j++) {
    nums[start + j] = arr[j]; // *这里的 num[start + j] 就是指定正确的索引值。
  }
  return nums;
}

const fn = iPerformance(mergeSort);
fn(randomArr(100));
// console.log(mergeSort(randomArr(100)));

// !这是掘金上面的写法，我觉得这样的写法更好 这里的时间复杂度才是 O(nlogn) 空间复杂度也更好没有多余的变量。
export const mergeSortJueJin = (arr: number[]) => {
  //采用自上而下的递归方法
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  // length >> 1 和 Math.floor(len / 2) 等价
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle); // *拆分为两个子数组这里拆分的两个数组都是再已有的基础上拆分的，也就是nums已经开辟了内存了，我们只是进行了截取，不会额外申请内存
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left: number[], right: number[]) => {
  const result = [];

  while (left.length && right.length) {
    // 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) result.push(left.shift());

  while (right.length) result.push(right.shift());

  return result; // !而且这里不必使用一个for循环对原数组进行赋值。  对呀！ 新的数组已经是排序好了的，为什么还要进行重新赋值！
};

