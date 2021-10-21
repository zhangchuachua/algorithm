// *快速排序  在这个排序下遇到了很多的问题。需要好好研究一下下面几个TODO。因为开始没有理解到这些TODO出了很多问题，比如指针指向不对，无法过滤相同的数字等。
function sortArray(nums: number[]): number[] {
  function quickSort(arr: number[], start: number = 0, end: number = arr.length - 1) {
    let l = start;
    let r = end;
    if (l >= r) return;
    const pivot = Math.round(Math.random() * (r - l)) + l;
    const current = arr[pivot];
    while (l <= r) { // TODO 为什么需要等于
      while (arr[l] < current) {
        l++;
      }
      while (arr[r] > current) {
        r--;
      }

      if (l <= r) { // TODO 为什么需要等于
        arr[l] = arr[l] ^ arr[r]; // TODO 使用位运算会出错
        arr[r] = arr[l] ^ arr[r];
        arr[l] = arr[l] ^ arr[r];
        l++;
        r--;
      }
      console.log(pivot, l, r, arr);
    }
    quickSort(arr, start, l - 1);
    quickSort(arr, l, end);
  }

  quickSort(nums);
  return nums;
};
console.log(sortArray([5, 2, 3, 1]));


export default sortArray;
