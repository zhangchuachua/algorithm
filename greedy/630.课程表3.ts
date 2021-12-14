class MaxHeap {
  readonly heap: number[];

  constructor() {
    this.heap = [];
  }

  push(param: number) {
    this.heap.push(param);
    this.shiftUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const tmp = this.heap[0];
    this.heap[0] = this.heap.pop() as number;
    this.shiftDown(0);
    return tmp;
  }

  shiftUp(i: number) {
    // !!注意这里，就是因为这里卡了很久，而且在元素少的时候，还不能发现问题，只有元素多了这里才会出错。
    const parentIndex = (i - 1) >> 1;
    const parent = this.heap[parentIndex];
    if (parent !== undefined && parent < this.heap[i]) {
      this.swap(i, parentIndex);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(i: number) {
    const leftIndex = i * 2 + 1;
    const rightIndex = i * 2 + 2;
    if (
      this.heap[leftIndex] !== undefined &&
      this.heap[i] < this.heap[leftIndex]
    ) {
      this.swap(i, leftIndex);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] !== undefined &&
      this.heap[i] < this.heap[rightIndex]
    ) {
      this.swap(i, rightIndex);
      this.shiftDown(rightIndex);
    }
  }

  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  total() {
    return this.heap.reduce((prev, next) => prev + next, 0);
  }

  size() {
    return this.heap.length;
  }
}

export function scheduleCourse(courses: number[][]): number {
  let total = 0;
  courses.sort(
    ([duration1, lastDay1], [duration2, lastDay2]) => lastDay1 - lastDay2
  );
  const maxHeap = new MaxHeap();
  for (let i of courses) {
    const [duration, lastDay] = i;
    if (duration > lastDay) continue;
    if (total + duration <= lastDay) {
      total += duration;
      maxHeap.push(duration);
    } else if (maxHeap.heap[0] > duration) {
      const currentMaxDuration = maxHeap.pop() as number;
      total = total - currentMaxDuration + duration;
      maxHeap.push(duration);
    }
  }
  return maxHeap.size();
}

console.log(
  scheduleCourse([
    [100, 200],
    [200, 1300],
    [1000, 1250],
    [2000, 3200],
  ])
);
