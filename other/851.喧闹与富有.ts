// !使用了 图 的广度优先遍历，深度优先遍历，重点是深度优先遍历

// !这个解法能够解出来，但是执行耗时和内存消耗都有点差，时间复杂度应该是 O(n^2) 空间复杂度应该也是 O(n^2) ? 不很确定
// !力扣题解中使用了深度优先遍历。但是好像时间复杂度为 O(m+n) n 是 quiet 的长度， m 是 richer 的长度。 空间复杂度也是 O(m+n)
// *思路还是比较简单，因为需要返回一个数组，找出当前比当前索引更有钱的人中最安静的那个人。比如说索引为0时，有 4,5,6 这三个人比他有钱，其中 5 最安静 所以返回 5.  我这里的想法很简单：就是先使用 map 遍历 richer 数组，找出每个人对应的对比。也就是 key 为当前的人，value为那些人比他有钱。 其实这样的数据结构就是图了，value就是当前key能够达到的地方，也就是比他富有的人。
// *然后构建数组，使用了图的广度优先遍历，不断的比较 比它有钱的人的 quiet ，最终找出最安静的人返回， 注意！比它有钱的人应该包含了自己，所有初始值应该为自己的索引值。
export function loudAndRich(richer: number[][], quiet: number[]): number[] {
  const map = new Map<number, number[]>();
  for (let i of richer) {
    const [rich, poor] = i;
    if (!map.get(poor)) map.set(poor, [rich]);
    else {
      (map.get(poor) as number[]).push(rich);
    }
  }

  function bfs(index: number, map: Map<number, number[]>): number {
    let i = index;
    const queue = [i];
    const visited = new Set<number>();
    visited.add(i);
    while (queue.length) {
      const node = queue.shift() as number;
      map.get(node)?.forEach((richer) => {
        if (quiet[i] > quiet[richer]) i = richer;
        if (!visited.has(richer)) {
          queue.push(richer);
          visited.add(richer);
        }
      });
    }
    return i;
  }

  return Array.from({ length: quiet.length }, (val, i) => {
    if (!map.get(i)) return i;
    return bfs(i, map);
  });
}

// !经过思考，这里确实是用深度优先遍历会优于广度优先遍历
// *针对于上面的优化，其实很简单的一个点，依旧使用广度优先遍历。
// *时间复杂度： 不知道如何计算时间复杂度，有点复杂，因为每一次bfs只能够得出当前索引的结果，如果遇到 [[0,[1,2,3,4]], [1,[2,3,4]], [2,[3,4]], [3, [4]]] 这样的图的话，那么每次 bfs 都会进入遍历所有的节点。 索引为 0 时，会遍历，1,2,3,4;2,3,4;,3,4;4 依此类推。空间复杂度为 O(m+n)
// !深度优先遍历的时间复杂度为： O(m+n) 仔细去看下面的深度优先遍历代码
export function loudAndRichOptimization(
  richer: number[][],
  quiet: number[]
): number[] {
  // *这里还是一样，先建立图，我是用的 map 进行建立。 大概的结构为 key 是当前的人对应的索引值， value 为比这个人更富有的人的索引值数组。
  const map = new Map<number, number[]>();
  for (let i of richer) {
    const [rich, poor] = i;
    if (!map.get(poor)) map.set(poor, [rich]);
    else {
      (map.get(poor) as number[]).push(rich);
    }
  }

  // *bfs广度优先遍历。
  function bfs(index: number, arr: number[]): number {
    let i = index;
    const queue = [i]; // *使用一个队列来控制循环，因为队列先进先出的特性可以满足广度优先遍历。
    while (queue.length) {
      const node = queue.shift() as number; // *将当前的索引值出队
      if (arr[node] !== undefined) {
        // !这里就是与上面不一样的地方: 上面使用了一个 set 用来过滤已经遍历过的索引，比如说有当前这样一个 map: [[1,[0]], [2,[0,1], [3,[0,1,2,7], [4, [0,1,2,3]] 因为遍历都是从小到大，所以就会一直遇到 0 如果还是上面的使用 set 来过滤的话，那么每次都会进入下面的 forEach 循环，浪费很多时间。 但是这里，如果当前已经有结果了，那么久进行下面的条件判断。
        // !首先，我们要知道 arr 数组中，存储的都是，在比当前 元素 富有的 元素中，找到最安静的哪个元素。 比如说，当前索引为 3，我们需要找到比 3 更富有中，最安静的哪个人，所以我们就需要找到 [0,1,2,7] 中最安静的，因为 [0, 1, 2] 都已经有值了，就不必去进入下面的forEach循环，只需要比较 [0,1,2] 的结果就行了，只有 7 需要进入下面的 forEach 循环，找到所有比 7 更富有的元素，在进行判断。 所以这里的 if 判断，还需要比较一下。
        if (quiet[i] > quiet[arr[node]]) i = arr[node]; // ! 注意： arr[node] 才是结果
        continue;
      }
      map.get(node)?.forEach((rich) => {
        if (quiet[i] > quiet[rich]) i = rich;
        queue.push(rich);
      });
    }
    return i;
  }

  const answer: number[] = [];

  for (let i = 0; i < quiet.length; i++) {
    if (!map.get(i)) answer[i] = i;
    // *如果当前没有比他更富有的元素，就直接返回该元素的索引
    else answer[i] = bfs(i, answer);
  }

  return answer;
}

// !深度优先遍历
// TODO 看题解上面说时间复杂度为 O(m+n) 我在这里也不知道是如何计算出来的 可以多看看题解看看到底是多少
// !它的优势主要在于，每一次递归都会得出当前索引的结果，在函数内部直接给当前索引赋值。 回到上一层之后，就不需要
// !还是刚刚哪个例子：[[0,[1,2,3,4]], [1,[2,3,4]], [2,[3,4]], [3, [4]]] 在索引为0时，直接进入深层: 1,[2,3,4] -> 2,[3,4] -> 3,[4] -> 4 然后得出 4 的结果，开始返回上层，得出 3 的结果，然后继续得出 2 的结果，得出 1 的结果，最后得出 0 的结果，然后再向后遍历时，因为已经有结果了，就直接返回。
export function loudAndRichDFS(richer: number[][], quiet: number[]): number[] {
  const map = new Map<number, number[]>();
  for (let i of richer) {
    // *依旧建图
    const [rich, poor] = i;
    if (!map.get(poor)) map.set(poor, [rich]);
    else {
      (map.get(poor) as number[]).push(rich);
    }
  }

  // *深度优先遍历
  function dfs(index: number, arr: number[]): void {
    if (arr[index] !== undefined) return; // *如果当前索引已经有结果了，就直接进行返回
    arr[index] = index; // *初始值为自己
    map.get(index)?.forEach((rich) => {
      // *获得比自己更富有的索引数组
      dfs(rich, arr); // !递归调用，去求比自己更富有的结果。
      if (quiet[arr[index]] > quiet[arr[rich]]) arr[index] = arr[rich]; // !只需要比较结果就可以了 要清楚数组的元素的含义。就可以很好理解
    });
  }

  const answer: number[] = [];
  for (let i = 0; i < quiet.length; i++) {
    dfs(i, answer);
  }
  return answer;
}

// console.log(
//   loudAndRichDFS(
//     [
//       [1, 0],
//       [2, 1],
//       [3, 1],
//       [3, 7],
//       [4, 3],
//       [5, 3],
//       [6, 3],
//     ],
//     [3, 2, 5, 4, 6, 1, 7, 0]
//   )
// );

// TODO 还有一种拓扑排序 可以看一下 听都没有听过
