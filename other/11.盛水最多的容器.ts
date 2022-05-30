// leetcode-11 成水最多的容器 https://leetcode.cn/problems/container-with-most-water/

// *这道题还是比较简单, 就是简单的运用了一个贪心算法和双指针
/**
 * @param height {number[]}
 * @returns {number}
 */

/** 解题思路
 * *要想面积最大, 那么最理想的情况就是 最大的长 * 最大的宽, 那么一开始我们就可以使用两个指针 分别指向 head 与 tail 这样就是 最大的长
 * *然后使用一个循环, 存储当前最大的面积, 然后比较 height[head], height[tail] 让较小的那个指针进行移动. 直到不满足循环条件, 最后返回面积即可
 */
// *下面的写法应该还可以稍微优化一下
function maxArea(height: number[]): number {
  // *双指针
  let head = 0;
  let tail = height.length - 1;
  // *存储面积
  let result = 0;
  // 头指针应该小于尾指针
  while (head < tail) {
    // *计算面积
    const sum = (tail - head) * Math.min(height[head], height[tail]);
    // *存储面积
    result = Math.max(result, sum);
    // *移动指针
    if(height[head] > height[tail]) {
      tail -= 1;
    } else {
      head += 1;
    }
  }
  return result;
};