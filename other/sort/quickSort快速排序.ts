// *快速排序  在这个排序下遇到了很多的问题。需要好好研究一下下面几个TODO。因为开始没有理解到这些TODO出了很多问题，比如指针指向不对，无法过滤相同的数字等。
export function sortArray(nums: number[]): number[] {
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

// !这是阮一峰版的快速排序，这可以说是非常非常好理解了。 还是随机选择一个基数，然后直接创建两个数组来存储比基数小的和大于等于基数的，然后不断递归就可以了。因为使用了额外的两个数组进行存储，就不会出现指针的指向问题了，但是也是因为两个数组导致性能差了很多。 如果便于理解的话还是可以的。
export function quickSortRuanYiFeng(nums: number[]): number[] {
  if (nums.length <= 1) return nums;
  const pivot = nums.splice(Math.round(Math.random() * nums.length - 1), 1)[0];
  const less = nums.filter(num => {
    return num < pivot;
  });
  const greater = nums.filter(num => num >= pivot);
  return new Array<number>().concat(quickSortRuanYiFeng(less), pivot, quickSortRuanYiFeng(greater));
}

console.log(quickSortRuanYiFeng([1,2,3,12,123,1,5,4,534,5,-12,21,-6]));
