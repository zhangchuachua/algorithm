import TreeNode from "./TreeNode";

// !二叉搜索树定义：就是左子树都小于根节点，右子树都大于根节点；然后左右子树依然为二叉搜索树。

// *这个太简单了，没啥说的，只要明白了二叉搜索树的定义就可以了。
export function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null;
  if (root.val === val) return root;
  return searchBST(val > root.val ? root.right : root.left, val);
}

const tree: TreeNode = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1,
      left: null,
      right: null
    },
    right: {
      val: 3,
      left: null,
      right: null
    }
  },
  right: {
    val: 7,
    left: null,
    right: null
  }
};

console.log(searchBST(tree, 2));
