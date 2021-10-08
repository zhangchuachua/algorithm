"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bfs = exports.dfs = void 0;
// !本文件是图的深度优先遍历
var base_1 = __importDefault(require("./base"));
/*
* 1. 访问根节点
* 2. 对根节点的没访问过的相邻节点挨个进行深度优先遍历  这一步很重要，我因为图中的节点是可以互相指向的，甚至还可以指向自己，所以如果没有这个 “没访问过的相邻节点” 那么必然会陷入死循环
* */
function dfs(n) {
    // 使用Set来存储已经访问过的节点
    var visited = new Set();
    // *访问根节点
    console.log(n);
    // 将这个节点添加到已经访问过的节点集合中去
    visited.add(n);
    base_1.default[n].forEach(function (item) {
        // *如果节点已经访问过，那么就不再进行访问了，
        if (!visited.has(item))
            dfs(item);
    });
}
exports.dfs = dfs;
// dfs('1');
/*
* 1. 新建一个队列，把根节点入队
* 2. 把对头出队，并且访问
* 3. 把对头的没有访问过的相邻节点入队
* 4. 重复二、三步。
* */
function bfs(n) {
    // *创建一个队列
    var queue = [n];
    // !因为添加集合的操作放到了遍历里面去，会导致第一个节点不会添加，所以初始化为第一个节点。
    var visited = new Set(n);
    while (queue.length) {
        // 根节点出队
        var node = queue.shift();
        // *访问根节点
        console.log(node);
        // !并且标记为已经访问  注意 在这里添加节点其实是有问题的， 因为出队只能一个一个出，但是入队却有可能有很多，所以可能会导致，有一个节点在队列中，还没有出队，但是遍历的时候又把这个节点添加到队列里面。导致重复输出该节点。  所以添加已访问集合，应该放到遍历里面去。
        // visited.add(node);
        // *然后对该节点的相邻节点进行遍历
        base_1.default[node].forEach(function (item) {
            // *如果该节点已经被访问，那么不再进行访问
            if (!visited.has(item)) {
                queue.push(item);
                visited.add(item);
            }
        });
    }
}
exports.bfs = bfs;
bfs('2');
