// *这个算法可太简单了
function intersection(nums1: number[], nums2: number[]): number[] {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  return [...set1].filter(item => {
    return set2.has(item);
  })
};

// *官方除了使用set方法外，还使用了一种方法，双指针遍历法，先把两个数组进行排序，然后定义两个指针分别从排序后的数组开始遍历。
// *每次遍历，都比较大小，如果有相等的，那么就属于交集，放到数组中，并且向前移动一位。我这里偷懒了，放到了set里面，如果是放到数组里面，还要
// *先判断里面是否有相同的值。如果不相等的话，那么就让比较小的向前移动一位。只到一个数组遍历完毕。因为是排过序的，而且两两相比，
// *那么一个数组遍历完成后，必然得出了交集。很好理解
function intersectionNoSet(nums1: number[], nums2: number[]): number[] {
  nums1 = nums1.sort((a, b) => a - b); // 升序排序
  nums2 = nums2.sort((a, b) => a - b);
  let index1 = 0;
  let index2 = 0;
  const res = new Set<number>();
  while (index1<nums1.length && index2<nums2.length) {
    const n1 = nums1[index1];
    const n2 = nums2[index2];
    if (n1 === n2) {
      res.add(n1);
      index1++;
      index2++;
    } else if (n1 > n2) index2++;
    else index1++;
  }
  return [...res];
}

console.log(intersectionNoSet([4,7,9,7,6,7], [5,0,0,6,1,6,2,2,4]))
