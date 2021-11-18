import { ListNode } from "../linkedList/ListNode";

// *没有新建链表，使用的已有链表，然后进行连接。虽然节省了空间，但是使用了大量判断，时间效率很低。不建议使用。再也不想做这么多判断了！。
export function mergeTwoListsDontRecommend(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let head = null;
  let prev: ListNode | null;
  while (l1 && l2) {
    if (!head) {
      if (l1.val < l2.val) {
        head = l1;
        l1 = l1.next;
      } else {
        head = l2;
        l2 = l2.next;
      }
      prev = head;
      continue;
    }
    if (l1.val < l2.val) {
      // @ts-ignore
      prev.next = l1;
      prev = l1;
      l1 = l1.next;
    } else {
      // @ts-ignore
      prev.next = l2;
      prev = l2;
      l2 = l2.next;
    }
  }
  if (l1) {
    if (!head) head = l1;
    // @ts-ignore
    else prev.next = l1;
  }
  if (l2) {
    if (!head) head = l2;
    // @ts-ignore
    else prev.next = l2;
  }
  return head;
}

const l1 = { val: 1, next: { val: 2, next: { val: 4, next: null } } };
const l2 = { val: 1, next: { val: 3, next: { val: 4, next: null } } };

// console.dir(mergeTwoLists(l1,l2), { depth: null });

// *应该算是最容易想到的一种方法，但是还是有一些需要注意的点。  时间复杂度和空间复杂度都不高 时间复杂度为 O(n) 空间复杂度为 O(1) 因为使用的节点都是参数的节点，已经开辟好了的
export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!(l1 && l2)) return l1 || l2; // *提前判断 因为只有两个值分别为两个参数，所以很好判断，  判断 l1 && l2 的返回值如果为假的话，那么说明必有一个是null，或者两个为null。  然后返回 l1 || l2
  let head = new ListNode(); // !这是一个注意点： 我一直很纠结，在这里new了就代表第一个节点的值就为0，如果遇到 l1,l2都会空的话，返回head而不是null就错误了。 虽然这里最开始进行了判断，但是其实不判断也是可以的。 因为最下面返回的是head.next!! 就跳过了一个节点！ 一直没有想到！
  let p = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      p.next = l1; // !因为不用考虑初始化了节点， 所以就不需要赋值val，而是直接赋值节点！！！ 也很重要，第一个好处，不用开辟新的节点，节约内存，第二个好处，简化操作  如果这里理解不了 就画图理解一下。
      l1 = l1.next;// *l1指向下一个
    } else {
      p.next = l2;// !这里与上面一样
      l2 = l2.next;
    }
    p = p.next; // !注意这里，就是这里不需要new一个节点了。而且也不用考虑new完节点，循环就结束，最后一个节点的值为0，非常简化操作！！。
  }
   // *这里其实也要注意一下：这里不仅仅是处理l1,l2为空的情况（假设最上面没有处理）。
  // !而且while循环遍历后，因为一次只能遍历一个节点，所以必然有一个链表还有剩余的节点。 比如 [1->2->4] [1-3->4] 最后必然会剩下一个 [4] 所以这里的赋值是非常有必要的。
  if(l1) p.next = l1;
  if(l2) p.next = l2;
  return head.next; // !这里返回head.next 就不怕第一个节点不对的问题了！！
}

console.dir(mergeTwoLists(l1, l2), { depth: null });
