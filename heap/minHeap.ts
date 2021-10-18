// 最小堆，也就是当前节点小于等于子节点的值。
//* 暴露出来的方法有： 插入，删除栈顶，获取堆顶和堆的大小。还有一个静态方法判断是否为最小堆，传入一个数组，返回布尔值
export default class MinHeap<T> {
  readonly heap: T[];

  constructor(heap: T[] = []) {
    if (MinHeap.isMinHeap(heap)) this.heap = heap;
    else throw new Error('not is heap');
  }

  //* 插入函数
  insert(value: T) {
      this.heap.push(value); // *先把值放到末尾， 然后再用下面的函数进行交换
      this.shiftUp(this.heap.length - 1);
  }

  //* 删除堆顶函数
  pop() {
    if (!this.heap.length) return;
    this.heap[0] = <T>this.heap.pop();
    this.shiftDown(0);
  }

  // *获取堆顶
  peek = () => this.heap[0];
  // 获取堆的大小
  size = () => this.heap.length;

  private shiftDown(i: number) {
    const leftIndex = this.getLeftIndex(i);
    const rightIndex = this.getRightIndex(i);
    if (this.heap[leftIndex] && this.heap[i] > this.heap[leftIndex]) {
      this.swap(leftIndex, i);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] && this.heap[i] > this.heap[rightIndex]) {
      this.swap(rightIndex, i);
      this.shiftDown(rightIndex);
    }
  }


  // 判断是否需要交换
  private shiftUp(index: number) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  // 获取父节点
  private getParentIndex = (i: number): number => Math.floor((i - 1) / 2);

  private getLeftIndex = (i: number): number => i * 2 + 1;

  private getRightIndex = (i: number): number => i * 2 + 2;

  // 交换两个节点的值
  private swap(i1: number, i2: number) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }

  static isMinHeap<T>(heap: T[]): boolean {
    if (!heap.length || heap.length === 1) return true;
    for (let i = heap.length - 1; i >= 0; i--) {
      // *位运算
      const parentIndex = i >> 1;
      if (heap[parentIndex] > heap[i]) return false;
    }
    return true;
  }
}
