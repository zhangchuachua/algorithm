// !堆排序的问题在于如何构建最小堆，最大堆。只要能够构建出来就很简单了。

import { quickSortOfficial } from "./quickSort快速排序";
import { isEqual } from 'lodash';

export class MaxHeap {
  readonly maxHeap: number[];

  constructor(arr: number[] = []) {
    if (MaxHeap.isMaxHeap(arr)) this.maxHeap = arr;
    else throw new Error('not a maxHeap');
  }

  insert(num: number) {
    this.maxHeap.unshift(num);
    this.shiftDown(0);
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

const heap = new MaxHeap();
const length = 50;
const nums = [48, 48, -20, 20, -38, 20, -42, -3, 34, 0, -21, -29, -47, 35, -43, 11, -18, -25, -45];
// const nums = Array.from({ length: length }, v => {
//   let res = Math.round(Math.random() * length);
//   if (Math.round(Math.random())) return res;
//   else return ~res + 1;
// });
// console.log(nums);
for (let i of nums) {
  heap.insert(i);
  // const isOK = MaxHeap.isMaxHeap(heap.maxHeap);
  // if (!isOK) {
  //   console.log(isOK, i);
  //   break;
  // }
}
console.log(heap.maxHeap);
// const heapRes = nums.map(() => {
//   return heap.pop();
// });
// console.log(heapRes);
// const official = quickSortOfficial(nums);
// console.log(isEqual(heapRes, official),heapRes);
