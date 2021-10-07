import TreeNode from "./TreeNode";

// !不是递归的做法在最下面

// *就是简单的深度优先遍历，其实在二叉树中，与先序遍历差不多。
// !重点是思维方式，比如这里使用函数的嵌套也就是 递归函数来传递每一层参数的状态很重要。 比如这里每一层都传递currentSum表示每一层的路径数，这很重要，让代码简洁很多。  而且还有使用外部变量来优化代码。 比如这里使用res外部变量来存储当前的状态。如果有相同的直接在函数内部等于true就是了，就不再需要返回值。
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;
  let res = false;

  function loop(root: TreeNode, currentSum: number) {
    const sum = root.val + currentSum;
    if (!root.left && !root.right && sum === targetSum) res = true;
    // *这里算是一个节约性能的做法，如果res为true了就不再继续递归了
    if (!res && root.left) loop(root.left, sum);
    if (!res && root.right) loop(root.right, sum);
  }

  loop(root, 0);
  return res;
};

// !这里是一种优化， 使用了函数本身作为递归的函数。实现了我一直想做的事情:为什么递归的不能是这个函数本身呢？ 这个优化也太节省空间复杂度了把
function hasPathSumOptimization(root: TreeNode | null, targetSum: number): boolean {
  // 如果为空就直接返回false
  if (!root) return false;
  // *如果是叶子节点 就返回当前的val是否等于targetSum
  if (!root.left && !root.right) return root.val === targetSum;
  // *对左子树或者右子树进行遍历，注意这里是先遍历左子树，如果左子树有结果了，就不会执行 || 后面的函数了，已经打印实验过了。
  // !时间复杂度优化也拉满了  但是感觉逐层返回的性能会受到一丝影响
  return hasPathSumOptimization(root.left, targetSum - root.val) || hasPathSumOptimization(root.right, targetSum - root.val);
}

// !不是递归的做法
var hasPathSumNotRecursive = function (root: TreeNode | null, targetSum: number) {
  if (!root) return false;
  // 创建两个队列
  // 用来存储节点
  let nodeQue = [];
  // 用来存储根节点到这个节点的总和
  let valQue = [];

  // 先将根节点入队列
  nodeQue.unshift(root);
  valQue.unshift(root.val);

  while (nodeQue.length > 0) {
    // 将队头元素取出来得到节点root和值temp
    let root = <TreeNode>nodeQue.pop();
    let temp = <number>valQue.pop();

    // 如果这个节点是叶子节点（没有左右孩子）
    if (!root.left && !root.right) {
      // 如何符合要求返回true 并 退出函数
      if (temp === targetSum) return true;
      // 不满足要求 下面的都不会满足，就进行下一轮循环了
    }
    // 有左孩子就进来
    if (root.left) {
      // 左孩子进队列
      nodeQue.unshift(root.left);
      // 保存此时路径总和
      valQue.unshift(root.left.val + temp);
    }
    // 有右孩子就进来
    if (root.right) {
      // 右孩子进队列
      nodeQue.unshift(root.right);
      // 保存此时路径总和
      valQue.unshift(root.right.val + temp);
    }
  }
  // 循环走完都没有返回true就说明没有符合要求的路径总和
  return false;

};
