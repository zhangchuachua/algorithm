// *快速排序
export function quickSort(nums: number[]) {
  if (nums.length === 0 || nums.length === 1) return;

  function name(arr: number[], start: number, end: number) {
    if (end >= start) return;
    // const pivot = Math.floor(Math.random() * (end - start)) + start;
    const pivot = 0;
    const current = nums[pivot];
    let left = start;
    let right = end;
    while (left < right) {
      if (nums[left] > current) {
        nums[left] = nums[left] ^ nums[right];
        nums[right] = nums[left] ^ nums[right];
        nums[left] = nums[left] ^ nums[right];
        right--;
      } else if (nums[right] < current) {
        nums[left] = nums[left] ^ nums[right];
        nums[right] = nums[left] ^ nums[right];
        nums[left] = nums[left] ^ nums[right];
        left++;
      } else
        left++;
    }
    nums[left] = current;
    console.log(nums, pivot, start, end);
    name(arr, start, left - 1);
    name(arr, left + 1, end);
  }

  name(nums, 0, nums.length - 1);
  console.log(nums);
}

quickSort([19, 97, 9, 17, 1]);
