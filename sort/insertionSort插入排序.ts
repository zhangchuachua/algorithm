import randomArr from "./randomArr";

// *插入排序也不算太难 排序可视化: https://visualgo.net/zh/sorting  插入排序的时间复杂度 O(n^2) 空间复杂度 O(1);
// *大概的步骤就是：不断的遍历，然后将前面的部分变成已经排列好的部分。
export function insertionSort(nums: number[]): number[] {
  for (let i = 1; i < nums.length; i++) { // *因为一个数字不需要排列，所以这里循环直接从1开始
    let j = i; // j = i
    // !注意：这里有两个比较条件， nums[j] < nums[j - 1] 因为前面的元素都是排列好的了，所以如果当前元素不小于前面的元素，那么就不用进入循环排序了，这就是它正确的位置，这就是一种优化。
    while (j > 0 && nums[j] < nums[j - 1]) {// *再次进入循环，对前面的部分进行排序。
      [nums[j - 1], nums[j]] = [nums[j], nums[j - 1]]; //* 这里交换就有点像其实就像冒泡排序那样的交换一样，两个相邻的之间互相交换
      j--; // 然后j指向更前面的元素
    }
  }
  return nums;
}

console.log(insertionSort(randomArr(10)));
