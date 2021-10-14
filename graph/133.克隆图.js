"use strict";
exports.__esModule = true;
var base_1 = require("./base");
var a = new base_1.Node(1);
console.dir(a, { depth: null });
a.neighbors = [new base_1.Node(2)];
console.dir(a, { depth: null });
// function cloneGraph(node: Node | null): Node | null {
//   if (!node) return null;
//   const queue = [node];
//   const set = new Set<number>([node.val]);
//   while (queue.length) {
//     const node = queue.shift();
//     if(node.neighbors)
//   }
// }
