import TreeNode from "./TreeNode";

// *使用的是广度优先遍历， 时间复杂度为 O(n) 空间复杂度为 o(n) n为所有节点的数量
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  let pQueue = [p];
  let qQueue = [q];
  while (pQueue.length && qQueue.length) {
    let pQ = <TreeNode | null>pQueue.shift();
    let qQ = <TreeNode | null>qQueue.shift();
    if (pQ?.val !== qQ?.val) {
      return false;
    }
    if (pQ?.left !== undefined) pQueue.push(pQ.left);
    if (pQ?.right !== undefined) pQueue.push(pQ.right);
    if (qQ?.left !== undefined) qQueue.push(qQ.left);
    if (qQ?.right !== undefined) qQueue.push(qQ.right);
  }
  return true;
}

const test: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
};

console.log(isSameTree(test, test));

// *使用分而治之的方法  看一下下面的代码应该就懂了  时间复杂度是 o(n) 空间复杂度是 o(n) 与上面的写法一致
export function isSameTreeRecursion(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  // * 如果p存在，而且q也存在 这是为了避免 一个为null一个有值的情况
  // *p.val === q.val 这是确定根节点是否相同
  // *两个递归调用就是为了确定左子树和右子树是否相同 如果都相同
  return !!(p && q && p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right));
}
