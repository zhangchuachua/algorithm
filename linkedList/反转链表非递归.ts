// 这是我自己写的非递归的反转链表
// !这个在这里莫名其妙看了两个多小时才做出来 太分心了！
// !开始的时候，我的想法是类似于冒泡排序那种做法，但是那种做法时间复杂度太高了，然后我看到官方图解里面的时间复杂度可以为O(n) 于是自己想着做
// !甚至还少声明了一个变量
function reverseListNotRecursion(head: ListNode | null): ListNode | null {
  // *交换的方法是我通过画图，然后找到问题，声明变量找出来的，因为有了递归的神奇交换方法，也算对链表的理解加深了吧
  // !具体的过程就是 例如head->1->2->3->4->null, 第一步将1与2交换，就变成了2=head->1->3->4->null，然后再将连接3和2
  // !变成了3->2=head->1->4->null 然后再连接4和3就变成了 4->3->2=head->1->null 这个时候就反转完成了，我们可以发现head一直指向1
  // !我们需要将1.next->1.next.next然后再将1.next.next指向头部，比如4->3->2...这样，但是重点是，仅靠head不能完成单向链表这样完成
  // !所以就需要变量辅助，newHead就是专门用于指向新的头部，而two就直接指向了1的下一个node
  let newHead = head;
  while (head?.next) {
    let two = head.next;
    head.next = two.next;
    two.next = newHead;
    newHead = two;
  }
  return newHead;
}

// 这是官方的做法，我的做法与官方差不多,甚至还比官方好一点
// *非递归的时间复杂度为O(n), 空间复杂度为O(1)，就性能上来说，这种迭代的方式还要好一点
// *官方的做法，就比较简单了,null->1->2->3->4->null，差不多就是这样，使用prev指向前一个，curr指向当前这个，next指向下一个，
// *只需要不断修改箭头的方向就可以了，比如null<-1->2->3->4->null, null<-1<-2->3->4->null...然后画图看一下需要的步骤就可以了
// *这个想法更简单一些
function reverseListNotRecursionOfficial(head: ListNode | null): ListNode | null {
  // 1->2->3->4
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};
