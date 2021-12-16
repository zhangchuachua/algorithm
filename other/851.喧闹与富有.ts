// !使用了 图 的广度优先遍历

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

// TODO还有一种拓扑排序 可以看一下 听都没有听过
