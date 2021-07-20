// 这是我完成的两数相加，空间复杂度，非常好，平均超过百分之90，开始没有看懂题，后面才看懂，不然可以早点完成！！。
// *具体的思路：思路还是非常简单的，就是两个数进行相加，但是我一直没有理解到题的意思， 其实就是两个数相加 比如9+9=18 99+9=108 只是这是一个链表结构而已，而且我们需要从个位开始相加而已。
// *给出两个链表 1->0->9, 9 其实就是 901 + 9 应该等于 910 但是是倒序的，所以应该得出结果 0->1->9
// *首先，我们进行个位相加 也就是 1 与 9 ，我这里使用了一个新的链表来存储相加的结果链表，然后直接返回这个新的链表就可以了
// *因为新链表将会一直指向头部，所以我又新建了一个一直指向尾部的变量，用于添加新的节点，然后还要保存两数相加>=10的情况
// *所以又新建了一个变量carry保存进位。
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let tail: ListNode = new ListNode();
  let newHead: ListNode = tail;
  // *两个数相加，向高位最多只能进1，所以这里不是1就是0
  let carry: 0 | 1 = 0;
  // *当当前的节点存在或进位存在就进行循环
  while (l1 || l2 || carry) {
    // *当当前节点或者进位存在就进入if计算。 两个不同位数的数相加就相当于把低位补零而已 比如 1999+1=1999+0001 进位也该进入计算
    if (l1 || l2 || carry) {
      // *如果节点.val没有就算作0
      let v1 = l1 ? l1.val : 0;
      let v2 = l2 ? l2.val : 0;
      tail.val = v1 + v2 + carry;
      if (tail.val >= 10) {
        tail.val -= 10;
        carry = 1;
      } else {
        carry = 0;
      }
    }
    // 这里时为了避免ts报错 让节点进入next
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
    // *如果三者有一个存在就连接一个新节点，tail重新指向尾部，这里没有直接创建新节点是避免不会进位的两数相加依然输出两位比如0+0输出0->0
    if (l1 || l2 || carry) {
      tail.next = new ListNode();
      tail = tail.next;
    }
  }
  return newHead;
}

// *这是官方的解法  确实是比较有逻辑性一些，我的完全就是一个一个再试
const addTwoNumbersOfficial = function (l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // *同样的，定义了三个变量，一个指向新链表的头部，一个指向尾部，还有一个存储进位
  let head: ListNode | null = null, tail: ListNode | null = null;
  let carry = 0;
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    const sum = n1 + n2 + carry;
    // !这里有一点不一样，我是直接head = tail = new ListNode 他这里一开始赋值为0，然后对第一次区别计算, 这是因为它在进行运算的时候才连接新节点
    if (!head) {
      head = tail = new ListNode(sum % 10);
      // 如果head已经存在了，那么就让tail尾部来
    } else {
      // !这里有一点不一样 感觉这样的方式好一些，这里添加新节点是添加在当前位数的新节点 所以使用了 sum%10 获取余数
      // @ts-ignore
      tail.next = new ListNode(sum % 10);
      // @ts-ignore
      tail = tail.next;
    }
    // 到这里才进行计算carry
    carry = Math.floor(sum / 10);
    // 这里跟上面也差不多把，其实都是一个if判断
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  // 上面执行完了，说明 l1和l2都不存在了，也就是达到最高位了，如果还存在carry就进行进位
  if (carry > 0) {
    // @ts-ignore
    tail.next = new ListNode(carry);
  }
  return head;
};
