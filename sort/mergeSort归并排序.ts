import randomArr from "./randomArr";
import { iPerformance } from "../小技巧/iPerformance";

export function mergeSort(nums: number[], start: number = 0, end: number = nums.length - 1): number[] {
  if (start >= end) return nums;
  const mid = start + end >> 1; // * >> 的优先级低于 + 所以完全不用加括号
  mergeSort(nums, start, mid);// !注意这里的分组方式： 应该是 start -> mid 而不是 start -> mid - 1 如果是这样的分组： 第一 如果是四个元素比如 1,2,3,4 mid计算出来为1，这个时候的分组为： [0] [1,2,3] 这样分组根本不合理；
  mergeSort(nums, mid + 1, end); // ! 第二：当start为0.end为1时会陷入死循环 mid = 0 + 1 >> 1 = 0 当执行到这里的时候，就会一直重复 0 1 0
  let left = start;
  let right = mid + 1;
  // !归并排序这里真的需要一个新的数组作为中间存储  https://visualgo.net/zh/sorting 动画演示
  let index = 0;
  const arr = new Array(end - start + 1);
  while (left <= mid && right <= end) {
    if (nums[left] < nums[right]) arr[index++] = nums[left++];
    else arr[index++] = nums[right++];
  }
  while (left <= mid) arr[index++] = nums[left++];
  while (right <= end) arr[index++] = nums[right++];
  for (let j = 0; j < arr.length; j++) {
    nums[start + j] = arr[j];
  }
  return nums;
}

const fn = iPerformance(mergeSort);
fn(randomArr(100));

// console.log(mergeSort(randomArr(100)));
