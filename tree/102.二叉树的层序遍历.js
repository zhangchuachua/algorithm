"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
// *自己的做法，其实就是跟广度优先遍历类似，但是我这里遍历就不是一个节点 一个节点遍历了 而是一层一层遍历
function levelOrder(root) {
    if (!root)
        return [];
    var arr = [];
    var level = [[root]]; // *这里存储每一层的节点。
    var _loop_1 = function () {
        var list = level.shift(); // *取出当前层
        var a = [];
        arr.push(list.map(function (node) {
            if (node.left)
                a.push(node.left); // *对每一个节点进行判断 如果存在就压入数组
            if (node.right)
                a.push(node.right);
            return node.val;
        }));
        if (a.length)
            level.push(a); // *将数组压入 存储每一层节点的数组
    };
    while (level.length) {
        _loop_1();
    }
    return arr;
}
;
// !这是视频里面的做法。大概的思路是差不多的，都是使用的广度优先遍历。但是这个更巧妙一点。虽然说 两者的时间复杂度和空间复杂度是差不多的。
function levelOrderOptimization(root) {
    if (!root)
        return [];
    var queue = [[root, 0]]; // *同样的声明一个队列。注意 他这里没有存储每一层的节点，而是存储的层级
    var res = []; // !这个变量很重要
    while (queue.length) {
        var _a = __read(queue.shift(), 2), root_1 = _a[0], depth = _a[1]; // 出栈
        if (!res[depth]) { // !这里的判断很巧妙，因为他没有存储每一层的节点，存储的层级，所以就按照层级对数组赋值，比如 根节点的层级为0 先进行判断，如果 res[0] 为undefined 那么就压入一个数组 数组里面有当前的节点的val
            res.push([root_1.val]);
        }
        else
            res[depth].push(root_1.val); // !如果当前层级有数组了 就直接压入这个数组
        // !虽然我上面多了一个循环 但是我循环的次数更少， 其实性能是差不多的，比如这里还是会对每个节点进行if判断 我上面也是一样的
        if (root_1.left)
            queue.push([root_1.left, depth + 1]);
        if (root_1.right)
            queue.push([root_1.right, depth + 1]);
    }
    return res;
}
