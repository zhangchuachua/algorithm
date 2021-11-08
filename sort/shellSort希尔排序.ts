import randomArr from "./randomArr";
import { iPerformance } from "../小技巧/iPerformance";

// *希尔排序其实就是插入排序的优化版本， 插入排序在大数据时性能非常差，于是shell便第一个提出了这种优化方法，先把大的数据按照增量分成若干份进行插入排序，然后再逐渐缩小增量，知道增量为1时就插入排序整个数组。
export function shellSort(nums: number[]): number[] {
  // *希尔排序时间复杂度的大小取决于增量的选择，具体看这里 https://juejin.cn/post/6844904084034551816
  let len = nums.length;
  // *这里增量的选择方法是最常见的数组的长度/2 比如说 有9个数据的数组 9/2=4 于是我们就每隔四个进行分组： 0,4,8 ; 1,5; 2,6; 3,7; 这样进行分组。 注意哦 每个分组的元素个数不一定相等怕
  // !最重要的是前后两个增量应该互质  其他的增量还有 2^k-1: {1,3,15,31,63} https://www.cnblogs.com/minxiang-luo/p/12392634.html 这个网址有其他增量的计算规则
  let gap = len >> 1;

  while (gap >= 1) { // 这里循环 gap最终只能等于1 而且不能小于等于0
    for (let i = 0; i < gap; i++) {// *在这里进行分组，注意 这样的方式获取的增量 gap既是增量也是分组的个数。 所以这里的i应该小于gap 毕竟分组的个数已经指定了；  纠错： 分组的个数最大就是步长（除1外） 比如说步长为2，那么最多只能分成两组。如果步长为3最多只能分为三组。
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

// const fn = iPerformance(shellSort);
// console.log(fn(randomArr(50000)));


export function shellSortGap1(nums: number[]): number[] {
  // !先写一个获取gap数组的函数  注意这个分组方式是使用两个交替表达式来完成的  一个是 9*4^i-9*2^i+1 另一个是 2^(2i+4)-3*2^(i+2)+1 先使用第一个表达式后使用第二个表达式
  // !比如i为0的时候 先使用第一个表达式得1 再使用第二个表达式为5 然后i为1时依然如此 得出 {1,5,19,41...}
  function getGap(length: number) {
    const arr: number[] = [];
    // *初始索引值为0 从0开始
    let i = 0;
    while (1) {
      let tmp = 9 * ((1 << 2 * i) - (1 << i)) + 1;
      if (tmp < length) // *我觉得这里不应该可以等于，参考的网页里面写的是等于。 假设步长为5，数组长度为5，第一个元素索引为0，对应的下一个元素索引就为5，但是索引最大才为4，所以只能小于数组长度。
        arr.push(tmp);
      else break;
      tmp = (1 << (2 * i + 4)) - (3 * (1 << (i + 2))) + 1;
      if (tmp < length)
        arr.push(tmp);
      else break;
      i++;
    }
    return arr;
  }

  const len = nums.length;
  const gapList = getGap(len).reverse();// *获取到的步长数组，因为是升序排列[1,5,19,41...]，所以需要将数组反转
  console.log(gapList);
  for (let step of gapList) { // *遍历每一个步长进行排序
    let i = 0;
    // *保证不止一个元素
    // !注意：这里还要保证 i < step 因为一般分组的最大个数就是步长，所以这里要保证 i 小于步长，比如 数组长度为 50000 但是步长为5时，当前i为6，其实这个6 早在 i 为1的时候就已经访问过，并且经过排序了。可以这里再次取到 6 只是无意义的，只会拖慢速度。
    while (i < step && nums[i + step] !== undefined) {// *这里进行分组，其实分组就正常分组就可以了
      // *比如说 [1,2,3,4,5,6] 长度为6，步长为5时，只能分为 [1,6]一组， 其他的[2],[3],[4]都单独为一组。 因为单个元素不用交换，所以while循环就设置了条件。所有的希尔排序都可以使用这样的方式进行分组。
      for (let j = i + step; j < len; j += step) { // *这里开始进行插入排序，与之前的插入排序无二致。
        let k = j;
        while (k >= 0 && nums[k] < nums[k - step]) {
          [nums[k], nums[k - step]] = [nums[k - step], nums[k]];
          k -= step;
        }
      }
      i++;
    }
  }
  return nums;
}

const fn = iPerformance(shellSortGap1);
console.log(fn(randomArr(50000)));
