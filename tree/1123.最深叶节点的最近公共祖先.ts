// *leetcode-145周赛-第二题 1123. 最深叶节点的最近公共祖先 medium
import TreeNode, { createTree } from "./TreeNode";

interface LeafMessage {
  self: TreeNode,
  depth: number,
  parent: number | null;
}

function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  if (!root.left && !root.right) return root;
  const map = new Map<number, LeafMessage>();
  let maxDeep = 0;

  function dfs(r: TreeNode, depth: number, parent: TreeNode | null) {
    if (!map.has(r.val)) map.set(r.val, {
      self: r,
      depth,
      parent: parent ? parent.val : null
    })
    maxDeep = depth > maxDeep ? depth : maxDeep;

    if (r.left) dfs(r.left, depth + 1, r);
    if (r.right) dfs(r.right, depth + 1, r);
  }

  dfs(root, 1, null);
  const deepestLeaf: LeafMessage[] = [];
  for (let i of map.values()) {
    if (i.depth >= maxDeep) {
      deepestLeaf.push(i);
    }
  }

  function getCommonParent(args: LeafMessage[]): TreeNode {
    if (args.length === 1) return args[0].self;
    const parentList: LeafMessage[] = []
    args.forEach(({ parent }) => {
        if (parent && map.has(parent)) {
          parentList.push(map.get(parent) as LeafMessage);
          map.delete(parent);
        }
      }
    )
    return getCommonParent(parentList);
  }

  return getCommonParent(deepestLeaf);
}

const tree = createTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
console.log(lcaDeepestLeaves(tree))