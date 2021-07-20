"use strict";
// 使用ts创建链表的代码。
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var LinkedList = /** @class */ (function () {
    function LinkedList(element) {
        this.append(element);
    }
    LinkedList.prototype.node = function (element) {
        return __assign(__assign({}, element), { next: null });
    };
    LinkedList.prototype.append = function (element) {
        var newNode = this.node(element);
        if (!this.head) {
            this.head = newNode;
        }
        else {
            var tail = this.head;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = newNode;
        }
    };
    return LinkedList;
}());
var link = new LinkedList({
    name: 'zhangxu',
    age: 21
});
link.append({
    name: 'zwt',
    age: 21
});
console.log(link);
