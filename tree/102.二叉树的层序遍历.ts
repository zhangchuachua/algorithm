import TreeNode from "./TreeNode";

// *自己的做法，其实就是跟广度优先遍历类似，但是我这里遍历就不是一个节点 一个节点遍历了 而是一层一层遍历
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const arr: number[][] = [];
  const level = [[root]]; // *这里存储每一层的节点。
  while (level.length) {
    const list = level.shift() as TreeNode[]; // *取出当前层
    const a: TreeNode[] = [];
    arr.push(list.map(node => { // *这里遍历每一层的节点
      if (node.left) a.push(node.left); // *对每一个节点进行判断 如果存在就压入数组
      if (node.right) a.push(node.right);
      return node.val;
    }));
    if (a.length) level.push(a); // *将数组压入 存储每一层节点的数组
  }
  return arr;
};

// !这是视频里面的做法。大概的思路是差不多的，都是使用的广度优先遍历。但是这个更巧妙一点。虽然说 两者的时间复杂度和空间复杂度是差不多的。
function levelOrderOptimization(root: TreeNode | null): number[][] {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];// *同样的声明一个队列。注意 他这里没有存储每一层的节点，而是存储的层级
  const res: number[][] = []; // !这个变量很重要
  while (queue.length) {
    const [root, depth]: [TreeNode, number] = <[TreeNode, number]>queue.shift(); // 出栈
    if (!res[depth]) { // !这里的判断很巧妙，因为他没有存储每一层的节点，存储的层级，所以就按照层级对数组赋值，比如 根节点的层级为0 先进行判断，如果 res[0] 为undefined 那么就压入一个数组 数组里面有当前的节点的val
      res.push([root.val]);
    } else res[depth].push(root.val); // !如果当前层级有数组了 就直接压入这个数组
    // !虽然我上面多了一个循环 但是我循环的次数更少， 其实性能是差不多的，比如这里还是会对每个节点进行if判断 我上面也是一样的
    if (root.left) queue.push([root.left, depth + 1]);
    if (root.right) queue.push([root.right, depth + 1]);
  }
  return res;
}
