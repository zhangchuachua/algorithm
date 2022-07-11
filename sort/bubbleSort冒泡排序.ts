// *冒泡排序  非常简单，两两比较进行换位置  其余的排序看 ../other/排序.ts
// 这是优化版本
export function bubbleSort(nums: number[]) {
  const len = nums.length;
  if(len <= 1) return nums;
  let isSwap; //* 这是一个优化， 如果在j一次完整的循环中没有进行交换，那么说明已经是有序的了，就不必进行后面的循环了。
  for (let i = 0; i < len - 1; i++) {
    isSwap = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]; // 从力扣偷学的交换方法。
        isSwap = true;
      }
    }
    if (!isSwap) break;
  }
  return nums;
}

console.log(bubbleSort([5, 2, 3, 1]))