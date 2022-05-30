import TreeNode from "./TreeNode";

// *这道题也非常简单，就涉及到树的先序遍历（我这里使用的是先序遍历，其他顺序应该也可以解题）
// *解题思路，遍历根结点到每一个叶子结点的路，并且记录当前的二进制。到达叶子节点时，就转换为数字，计算其和
export function sumRootToLeaf(root: TreeNode): number {
    let sum = 0;

    // *先序遍历
    function preOrder(r: TreeNode, binary: string): void {
        // *记录每一层的二进制
        const b = `${binary}${r.val}`;
        // *如果到达叶子结点就进行累加
        if (!r.left && !r.right) sum += parseInt(b, 2);
        // *虽然先序遍历是按照 left -> right 但是这道题只需要遍历每一条路，跟先后无关，所以这道题里面随便 left right 的顺序
        if (r.left) preOrder(r.left, b);
        if (r.right) preOrder(r.right, b);
    }

    preOrder(root, '');
    return sum;
}
