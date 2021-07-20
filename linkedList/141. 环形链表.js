"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListNode_1 = require("./ListNode");
// !对于空间复杂度为O(n)的方法，我没有写出来，就是使用一个Map或者一个数组存储遍历到的链表。
// !如果遇到这种情况呢？head.val=3, 然后head.next.val也=3，会不会判断不了呢
// !因为在js中listNode使用对象存储，所以不用害怕遇到属性一样的对象，因为对象比较是比较堆内存，只要不是单独存val就不会判断错误
// 这个方法，其实不好，只能用在特定的情况下下，因为力扣告诉了listNode中的只在 -10^5~10^5之间，所以我超出这个范围作为标记，
// 就可以轻松获得这个值有没有被指过，因为是js有好多个取巧的办法，JSON.stringify()，遇到循环的stringify()会报错，修改head，因为是对象添加个属性也是简简单单。
function hasCycle(head) {
    while (head) {
        if (head.val > Math.pow(10, 5) || head.val < -(Math.pow(10, 5))) {
            return true;
        }
        else {
            head.val = head.val > 0 ? head.val + Math.pow(10, 5) + 1 : head.val - Math.pow(10, 5) - 1;
            head = head.next;
        }
    }
    return false;
}
;
var l1 = new ListNode_1.ListNode(1);
// !官方使用了快慢指针法，也就是声明两个指针，两个移动的快慢不一样，然后如果相遇了，表示是循环的，那么肯定有环
// !时间复杂度为O(n)，有两种情况没有环时，fast指向null结束，如果有环时，可以画图看一下，当链表中存在环时，每一轮移动后，
// !快慢指针的距离都会减少1，而初始巨离为环的长度，因此最多移动n轮。为什么初始巨离时环的长度呢，因为fast初始值为head.next
// !slow初始值为head，如果有环，那么它们的距离就是链表的长度，可以画图看看，然后因为fast每次移动两倍于slow，所以每次
// !移动后距离减少1.
function hasCycleOfficial(head) {
    var _a;
    if (!head || !head.next)
        return false;
    var slow = head;
    var fast = head.next;
    while (slow && fast) {
        if (slow === fast)
            return true;
        else {
            // !注意：这里前往不能 fast = fast.next 因为如果这样的话，这两个指针的移动速度是一样的，除非正好是两个链表之间构成了循环，不然都会出错，陷入死循环
            slow = slow.next;
            fast = (_a = fast.next) === null || _a === void 0 ? void 0 : _a.next;
        }
    }
    return false;
}
