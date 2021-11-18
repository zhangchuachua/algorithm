// *二分搜索，二分搜索的前提是有序数组一定要记得。
// *二分搜索首先从中间的元素开始，如果这个元素就是目标元素就进行返回。如果不是就判断这个元素大于还是小于目标值，然后去对应的一侧继续以上步骤就可以了。
export function binarySearch<T>(arr: T[], target: T): number {
  let start = 0;
  let end = arr.length - 1;
  let mid = end >> 1;
  // *这里是通过算数的方法计算出最大的循环次数，因为每次都会排除一半的数，所以最多会循环 log₂n + 1次。
  // *还有一种就是通过while循环，当start > end 时 就结束循环也是可以的。因为start总是在增加，mid总是在减小，当数组中找不到目标元素时，就会出现这样的情况。
  for (let i = 0; i < Math.log2(arr.length) + 1; i++) {
    if (arr[mid] === target) return mid;
    else if (arr[mid] > target) end = mid - 1; // *当前元素大于目标值时，就将end移动到当前元素前一个数。注意这里只需要移动end，不需要移动start
    else start = mid + 1;// *这里也是一样的，当前元素小于目标值时，只需要移动start
    mid = end + start >> 1;
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 5, 6, 87, 324, 1231, 76231], 25));
