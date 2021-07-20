"use strict";
// *这是我开始写的 真的是一坨shit，因为想到了可能会同时出队多个元素，所以使用了filter，将符合标准的挑选出来
// *其实这样都不算是队列了
// class RecentCounter {
//   queue: number[] = [];
//   ping(t: number): number {
//     if (!this.queue.length) this.queue.push(t);
//     else {
//       this.queue = this.queue.filter(item => {
//         return t - 3000 <= item;
//       })
//       this.queue.push(t);
//     }
//     return this.queue.length;
//   }
// }
// const resArr = [];
// const recent = new RecentCounter();
// resArr.push(recent.ping(1));
// resArr.push(recent.ping(100));
// resArr.push(recent.ping(3001));
// resArr.push(recent.ping(3002));
// *这里是经过优化后的版本，还有一版是不要这个if-else判断的，但是要这个判断好像整体性能会更好一点
var RecentCounter = /** @class */ (function () {
    function RecentCounter() {
        this.queue = [];
    }
    RecentCounter.prototype.ping = function (t) {
        if (!this.queue.length) {
            this.queue.push(t);
        }
        else {
            this.queue.push(t);
            // *重点是这个while循环，当我们不确定循环次数时，首先就可以考虑while循环，而且重点是这里的while循环
            // *改变了数组，但是因为使用this.queue[0]依然是始终指向第一个的。
            // !冷知识，如果是在循环中修改了数组（添加或者删除元素这样的修改）那么可能会导致index指向错误，需要手动修改index
            // !可以在for，for-in，for-of，filter试一下，都是这样的，但是这里的while循环不会有这样的问题。
            while (this.queue[0] < t - 3000) {
                this.queue.shift();
            }
            ;
        }
        return this.queue.length;
    };
    return RecentCounter;
}());
var resArr = [];
var recent = new RecentCounter();
resArr.push(recent.ping(642));
resArr.push(recent.ping(1849));
resArr.push(recent.ping(4921));
resArr.push(recent.ping(5957));
