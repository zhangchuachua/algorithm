import { Node } from "./base";
// !芜湖！一次性通过
// !这个题的难点，应该在如何存储遍历过的节点 因为 Node 是一个class 每new一个就是一个独立的。 但是这道题目中的图的节点是互相连接的，而且需要深克隆出来，所以需要存储节点。 那么既要保证这个节点被遍历过了，又要存储节点。！那么使用map这个数据结构再合适不过了！注意：题目中给出了条件，节点的val不会重复。  注意：我这里使用的是广度优先遍历，不清楚深度优先遍历是否可行，应该是可行的
function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;
  // *广度优先遍历使用 队列 ，第一个队列，用于把所有的节点遍历，并且将节点存储起来
  let queue = [node];
  // *第二个队列，用于存储遍历的顺序，为什么要存储遍历的顺序，看下面
  let queue2 = [node];
  // !map用来过滤已经访问过的节点的同时，存储节点
  const map = new Map([[node.val, new Node(node.val)]]);
  // !第一个循环，用于把所有的节点实例化。 使用一个循环，虽然可以遍历到所有的节点，但是遍历一遍节点后，并不能有效的还原 节点的 neighbors 属性。比如第一个节点 node 第一次出队后，就再也访问不到了，neighbors属性也就不能填充。  这里就解释了为什么需要两个队列
  while (queue.length) {
    // 出队
    const node = <Node>queue.shift();
    node.neighbors.forEach(n => {
      if (!map.has(n.val)) {
        // *存储节点
        map.set(n.val, new Node(n.val));
        queue.push(n);
        // *存储顺序
        queue2.push(n);
      }
    });
  }
  // *第二个循环，用于填充节点的 neighbors 属性
  while (queue2.length) {
    const node = <Node>queue2.shift();
    // *获得当前的node
    const current = <Node>map.get(node.val);
    node.neighbors.forEach(n => {
      // *然后把当前node的neighbors都放进去
      current.neighbors.push(<Node>map.get(n.val));
    });
  }
  // *因为这是一个连通图，可以从给出的节点访问到所有的节点，所以这里返回第一个节点就可以了。
  // *不确定返回其他的节点是正确的不。没有试过，但是都是互相连通的
  return <Node>map.get(node.val);
}

