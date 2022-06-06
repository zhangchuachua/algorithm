// *leetcode-145周赛-第二题 1123. 最深叶节点的最近公共祖先 medium
import TreeNode from "./TreeNode";

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

    const deepestLeaf = [];
    for(let {depth} of map.values()) {
        if(depth >= maxDeep) {
            deepestLeaf.push({

            })
        }
    }

    if (deepestLeaf.length === 1) return new TreeNode(deepestLeaf[0].val);


}