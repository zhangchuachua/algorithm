// !贪心，难度hard，但是一直没有搞懂哪里运用了贪心的逻辑

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
    // !父亲节点的值应该是 (i - 1) /2 !!!
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

// !这个题首先要进行分析：假设有两门课程，[[d1,l1],[d2,l2]] 而且 l1<=l2, 当先学第一门，后学第二门时, 需要满足：d1 <= l1, d1 + d2 <= l2; 当先学 2 再学 1 时需要满足： d2 <= l2, d1 + d2 <= l1; 因为 l1 <= l2 所以 d1 + d2 <= l2 也是成立的， d1 + d2 <= l2 就是先学 1 再学 2 需要满足的，也就是说，这个情况下，先学 1 再学 2 也是可以的， 这里的表诉可能有点不清楚，可以自己琢磨一下。 所以说在 l1 <= l2 的情况下，最好的方案是 先学1 再学2。 所以这个时候就可以把题解了。我们只需要将下面的 数组，针对 lastDay 进行升序排序，然后按照顺序进行学习就可以了。通俗一点就是先学习最紧急的，最先结束的就是最紧急的。但是 对于 [[2,4], [5,7], [3,3]] 这样的情况来说，如果按照上面的策略，我们应该先学习 [3,3] 但是如果学习了 [3,3] 那么前两门就都不能学习了， 所以这个时候 我们就需要舍弃 [3,3] 舍弃的方式就是，舍弃最耗时的，也就是 duration 最大的， 所以就有了下面的代码
// *这道题开始想到了需要对数组进行排序，但是我进行排序的值是 lastDay - duration, 感觉这样才是最紧急，但是并没有通过，而且需要舍弃最耗时的这一步完全没有想到，后面是看了题解才懂了，感觉对于我这种基础的情况来说，还是只能多练。
export function scheduleCourse(courses: number[][]): number {
  let total = 0;
  courses.sort(
    ([duration1, lastDay1], [duration2, lastDay2]) => lastDay1 - lastDay2
  ); // *进行排序
  const maxHeap = new MaxHeap(); // !因为需要挑选出当前最耗时的课程，使用最大堆进行筛选。 开始代码逻辑对了但是一直没有通过，就是这里我堆的代码有问题！！！！！！！！！！！
  for (let i of courses) {
    const [duration, lastDay] = i;
    if (duration > lastDay) continue;
    if (total + duration <= lastDay) {// 如果当前的课程满足
      total += duration;// 就加上总耗时
      maxHeap.push(duration);// 添加到堆里面去
    } else if (maxHeap.heap[0] > duration) {// *如果当前的课程不满足条件，并且当前最耗时的课程，大于当前遍历课程的话，就舍弃之前最耗时的课程，重新学习当前遍历的课程
      const currentMaxDuration = maxHeap.pop() as number;
      total = total - currentMaxDuration + duration;
      maxHeap.push(duration);
    }
  }
  return maxHeap.size();// 最后返回堆的长度就是
}

console.log(
  scheduleCourse([
    [100, 200],
    [200, 1300],
    [1000, 1250],
    [2000, 3200],
  ])
);
