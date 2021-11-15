// !堆排序的问题在于如何构建最小堆，最大堆。只要能够构建出来就很简单了。
// !注意，使用class类的方式来构建堆，在用来排序性能其实不是很好，因为需要现遍历数组将数组中的值放到堆中，然后还要再遍历数组将值取出来。 所以对于一个已有的 number数组 应该直接将这个数组转化为堆，而不是重新构建一个堆。

export class MaxHeap {
  readonly maxHeap: number[];

  constructor(arr: number[] = []) {
    if (MaxHeap.isMaxHeap(arr)) this.maxHeap = arr;
    else throw new Error('not a maxHeap');
  }

  // !这是最开始的插入操作，但是这是错误的。 插入操作一定不能从前插入，需要从后插入。因为第一，会把数组其他元素统统向后移动一位影响性能，第二，会造成堆结构的错误。因为数组的元素的索引发生变化时，一些元素的父元素就发生了变化，导致有时候父元素小于子元素了。堆也就错了。
  // insert(num: number) {
  //   this.maxHeap.unshift(num);
  //   this.shiftDown(0);
  // }

  insert(num: number) {
    this.maxHeap.push(num);
    this.shiftUp(this.maxHeap.length - 1);
  }

  pop() {
    if (!this.maxHeap.length) return undefined;
    const res = this.maxHeap[0];
    this.maxHeap[0] = this.maxHeap.pop() as number;
    this.shiftDown(0);
    return res;
  }

  peek() {
    return this.maxHeap[0];
  }

  size() {
    return this.maxHeap.length;
  }

  private shiftDown(index: number) {
    const leftChild = index * 2 + 1;
    const rightChild = index * 2 + 2;
    if (this.maxHeap[leftChild] !== undefined && this.maxHeap[leftChild] > this.maxHeap[index]) {
      this.swap(leftChild, index);
      this.shiftDown(leftChild);
    }
    // *注意 这里不能使用else，不然执行了上面就不会执行这里了  如果遇到 右子树 > 左子树 > index 的情况，就会乱序。
    if (this.maxHeap[rightChild] != undefined && this.maxHeap[rightChild] > this.maxHeap[index]) {
      this.swap(rightChild, index);
      this.shiftDown(rightChild);
    }
  }

  private shiftUp(index: number) {
    if (index <= 0) return;
    const parentIndex = index - 1 >> 1;
    if (this.maxHeap[parentIndex] < this.maxHeap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  private swap(i: number, j: number) {
    if (i === j) return;
    this.maxHeap[i] = this.maxHeap[i] ^ this.maxHeap[j];
    this.maxHeap[j] = this.maxHeap[i] ^ this.maxHeap[j];
    this.maxHeap[i] = this.maxHeap[i] ^ this.maxHeap[j];
  }

  static isMaxHeap(nums: number[]): boolean {
    if (nums.length <= 1) return true;
    for (let i = nums.length - 1; i >= 0; i--) {
      const parentIndex = (i - 1) >> 1;
      console.log(parentIndex, i, nums[parentIndex], nums[i]);
      if (nums[parentIndex] < nums[i]) return false;
    }
    return true;
  }
}

export function heapSortClass(nums: number[]): number[] {
  const heap = new MaxHeap();
  nums.forEach(item => heap.insert(item));
  // *因为使用的是最大堆，所以先pop出的是最大值，所以map出来的是一个降序的数组，所以使用了 reverse
  return nums.map(() => heap.pop() as number).reverse();
}

// *这里就是 将数组转化为堆，然后再进行取最大值。
function heapSortHeapify(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  // *leetcode 上一些个人的题解，用于格式化数组生成最大堆，性能与下面那种差不多。
  // function heapify(nums: number[]) {
  //   for (let i = 1; i < nums.length; i++) {
  //     let parent = (i - 1) >> 1;
  //     let child = i;
  //     while (child > 0 && nums[child] > nums[parent]) {
  //       swap(parent, child);
  //       child = parent;
  //       parent = (parent - 1) >> 1;
  //     }
  //   }
  // }

  function heapify(arr: number[]) {
    // *因为堆是一个完全二叉树，所以这里得到最后一个有子树的节点。然后开始向前遍历。   就不用去遍历那些没有子树的节点了。
    // *对于一个完全二叉树，找到最后一个有子树的节点的索引值的方式为： Math.floor(nums.length/2)-1
    for (let i = (arr.length >> 1) - 1; i >= 0; i--) {
      shiftDown(i);
    }
  }
  // *这个函数就是 堆里面进行整理的函数。 因为我们从有子树的节点进行比较，所以遇到符合条件，就应该把节点向下移动，所以是shiftDown  而不是 shiftUp， shiftUp用于向上移动
  // *使用shiftUp也可以完成堆的整理。  但是这里选择 shiftDown 是因为 堆 pop时也需要用到 shiftDown 一举两得。(注意看下面，这只是一个方面）
  // !这里补充，感觉shiftUp并不能在这里的情况下完成堆的整理，因为这里是从中间节点开始的，而不是从最后一个节点开始的，中间节点有下移的空间。但是如果上移的话，后面的节点并没有进行排序，所以不能保证可以完成堆的整理。  如果需要使用上移的话，最好从最后一个开始。 但是那样循环次数会增加。
  const shiftDown = (i: number) => {
    const lChild = (i << 1) + 1;
    const rChild = (i << 1) + 2;
    if (nums[lChild] !== undefined && nums[lChild] > nums[i]) {
      swap(lChild, i);
      shiftDown(lChild);
    }
    if (nums[rChild] !== undefined && nums[rChild] > nums[i]) {
      swap(rChild, i);
      shiftDown(rChild);
    }
  };
  const swap = (i: number, j: number) => {
    if (i === j) return;
    nums[i] = nums[i] ^ nums[j];
    nums[j] = nums[i] ^ nums[j];
    nums[i] = nums[i] ^ nums[j];
  };

  heapify(nums);
  return nums;
}

