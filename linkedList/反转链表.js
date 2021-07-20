"use strict";
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    return ListNode;
}());
// 这是我自己的作品，也是使用递归完成的，但是性能较差
function reverseList(head) {
    // *开始进行优化
    // *首先 这里先判断head或者head.next是否为null，如果为null，那么直接返回 这也是递归的出口
    if (head === null || head.next === null) {
        return head;
    }
    // 经过上面一步 head.next 一定存在，所以这里进行递归，并且取得返回值，
    var node = reverseList(head.next);
    // !这里是我原本的写法  其实这里最开始我的想法也是与下面一样，n长度的链表看作， 1与(n-1)的结合，这个样只需要不断对(n-1)进行
    // !递归，始终都是两个节点的交换，！！但是！！我在交换的时候使用的是最基本的交换方法，使用第三个数存储，然后进行交换。
    // !这样还是没有理解到链表的精髓。
    // let node_head = node;
    // while (node.next) {
    //   node = node.next;
    // }
    // let flag = node.next;
    // node.next = head
    // head.next = flag;
    // return node_head;
    // !这里是改良后的写法，这里非常重要！
    // !这里进行交换的方法，就是链表的精髓。 比如有一个 1、2、3、4传入方法，我们写一下进行的步骤
    // 第一次  1, reverseList(2, 3, 4);
    // 第二次  2, reverseList(3, 4);
    // 第三次  3, reverseList(4);
    // 第四次  4  4.next === null; 所以直接返回 4
    // 进入第三个， 这个时候 head->3,3.next->4,4.next ->null  有一个重要的点就是，这个时候的head.next是不会改变的，这里可能有点难理解，我们直接让这里交换成功，那么就是 4.next->3,3.next->null
    // 然后进入第二个，这里就又要用到哪个 head.next 是不会改变的这个原则了，  head->2,2.next->3,3.next->null, 虽然返回的是 4，3，但是2开始就是指向3的，而且一直没有进行改变，所以这里的2依然指向3
    // 所以无论什么情况使用下面这个交换方法都是可行的。 也就是真真正正的 1与(n-1)进行交换。
    // !上面方法使用错误的原因就是没有理解到此时的head依然指向原本顺序的下一个节点。 然后通过遍历获取到最后一个节点，
    // !将head放到最后一个节点后，因为原本node指向头部，但是经过遍历指向了尾部又不得不新建一个变量来存放头部，然后返回
    head.next.next = head;
    head.next = null;
    return node;
}
;
// 这是官方的完成方法，优化了很多东西，可以多看看~
// *时间复杂度为O(n)，相当于进行了一个循环，空间复杂度为O(n), 因为每次都创建了新的变量
var reverseListOfficial = function (head) {
    if (head == null || head.next == null) {
        return head;
    }
    var newHead = reverseListOfficial(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};
