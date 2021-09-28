import TreeNode from "./TreeNode";

// *最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
// *这道题应该使用广度优先遍历才是最优解，结果我还是使用的深度优先遍历，性能会差很多。
// !深度优先遍历是递归，函数一层一层嵌套会先深入到叶子节点才进行返回。
// !广度优先遍历则是一层一层的进行遍历，每一层都可以进行返回。使用到队列这个数据结构
function minDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res: number;
  const queue = [{ node: root, depth: 1 }]; // !最重要的就是利用了 队列 的先进先出，先进根节点，出根节点，然后进左右子树，然后出左右子树，这样循环下来，就是按照每一层来进行遍历的。
  while (queue.length) {
    const { node, depth } = <{ node: TreeNode, depth: number }>queue.shift();
    if (!node.left && !node.right) res = depth; // !正是因为按照每一层进行遍历 这里才敢直接返回
    if (node.left) queue.push({ node: node.left, depth: depth + 1 });
    if (node.right) queue.push({ node: node.right, depth: depth + 1 });
  }
  // @ts-ignore
  return res ?? 0;
}
