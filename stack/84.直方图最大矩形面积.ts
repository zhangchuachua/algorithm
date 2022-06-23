// *84 & 剑指 offer 039. 直方图最大矩形面积 难度为 困难


// *单调栈 这是我在 b站 上搜索单调栈看到的视频中讲解的这道题，虽然看了视频已经有思路了，但是在编码环节还是遇到很多问题。
// *对于这种需要寻找 **第一个小于（大于）** 的问题，就可以使用单调栈来完成
// *假设当前的数组是 [2, 1, 5, 6, 2, 3] 要计算最大矩形面积，那么我们就可以遍历数组，然后计算每个元素的能取到的最大矩形面积就可以了。 当前元素的最大矩形面积 = 当前元素的高 * 宽度， 这个宽度就是下一个小于当前元素到上一个小于当前元素的距离。能画个图就更直观了。 我们肯定不能直接搜索 上一个和下一个小于当前元素的索引，所以就可以使用单调栈来解决问题
// *单调栈，其实就是单调递增或者单调递减的栈。这道题需要使用单调递增的栈，这样可以保证上一个元素一定是小于的，并且在入栈时会进行比较，这样就可以顺利得到 上一个和下一个小于当前元素的索引 。不能是单调递减的，因为只能保证上一个元素更大，但是我们需要找到更小的
// *解题思路：遍历 heights 数组，按照单调递增的规律进行入栈，使用上面那个数组进行演示：[2] -> 遇到1，1小于2 所以2出栈，1进栈，并且计算以 2 为高的矩形面积，此时自然为 2*1 = 2 -> 5 进栈 [1, 5] -> 6 进栈 [1, 5, 6] -> 遇到2，6 出栈，并且计算面积 6 * 1 = 6， 5 再出栈 area = 5 * 2 = 10. 2 进栈 -> 3 进栈 [1, 2, 3] 。  注意：代码中栈里面的应该是索引值这里使用元素值，是为了方便
// *下面进入代码，看一下细节
export function largestRectangleArea(heights: number[]): number {
  // *单调栈 注意单调栈里面存储的是索引值  因为有索引值可以直接获得高度，但是有高度却不能直接得到索引
  const stack: number[] = [];
  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    const cnt = heights[i];

    // *cnt <= 栈顶对应元素值 那么就应该将栈顶出栈，使用 while 循环，确保每一个 >= cnt 的索引都出栈
    // !重点，为什么这里需要 <= ; 假设当前数组为 [1, 2, 2, 2, 1] 中间三个相同的 2 那么这三个 2 得出的矩形面积应该都是相等的，所以我们只需要保存最后一个就可以了
    while (stack.length && cnt <= heights[stack[stack.length - 1]]) {
      const head = stack.pop() as number;// 将栈顶 pop 出来
      // *如果上一个元素与当前元素相等，那么不需要进行计算
      if (cnt === heights[i - 1]) continue;
      // *因为我们上面将相等的情况剔除了, 当前最后一个元素一定是小于栈顶的
      // *因为上面使用的是 pop 所以如果此时 stack 为空, 那么说明栈顶对应的值是最小的, 那么距离应该是 左边的总长度 所以需要将 prev 赋值为 -1
      const prev = stack[stack.length - 1] ?? -1;
      // !width 应该是下一个小于到上一个小于之间的距离，且是不含这两个小于的。 所以 (i - 1) 就是 cnt 的上一个索引值 - prev 就是 **之间的距离**。注意这里是 i - 1 不是栈顶，因为这是一个 while 循环，栈顶永远是自身，而不是下一个小于自己的元素。
      // !那么为什么 prev 在 stack 为空的情况是 -1 呢，因为数组以 0 为开头，假设当前数组为：[2, 1] 那么遍历到 1 时，2 会出栈，i - 1 = 0 ，prev 只有为 -1。
      const width = i - 1 - prev;
      max = Math.max(max, (heights[head] * width));
    }
    // *进栈
    stack.push(i);
  }

  let maxIndex = -1;
  // *如果栈内还有索引，那么就要计算每个索引对应值的矩形面积  计算方法与上面差不多
  while (stack.length) {
    const head = stack.pop() as number;
    const height = heights[head];
    const prev = stack[stack.length - 1] ?? -1;
    if (maxIndex === -1) {
      maxIndex = head;
    }
    const width = maxIndex - prev;

    max = Math.max(max, height * width);
  }
  return max;
};

console.log(largestRectangleArea([1,1]));