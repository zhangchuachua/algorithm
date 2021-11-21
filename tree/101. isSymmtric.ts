import TreeNode from "./TreeNode";

// *使用迭代（也就是循环）的方法完成算法， 大概思路是比较每一层，因为是镜像，也就是回文，回文有一个特点，就是反转后字符串不变。这里就是采取这样的方法，直接比较两边的节点的val值，然后同时向中间移动
export function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return false;
  let arr = [root.left, root.right];
  while (arr.length) {
    for (let i = 0, j = arr.length - 1; i < j; i++, j--) {// *使用for循环，定义两个索引，同时向中间移动，而不是新建数组，再反转数组，这样的话节省了内存
      if (arr[i]?.val !== arr[j]?.val) return false;
    }
    for (let i = arr.length - 1; i >= 0; i--) {// *这里也是一样，开始的做法是使用while循环遍历arr数组，然后使用临时数组保存压入的left，right，最后让arr = tmp. 使用这样的for循环，就不会使用临时数组。但是注意这里的 i = arr.length - 1 如果i=0的话，因为我们再过程中会一直向arr 压入元素，所以会导致循环次数错误的问题。  所以从后向前遍历。
      const node = arr.shift();
      if (node?.left !== undefined) arr.push(node.left);
      if (node?.right !== undefined) arr.push(node.right);
    }
  }
  return true;
}

const test: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null
    }
  },
  right: {
    val: 2,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null
    }
  },
};

// console.log(isSymmetric(test));

// *这是我看了视频的思路，但是没有看代码写的，可能逻辑性不是很强。
// !大致的思路是，因为是递归，每个函数互相独立，不能将一层的每个节点进行比较。 但是二叉树镜像的话，还有一种判断方式，那么就是判断树1的左子树和树2的右子树， 然后再判断树1的右子树和树2的左子树。 如果是镜像的，那么都会相等。
export function isSymmetricRecursive(root: TreeNode | null): boolean {
  if (!root) return true; // 这里为空时返回true或者false无所谓。
  // *新建函数，判断两个子树是否镜像。  也就是这个函数与视频中的有些不一样
  function isMirror(tree1: TreeNode | null, tree2: TreeNode | null): boolean {
    let b = true;// *这里需要声明一个变量，用来存储更深层次递归的结果
    if (tree1 && tree2) // *当两个节点都存在的时候才进行递归 如果没有这个判断，那么会陷入死循环
      b = isMirror(tree1?.left, tree2?.right) && isMirror(tree1?.right, tree2?.left); // *继续递归，注意这里的参数，与上面的规则是对应的。
    return b && tree1?.val === tree2?.val; // !这里的判断挺重要的。首先判断之前的结果。因为 && 遇到false就返回false，所以只要有一个地方返回false，那么就会一直返回false。  然后后面的val比较，当两个节点都有val时就比较val，当两个节点都为null时，两边都是 undefined 返回true，符合逻辑。 当两边一边为null，有val时就会返回false， 符合逻辑。
  }

  // 判断root的左子树与root的右子树是否镜像
  return isMirror(root.left, root.right);
}

// console.log(isSymmetricRecursive(test));

// *这是视频中的写法，逻辑性更强，更易懂。但是我开始一直没有理解到  还是对递归不熟悉！ 就是使用了镜像的另一种判断方式
export function isSymmetricRecursiveOfficial(root: TreeNode | null): boolean {
  if (!root) return true; // 这里返回false或true无所谓
  // *这个函数就是主要差异  我在递归方面还是差了一点，总是想不到这样的递归，这样的判断。 但是一看代码又懂了
  function isMirror(tree1: TreeNode | null, tree2: TreeNode | null): boolean {
    if (!tree1 && !tree2) return true; // *这里如果两个节点都为null的话，必须返回true 首先判断两个节点为空的情况，因为下面的代码需要两个tree不会都为空。
    // *这里 第一个判断： 两个节点都存在。 因为一个节点为null一个节点有val是错误情况
    // *第二个判断 两个节点的val
    // *第三个判断和第四个判断 就是判断镜像的另一种规则： 树1的左子树和树2的右子树，树1的右子树和树2的左子树。
    // *只要满足这几个条件，那么就是true。
    if (tree1 && tree2 && tree1.val === tree2.val && isMirror(tree1.left, tree2.right) && isMirror(tree1.right, tree2.left)) return true;
    return false;
  }

  return isMirror(root.left, root.right);
}
