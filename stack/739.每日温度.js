// *739.每日温度 https://leetcode.cn/problems/daily-temperatures/ 难度：中等；标签：栈，数组，单调栈
// *因为 ts 高版本才支持 at ，而且与 node 的 module 配置起来又太麻烦，直接换成 js ，注意 node 16.6.0 才支持 at
/**
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 */
// *这道题相对于 84. 直方图最大矩形面积 来说简单很多，这道题只需要寻找下一个大于当前温度的索引值。
// *这道题需要构建一个 **单调递减的栈** 因为这道题只需要寻找下一个大于当前温度的索引值，使用单调递减的栈，可以保证
function dailyTemperatures(temperatures) {
  const stack = [0];
  const res = new Array(temperatures.length).fill(0);


  for (let i = 1; i < temperatures.length; i++) {
    const cnt = temperatures[i];

    while (stack.length && cnt > temperatures[stack.at(-1)]) {
      const top = stack.pop();
      res[top] = i - top;
    }
    stack.push(i);
  }

  return res;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))