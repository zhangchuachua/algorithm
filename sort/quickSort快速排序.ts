// *快速排序  在这个排序下遇到了很多的问题。需要好好研究一下下面几个TODO。因为开始没有理解到这些TODO出了很多问题，比如指针指向不对，无法过滤相同的数字等。
// !这种方法不是很好理解 建议换一个方法。
export function sortArray(nums: number[]): number[] {
  function quickSort(arr: number[], start: number = 0, end: number = arr.length - 1) {
    let l = start;
    let r = end;
    if (l >= r) return;
    // *这种做法前面还是很正常，取一个随机的基数。
    const pivot = Math.round(Math.random() * (r - l)) + l;
    const current = arr[pivot];
    // console.log(arr, current, pivot, l, r, 'first');
    // !在循环分组这里就不一样了。   一般的快速排序都是分好组后，能够得到基数目前的索引，然后分为左右数组进行递归。但是这里完全不一样，这里直接没有管基数的索引，而是根据循环后的 l 指针，分成两半继续递归。  比如说 2,2,1,2 pivot=1，外层的while后 l 为 1，就又分成了 [0,0] , [1,3] 两个数组进行递归，但是其实这个时候的基数的索引为0。
    // !上面的说法有无，其实循环完成后，i-1就是基数的索引。
    while (l <= r) { // TODO 为什么需要等于
      while (arr[l] < current) { // *循环，指向大于等于基数的
        l++;
      }
      while (arr[r] > current) {// *循环，找到小于等于基数的
        r--;
      }
      // console.log(l, r);
      if (l <= r) { // TODO 为什么需要等于
        // *使用位运算会出错，因为遇到l=r的情况就会出错
        const temp = arr[l];
        arr[l] = arr[r];
        arr[r] = temp;
        l++;
        r--;
      }
    }
    // console.log(arr, l, r, 'last');
    quickSort(arr, start, l - 1); // *其实这里完成后l-1就是基数的索引，
    quickSort(arr, l, end);
  }

  quickSort(nums);
  return nums;
};
// console.log(sortArray([9, 82, 1, 24, 7]));

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

// // console.log(quickSortRuanYiFeng([1,2,3,12,123,1,5,4,534,5,-12,21,-6]));

// !这是官方的做法 大概的思路是随机选择一个基数，然后将基数直接于最后一个元素交换。而且对于两个指针的声明也不一样了，不再是一左一右两个指针，而是一前一后，将i声明为l-1, j声明为l, 遇到比基数大的值+1, 最后形成 [i+1,j] 的元素都大于基数的情况。

// !我觉得这种比第一种好理解一些
export function quickSortOfficial(nums: number[], l: number = 0, r: number = nums.length - 1): number[] {
  if (r <= l) return nums;

  // *交换函数，因为使用了位运算，所以要判断两个索引是否一致，如果都指向一个元素就不会进行交换。
  function swap(arr: number[], i: number, j: number) {
    if (i === j) return;
    arr[i] = arr[i] ^ arr[j];
    arr[j] = arr[i] ^ arr[j];
    arr[i] = arr[i] ^ arr[j];
  }

  // *随机选择基数
  const pivotIndex = Math.round(Math.random() * (r - l)) + l;
  const pivot = nums[pivotIndex];
  // *声明两个指针一个指向 l-1 , 一个指向 l
  let i = l - 1;
  let j = l;
  // console.log(nums, pivot, pivotIndex, l, r, 'first');
  //  *交换基数和最后一个元素
  swap(nums, pivotIndex, r);
  // !这个代码看着真的简洁， 真的只有这么点
  while (j < r) {
    // !注意，这里的情况都是升序  遇到比基数的大的 j 就加1，让 [i+1,j] 这个区间都是大于基数的。
    if (nums[j] > nums[r]) j++;
    // !如果遇到小于等于基数的，那么就放到右边
    else {
      // !先让 i 加1，然后交换i与j，因为 i+1 大于基数， 然后目前的 j 小于基数，这个时候进行交换了，又变成了 [i+1,j]这个区间大于基数的情况
      i++;
      swap(nums, i, j);
      // !注意交换后记得让 j 加1 不然遇到相等的两个元素会陷入死循环。
      j++;
    }
  }
  // !最后直接让 i+1 与 基数进行交换。 交换后 i+1 就是当前基数的位置。
  // !注意 i指针没有移动的情况也是可以应付的，因为 i 指针最小的情况是 -1 所以 i+1 = 0
  swap(nums, i + 1, r);
  // console.log(nums, 'last');
  quickSortOfficial(nums, l, i);
  quickSortOfficial(nums, i + 2, r); // !注意这里是 i+2
  return nums;
}

// // console.log(quickSortOfficial([2, 2, 1, 42, 3, 9]));
