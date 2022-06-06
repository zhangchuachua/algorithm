export default class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode, right?: TreeNode) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }

}

export function createTree(args: (number | null)[]): TreeNode | null {
  if (!args || args[0] === null) return null;
  const root = new TreeNode(args.shift() as number);
  const queue = [root];
  while (queue.length && args.length) {
    const node = queue.shift() as TreeNode;
    const v1 = args.shift();
    const v2 = args.shift();
    if (v1 !== null) {
      const left = new TreeNode(v1)
      node.left = left
      queue.push(left)
    }
    if (v2 !== null) {
      const right = new TreeNode(v2);
      node.right = right;
      queue.push(right);
    }
  }
  return root;
}