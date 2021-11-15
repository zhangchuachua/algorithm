// *计数排序的做法，效率比较一般 而且空间复杂度比较高  我这里的时间复杂度应该为: O((k+1)n+m); 这里的m为 max-min+1，k为前k个频繁的元素  空间复杂度为 O(m+k) 也就是两个数组的长度。
export function topKFrequent(nums: number[], k: number) {
  const max = Math.max(...nums);
  const min = Math.min(...nums);

  const arr = Array.from({ length: max - min + 1 }, () => 0);// *Array内部是有循环的，所以这里的时间复杂度也要计算上
  for (let i of nums) { // *循环n次
    arr[i - min]++;
  }
  const result: number[] = [];
  for (let i = 0; i < k; i++) {// *k为多少循环多少次
    const index = arr.indexOf(Math.max(...arr)); // *循环n次
    result.push(index + min);
    arr[index] = 0;// 把数量重置为0
  }
  return result;
}

// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));

// 这个方式的性能更差，应该是循环内部多次的Array.from() 及其findIndex
export function topKFrequentMap(nums: number[], k: number): number[] {
  const map = new Map();
  for (let i of nums) {
    if (!map.has(i)) map.set(i, 1);
    else map.set(i, map.get(i) + 1);
  }
  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    const mapArr = Array.from(map); // 为了每次的mapArr都是最新的
    const max = Math.max(...Array.from(map.values()));
    const index = mapArr.findIndex(item => {
      return item[1] === max;
    });
    result.push(mapArr[index][0]);
    map.set(mapArr[index][0], 0);// 将map内对应的元素的值设为0，重置数量，避免下次进行计算
  }
  return result;
}

// topKFrequentMap([1,2], 2);

// *这是视频中的第一种做法  效率比我的第一种方法会稍微好一点 时间复杂度为 O(n+K+m+mlogm) 不知道这里的计算是否正确，如下所示，m为map的长度。
export function topKFrequentVideo(nums: number[], k: number): number[] {
  const map = new Map<number, number>();
  for (let i of nums) {// *循环n次
    map.has(i) ? map.set(i, <number>map.get(i) + 1) : map.set(i, 1);
  }
  const arr = Array.from(map).sort((a, b) => b[1] - a[1]);// *from循环后再进行sort排序，所以循环次数应该是相加。
  return arr.slice(0, k).map(item => {// *循环k次
    return item[0];
  });
}

// !这个写法使用了堆，才是最符合这道题的解法，因为堆非常适合这种不需要全部排序，只提取部分符合要求的题目。这里根本就不需要全部排序，只需要前k个频率最大的元素，那么用堆刚刚好。 时间复杂度为 O(n+m+
export function topKFrequentHeap(nums: number[], k: number): number[] {
  if (nums.length < 2) return nums;
  const map = new Map<number, number>();
  for (let i of nums) {// *循环n次 提取出频率
    map.has(i) ? map.set(i, <number>map.get(i) + 1) : map.set(i, 1);
  }
  const arr = Array.from(map);
  // *将arr数组转换为最大堆。 这里具体的代码和解释在堆排序里面有。 i初始化为 (arr.length >> 1) - 1 是为了最后一个有叶子节点的节点，这是完全二叉树的特性。 这里为什么选这样的方式可以看堆排序算法中的注释
  for (let i = (arr.length >> 1) - 1; i >= 0; i--) {
    shiftDown(i); // 对该节点进行下移操作。
  }

  // *下移函数
  function shiftDown(i: number) {
    const leftNode = i * 2 + 1; // *左子节点右节点
    const rightNode = i * 2 + 2;
    // *这里是对频率进行排序，所以需要比较的是二维数组中的第二个元素
    while (arr[leftNode] && arr[leftNode][1] > arr[i][1]) {
      [arr[leftNode], arr[i]] = [arr[i], arr[leftNode]];
      shiftDown(leftNode);
    }
    while (arr[rightNode] && arr[rightNode][1] > arr[i][1]) {
      [arr[rightNode], arr[i]] = [arr[i], arr[rightNode]];
      shiftDown(rightNode);
    }
  }

  function pop() {
    const temp = arr[0];
    arr[0] = <[number, number]>arr.pop();
    shiftDown(0);
    return temp;
  }

  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    result.push((pop() as number[])[0]);
  }
  return result;
}

topKFrequentHeap([1, 1, 1, 2, 2, 3], 2);



