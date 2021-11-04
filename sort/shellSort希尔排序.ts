import randomArr from "./randomArr";
// *希尔排序其实就是插入排序的优化版本， 插入排序在大数据时性能非常差，于是shell便第一个提出了这种优化方法，先把大的数据按照增量分成若干份进行插入排序，然后再逐渐缩小增量，知道增量为1时就插入排序整个数组。
export function shellSort(nums: number[]): number[] {
  // *希尔排序时间复杂度的大小取决于增量的选择，具体看这里 https://juejin.cn/post/6844904084034551816
  let len = nums.length;
  // *这里增量的选择方法是最常见的数组的长度/2 比如说 有9个数据的数组 9/2=4 于是我们就每隔四个进行分组： 0,4,8 ; 1,5; 2,6; 3,7; 这样进行分组。 注意哦 每个分组的元素个数不一定相等怕
  // !最重要的是前后两个增量应该互质  其他的增量还有 2^k-1: {1,3,15,31,63} https://www.cnblogs.com/minxiang-luo/p/12392634.html 这个网址有其他增量的计算规则
  let gap = len >> 1;

  while (gap >= 1) { // 这里循环 gap最终只能等于1 而且不能小于等于0
    for (let i = 0; i < gap; i++) {// *在这里进行分组，注意 这样的方式获取的增量 gap既是增量也是分组的个数。 所以这里的i应该小于gap 毕竟分组的个数已经指定了；
      // !注意在其他计算增量的规则下 gap既是增量又是分组的个数并不适用 比如 {1,5,19...} 遇到一个七位数组，那么应该怎么分？ 遇到18位数组又该怎么分?
      for (let j = i + gap; j < len; j += gap) { // *这里就在进行插入排序了 i直接指向后一个元素 注意这里 都要使用增量进行步进
        let t = j;
        while (t >= 0 && nums[t] < nums[t - gap]) {// *这里比较 当前元素于上一个元素
          [nums[t], nums[t - gap]] = [nums[t - gap], nums[t]];
          t -= gap;// *使用步减
        }
      }
    }
    gap >>= 1; // *每次循环都让gap/2
  }
  return nums;
}

console.log(shellSort(randomArr(9)));
