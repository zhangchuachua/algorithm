"use strict";
var Queue = /** @class */ (function () {
    function Queue(params) {
        this.queue = params ? params : [];
    }
    Queue.prototype.enqueue = function (value) {
        return this.queue.push(value);
    };
    Queue.prototype.dequeue = function () {
        return this.queue.shift();
    };
    return Queue;
}());
var queue = new Queue([123, 12, 3, 12]);
console.log(queue.dequeue());
