// *冒泡排序  非常简单，两两比较进行换位置  其余的排序看 ../other/排序.ts
export function bubbleSort(nums: number[]) {
  let swap = true; //* 这是一个优化， 如果在j一次完整的循环中没有进行交换，那么说明已经是有序的了，就不必进行后面的循环了。
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        nums[i] = nums[i] ^ nums[j];
        nums[j] = nums[i] ^ nums[j];
        nums[i] = nums[i] ^ nums[j];
        swap = false;
      }
    }
    if (swap) return;
  }
  return nums;
}
