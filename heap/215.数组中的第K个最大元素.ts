// *这里可以采用堆的方法来做，使用最小堆，最大堆都可以做
// *这里也可以采用排序的方法来做
// !其实对这种 “只需要取一个元素” 的情况来说，  “使用堆的方法好一些”，因为堆并不是完整的进行排序，它的左右子树并没有规定顺序，所以排序的复杂度相对来说小一些。 但是排序都是让整个数组进行排序，复杂度也就大了起来。

import MinHeap from "./minHeap";

//* 最小堆的做法 堆的 insert 和 pop 时间复杂度都是 O(logn) 也就是堆的大小， 所以在这里时间复杂度为 O(nlogk) 空间复杂度为 O(k);
// !为什么 insert 和 pop 方法的时间复杂度都是 logn呢 其实 logn 一般都是以2为底，所以可以看做，每一次循环都可以剔除掉一半的数据，那么就是 执行的次数比如有n个数据 第一次剔除 4 个 第二次剔除2个 第三次剔除1个 所以一共执行三次 2^x = n; x = logn。比如这里因为堆其实就是排序后的树， insert 插入只需要比一个子树大就可以了，所以就相当于剔除了另一个子树。
function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap();
  nums.forEach(n => {
    heap.insert(n);
    if (heap.size() > k) heap.pop();
  });
  return <number>heap.peek();
};

// *排序做法，也学习一下如何进行排序
