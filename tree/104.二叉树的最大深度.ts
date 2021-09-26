import TreeNode from "./TreeNode";

// !这是我自己的做法，其实整体来说，与深度优先遍历是差不多的，只是缺少一些优化而已。我这里将于下面视频中的代码比较着解释一下，因为整体来说 确实是差不多的。  但是我的耗时和内存上的消耗确实是略多于视频的做法的，还是视频的做法更优一点。
function maxDepth(root: TreeNode | null) {
  if (!root) return 0;// 这里我是先判断了为空的情况，其实下面那种更简单，直接定义 深度为0 然后再递归函数中进行判断，如果为空就返回。 那么就可以再最后直接返回变量。

  // !这里下面直接定义了一个depth变量，用来存储层级。这里就是我与视频里面代码差异最大的地方。因为需要修改外部的变量，当时因为前几次的尝试，修改变量总是左右子树都会导致修改，最后输出的数字都会变大。

  function a(root: TreeNode, depth: number) {// *这里就是递归函数，基本都是一样，就是把所有的节点都会遍历到。这里的递归函数最重要的一点，就是需要传入这一个 深度，因为传入的深度才代表它当前的深度，无论左右子树都不会影响最终结果，不然就会出现我最开始的情况。
    let leftDep = depth;// *就是这两步让我的内存消耗变多， 因为我再内部定义层级。
    let rightDep = depth;
    if (root.left) leftDep = a(root.left, depth + 1); // *进行递归
    if (root.right) rightDep = a(root.right, depth + 1);
    return Math.max(leftDep, rightDep, depth);// *返回当前的层级
  }

  return a(root, 1); // *进入递归
}


function maxDepthVideo(root: TreeNode | null) {
  let depth = 0;

  function dfs(root: TreeNode | null, level: number) {
    if (!root) return;
    if (!root.left && !root.right) depth = Math.max(depth, level); // !这里让root是叶子节点时才更新层级，不然每次遇到一个节点就更新会让时间消耗变大。
    dfs(root.left, level + 1);
    dfs(root.right, level + 1);
  }

  dfs(root, 1);
  return depth;
}
