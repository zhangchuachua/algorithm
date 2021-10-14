"use strict";
exports.__esModule = true;
exports.Node = void 0;
var graph = {
    0: ['1', '2'],
    1: ['2'],
    2: ['0', '3'],
    3: ['3'] // 这里是访问自己
};
var Node = /** @class */ (function () {
    function Node(val, neighbors) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
    }
    return Node;
}());
exports.Node = Node;
exports["default"] = graph;
