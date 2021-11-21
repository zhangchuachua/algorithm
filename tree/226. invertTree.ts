import TreeNode from "./TreeNode";

// *一遍过~~  还是比较简单的，就是直接交换两个子树的值就可以了。  注意： [1,2] 像这种情况进行交换后值为 : [1,null,2]
// *时间复杂度为 o(n) n为每个节点的个数， 我们递归遍历会遍历每个节点所以为 o(n) 空间复杂度为  O(n) 还是函数递归调用堆栈的空间复杂度由递归层数决定，这里递归的深度最好为 O(logn) 因为同时遍历左右节点，但是最坏情况下：树成为链状，就会由 o(n)的深度
// *注意： 对于 [4,2,7,1,3,6,9] 里面的 [1,3,6,9] 是处于第三层的节点，光看指示图需要将一层整个翻转，也就是[9,6,3,1] 这样看来就不是反转两个子节点的问题了。 但是这么看 只是反转子节点就变成了 [3,1] [9,6] 然后 [2,7]再反转一次，就变成了 [9,6,3,1]所以这样其实是没有问题的
export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  invertTree(root.left);
  invertTree(root.right);
  [root.left, root.right] = [root.right, root.left];
  return root;
}
