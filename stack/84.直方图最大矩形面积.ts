// *84 & 剑指 offer 039. 直方图最大矩形面积 难度为 困难


// *单调栈 这是我在 b站 上搜索单调栈看到的视频中讲解的这道题，虽然看了视频已经有思路了，但是在编码环节还是遇到很多问题。
export function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let max = 0;
  for (const i in heights) {
    const cnt = heights[i];

    // *重点1
    while (stack.length && cnt <= heights[stack[stack.length - 1]]) {
      const head = stack.pop() as number;
      const height = heights[head];
      // *重点2
      const prev = stack[stack.length - 1] ?? -1;
      const width = +i - 1 - prev;
      max = Math.max(max, (height * width));
    }

    const head = heights[stack[stack.length - 1]] ?? -1;

    if (cnt > head) {
      stack.push(+i);
    }
  }

  let maxIndex = -1;
  // *重点3
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

console.log(largestRectangleArea([5, 4, 1, 2]));