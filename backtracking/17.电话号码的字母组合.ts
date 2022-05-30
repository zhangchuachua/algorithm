/*
 * @lc app=leetcode.cn id=17 lang=typescript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/***
 * @example input '23' output: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']
 */
// *回溯的经典案例 回溯就是专门用于求这种 全排列, 全组合的算法.
// *这道题如果只是用 for 循环来做的话, 根据参数的不同 for 循环的层数也就不同, 对于这种不明确的循环来说, 就可以使用递归.
const letters = "2abc3def4ghi5jkl6mno7pqrs8tuv9wxyz";

function letterCombinations(digits: string): string[] {
  const numList = digits.split("");
  if (numList.length === 0) return [];
  // 将数字对应的字母提出出来
  const lettersList = numList.map((n) => {
    const rex = new RegExp(`${n}([a-z]{3,4})`);
    return (letters.match(rex) as RegExpMatchArray)[1].split("");
  });
  // 如果只有一个数字,那么就直接返回
  if (lettersList.length === 1) return lettersList[0];

  const result: string[] = [];
  // *回溯函数, 这里因为遍历数组是一个二维数组, 所以做了一些改变, 可以传入 index 
  function backTracking(path: string = "", index = 0) {
    // *完成条件
    if (index === lettersList.length) {
      result.push(path);
      return;
    }
    // *每次深入一层就让 index + 1 就相当于在遍历 lettersList 数组, 横向的循环
    // *然后遍历 lettersList[index] 进入递归, 相当于是纵向的循环
    lettersList[index].forEach((item) => {
      backTracking(`${path}${item}`, index + 1);
    });
  }
  backTracking();
  return result;
}

// @lc code=end

export default letterCombinations;
