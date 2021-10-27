import randomArr from "./randomArr";

// *时间复杂度 O(n^2) 空间复杂度 O(1)
// *选择排序还是比较简单  [4,2,1] 比如使用这个数组来排序成升序的，就从第一个元素开始 第一个元素目前是4，然后开始与后面比较，2小于4，那么就进行交换变成了 [2,4,1] 注意目标是让第一个元素成为最小的，所以这个时候还是要比较 第一个元素的值，所以变成了 2 与后面的数比较，因为 1 < 2 所以交换： [1,4,2] 第一个元素就是最小的了。
export function selectSort(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i]; // *记住当前索引对应的值
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < current) {
        [nums[i], nums[j]] = [nums[j], nums[i]]; // !ES6中可以使用这样的方式来交换
        current = nums[i]; // *交换完成记得修改索引对应的值。
      }
    }
  }
  return nums;
}



console.log(selectSort(randomArr(10)));
