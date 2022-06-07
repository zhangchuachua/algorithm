// *leetcode-145周赛-第二题 1123. 最深叶节点的最近公共祖先 medium
import TreeNode, { createTree } from "./TreeNode";

interface LeafMessage {
  self: TreeNode,
  depth: number,
  parent: number | null;
}

// *思路很简单：遍历树，构建一个 map 的同时将深度列举出来；然后获取最深的叶节点，最后根据这些叶节点得到公共祖先。
// *思路很简单，但是实现起来还是比较麻烦的
// *时间复杂度就是 O(n) 空间复杂度也是 O(n)
function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  if (!root.left && !root.right) return root;
  const map = new Map<number, LeafMessage>();
  let maxDeep = 0;

  // 遍历树，构建 map
  function dfs(r: TreeNode, depth: number, parent: TreeNode | null) {
    // !构建 map 时存储了 self depth parent 方便后面找到祖先，并且返回对应树
    // *因为题中已经说了每个节点的 val 值不同

    if (!map.has(r.val)) map.set(r.val, {
      self: r,
      depth,
      parent: parent ? parent.val : null
    })
    // *记录深度
    maxDeep = depth > maxDeep ? depth : maxDeep;

    if (r.left) dfs(r.left, depth + 1, r);
    if (r.right) dfs(r.right, depth + 1, r);
  }

  dfs(root, 1, null);
  const deepestLeaf: LeafMessage[] = [];
  // *获取最深的叶子节点
  for (let i of map.values()) {
    if (i.depth >= maxDeep) {
      deepestLeaf.push(i);
    }
  }

  // *根据叶子节点获取公共祖先
  function getCommonParent(args: LeafMessage[]): TreeNode {
    // 当长度为 1 时返回
    if (args.length === 1) return args[0].self;
    const parentList: LeafMessage[] = []
    args.forEach(({ parent }) => {
        if (parent && map.has(parent)) {
          parentList.push(map.get(parent) as LeafMessage);
          // *过滤相同的父节点， 当当前当 parent 已经放进过 parentList 后，就删除该节点。 比如 [2, 7, 5] 的 [7, 5] 的父节点都是 2 所以就可以过滤掉相同的父节点，这样每次递归时 parentList 的长度都会减小，减小到 1 时，就是最近的公共祖先元素
          map.delete(parent);
        }
      }
    )
    return getCommonParent(parentList);
  }

  return getCommonParent(deepestLeaf);
}

// *还有一种思路，官解的思路就是这个：公共祖先应该满足一个条件，它的左右子树深度应该一致。所以我们就可以递归遍历父节点，如果当前父节点的左右子树深度不一致，那么就继续递归深度更大的那个子树。直到左右子树深度一致，或者左右子树为 null
// *明显代码量会少很多
export function lcaDeepestLeavesDfs(root: TreeNode | null): TreeNode | null {
  if (!root) return root;

  function getCommonRoot(r: TreeNode): TreeNode {
    if (!r.left && !r.right) return r;
    const ld = dfs(r.left, 1);
    const rd = dfs(r.right, 1);
    if(ld === rd) return r;
    return getCommonRoot((ld > rd ? r.left : r.right) as TreeNode);
  }

  function dfs(r: TreeNode | null, depth: number): number {
    if (!r) return 0;
    if (!r.left && !r.right) return depth;

    return Math.max(dfs(r.left, depth + 1), dfs(r.right, depth + 1));
  }

  return getCommonRoot(root);
}