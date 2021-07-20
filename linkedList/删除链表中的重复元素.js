"use strict";
// 这是我的第一种方法，这个方法与官方的做法有点类似，但是我多定义了几个变量
// *思路就是定义了prev指向上一个，curr指向当前节点，tail指向下一个节点  但是官方只声明了一个变量  我这里的问题没有理解到升序的意义
// *升序的意义就是，重复的数是连续的，所以我只需要比较当前数，与后一个数是否相等，如果相等就取缔
// *这几个方法的时间复杂度都是O(n), 空间复杂度都都是常数级别的
function deleteDuplicates(head) {
    if (!head)
        return head;
    var tail = head.next;
    var prev = null;
    var curr = head;
    var a = new Map();
    while (curr) {
        if (a.has(curr.val)) {
            // @ts-ignore
            prev.next = tail;
            curr = tail;
            tail = tail ? tail.next : null;
        }
        else {
            a.set(curr.val, true);
            prev = curr;
            curr = tail;
            tail = tail ? tail.next : null;
        }
    }
    return head;
}
;
// *这是我的第二个方法，就是遍历链表，同时把val存在map中，如果有重复的就跳过这一个，如果没有重复的就放在新链表中
// *但是我的这里如何返回新链表的头部出了一点问题，现在比较麻烦，可以看看是否还可以优化
function deleteDuplicatesTwo(head) {
    if (!head)
        return head;
    var newList = new ListNode();
    var newHead = newList;
    var a = new Map();
    while (head) {
        if (a.has(head.val)) {
            head = head.next;
        }
        else {
            if (a.size) {
                newList.next = new ListNode();
                newList = newList.next;
            }
            a.set(head.val, true);
            newList.val = head.val;
            head = head.next;
        }
    }
    return newHead;
}
;
// * 这里又用到了之前的链表删除的方法，而且重点是给出的链表是有序的，由低到高的
var deleteDuplicatesOfficial = function (head) {
    if (!head) {
        return head;
    }
    var cur = head;
    while (cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        }
        else {
            cur = cur.next;
        }
    }
    return head;
};
