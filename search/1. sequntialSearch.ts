// 顺序搜索，也就是遍历数组，进行比较，是最简单的搜索了  没啥可说的 时间复杂度为O(n)
export function sequentialSearch<T>(arr: T[], target: T): number {
  let index: number = -1;
  for (let i in arr) {
    if (arr[i] === target) {
      index = Number(i);
      break;
    }
  }
  return index;
}
