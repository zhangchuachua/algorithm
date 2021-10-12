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
// !感觉思维完全打不开啊，一直都是听到什么就用什么，完全不会举一反三， 这里开始的想法还是使用set来记录已经访问过的节点，虽然也有用，但是相对于来说麻烦很多，而且后续的操作还需要建立更多的变量去操作。
// !这道题考的是每个元素能否到达边界，去试每一个点太多了，性能太差了。  所以: 可以从边界开始出发，每一个边界的每一个点都出发一次，然后将结果进行集合，去重，就可以获得到最终的结果
function pacificAtlantic(heights) {
    var m = heights.length; // 题目中并没有说 是一个正方形矩阵 所以这里需要获取 两条边的长度
    var n = heights[0].length;
    // *注意这里前往不要使用set来存储已经遇到过的值，这里使用两个 m * n 的矩阵来存储已经访问过的节点， 访问过的节点就是可以到达的节点。 一个存储 能够到达 ‘太平洋‘ 的边界，一个存储 ’大西洋‘ 的边界
    var flow1 = Array.from({ length: m }, function () { return Array(n).fill(false); });
    var flow2 = Array.from({ length: m }, function () { return Array(n).fill(false); });
    // *因为不同的边界使用不同的二维数组， 所以这里将二维数组作为参数传进去。
    function dfs(r, c, flow) {
        flow[r][c] = true;
        // 这里直接获取 上下左右 四个节点
        [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].forEach(function (_a) {
            var _b = __read(_a, 2), newr = _b[0], newc = _b[1];
            // 注意这里的比较条件，要索引的位置是正确的
            // !还有要当前的元素小于等于 节点 才能够到达， 还要 这个位置 没有被访问过。
            if (newr >= 0 && newc >= 0 && newr < m && newc < n && heights[r][c] <= heights[newr][newc] && !flow[newr][newc])
                dfs(newr, newc, flow);
        });
    }
    var _loop_1 = function (i) {
        // 这里就遍历 边 就可以了， 只需要遍历四个边界
        if (i === 0) {
            heights[i].forEach(function (item, index) {
                // * 注意这里不同的边界要使用不用的 二维数组 也就是第三个参数
                dfs(i, index, flow1);
            });
        }
        if (i === m - 1) {
            heights[i].forEach(function (item, index) {
                dfs(i, index, flow2);
            });
        }
        dfs(i, 0, flow1);
        dfs(i, n - 1, flow2);
    };
    for (var i = 0; i < m; i++) {
        _loop_1(i);
    }
    var res = [];
    // *最后将结果 整合一下
    for (var i in flow1) {
        for (var j in flow1[i]) {
            if ((flow1[i][j] && flow2[i][j]) === true)
                res.push([Number(i), Number(j)]);
        }
    }
    return res;
}
;
console.log(pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]));
;
