"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    return ListNode;
}());
exports.ListNode = ListNode;
