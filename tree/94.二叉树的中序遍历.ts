import TreeNode from "./TreeNode";
// !中序遍历 没啥好说的。 使用非递归代码。 按照中序遍历规则走。
function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const stack = [root];// *先压入一个根节点。
  const res:number[] = [];
  let p: TreeNode | null = root.left;
  while (stack.length || p) { // !这里的两个条件都需要，忘记为啥可以看 ./base.ts
    while (p) {// *先对左子树进行中序遍历，中序遍历就会遍历到访问到最深的左叶子节点，所以这里不断的让 p = p.left 就可以了
      stack.push(p);
      p = p.left;
    }
    const node = <TreeNode>stack.pop(); // !这里 左子树中序遍历完成 访问根节点
    res.push(node.val);
    if(node.right) p = node.right; // *如果又右子树就再对右子树进行中序遍历。
  }
  return res;
};
