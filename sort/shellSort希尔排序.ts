export function shellSort(nums: number[]): number[] {
  function insertionSort(nums: number[]) {
    for (let i = 1; i < nums.length; i++) {
      let j = i;
      while (j > 0 && nums[j] < nums[j - 1]) {
        [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
        j--;
      }
    }
  }

  let gap = nums.length / 2;

}
