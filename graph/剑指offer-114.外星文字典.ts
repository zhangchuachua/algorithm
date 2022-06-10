// *剑指 Offer II 114. 外星文字典 https://leetcode.cn/problems/Jf1JuT/

// TODO 现在的主要是提升代码能力，算法先放一阵吧
export function alienOrder(words: string[]): string {
  if (words.length === 1) return words[0];
  let valid = true;
  const edges = new Map<string, string[]>();
  words.forEach(word => {
    for (const i of word) {
      if (!edges.has(i)) edges.set(i, []);
    }
  })

  function addEdges(prev: string, next: string): void {
    const length1 = prev.length;
    const length2 = next.length;

    const minLength = Math.min(length1, length2);
    let i = 0;

    while (i < minLength) {
      if (prev[i] !== next[i]) {
        (edges.get(prev[i]) as string[]).push(next[i]);
        break;
      }
      i++;
    }
    if (i === minLength && length1 > length2) valid = false;
  }

  for (let i = 1; i < words.length && valid; i++) {
    addEdges(words[i - 1], words[i]);
  }
  const head = words[0][0];
  const order: string[] = [head];
  console.log(edges)
  function dfs(char: string) {
    const t = edges.get(char);
    if (!t || !t.length) return;
    for (let i of t) {
      if (order.includes(i)) {
        valid = false;
        return;
      }
      order.push(i);
      dfs(i);
    }
  }

  dfs(head);

  if (!valid) return "";
  return order.join('');
};


console.log(alienOrder(['zy', 'zx']));
