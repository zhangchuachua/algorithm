import { ListNode } from "../linkedList/ListNode";

// *注意 在力扣上看到很多解题都是用的优先级队列，其实优先级队列，也是一种抽象的数据结构，可以使用堆来封装为优先级队列。队列也就是先进先出，优先级队列给定一个规则指定优先级，优先级高的先出。  规则可以是最小的数，可以是最大的数，这么一说是不是就和堆像了。
// *这道题虽然级别是难，但是在力扣上有很多解法。

// !自己琢磨出来的写法，使用了堆数据结构，但是效率很一般在力扣上时间平均超过48%，空间上平均超过32%，我这里的写法还可以再精简一下
// !为什么选中堆数据结构呢： 因为存储的是链表，链表的深度不知，如果将链表平铺出来，再进行排序，再遍历生成新的链表，可能时间复杂度很高（我没有试过这个做法，但是也是一种方法了） 这道题，然而最小堆可以直接就获取当前最小的val，所以每次只需要不断获取最小的值，然后去掉这个节点，而且链表恰好还是升序链表，重新整理堆就可以了。  所以非常适合
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let arr = lists.filter(item => item !== null); // !这里直接过滤掉null
  if (arr.length === 1) return arr[0]; // 如果过滤后只剩下一个元素，那么直接返回这个元素
  if (!arr.length) return null;// 如果数组为空就返回null

  // *在这里进行堆化，还是一样的堆化，说的太对了 在堆排序中可以看到解释
  for (let i = (arr.length >> 1) - 1; i >= 0; i--) {
    shiftDown(i);
  }

  function shiftDown(i: number) {
    const left = (i << 1) + 1;
    const right = (i << 1) + 2;
    // *这里需要进行一些修改，因为数组中的元素是链表，所以需要比较链表头部的val   因为最上面进行了去null操作，所以这里可以保证为ListNode，所以使用了很多断言
    while (arr[left] && (arr[i] as ListNode).val > (arr[left] as ListNode).val) {
      [arr[i], arr[left]] = [arr[left], arr[i]];
      shiftDown(left);
    }
    while (arr[right] && (arr[i] as ListNode).val > (arr[right] as ListNode).val) {
      [arr[i], arr[right]] = [arr[right], arr[i]];
      shiftDown(right);
    }
  }

  // !这里的pop函数很重要
  function pop() {
    const value = (arr[0] as ListNode).val;// *先获取当前堆顶的链表头部的val  这里可以保证是ListNode的原因在最后一个else
    if (arr[0]?.next) { //  *如果当前的链表的next不为空
      arr[0] = arr[0].next;// *就修改链表的头部为 next
      shiftDown(0); // *然后整理堆
    } else if (arr.length > 1) { // *注意这里需要判断数组的长度，因为如果只有一个元素时，且当前链表的next为空，比如 [{6->null}] 还是一味的让 arr[0] = arr.pop() 的话，那么就会出现 arr[0] = [{ 6->null }] 然后陷入死循环
      arr[0] = arr.pop() as ListNode;
      shiftDown(0);
    } else { // *这里就是如果当前链表的next为null，且数组中只有这一个链表，那么说明已经遍历完成了，所以arr直接为空数组。  arr为空数组时，while循环也就结束，  所以上面的 arr[0] 可以使用断言。
      arr = [];
    }
    return value;
  }

  const result = new ListNode();
  let index = 0;
  let current: ListNode = result;
  while (arr.length) {// arr为空时结束循环
    if (index === 0) { // *需要对第一次区别对待 不然会遇到最后一个元素的next不为null为0的情况， 因为 ListNode 初始化为 {val: 0, next: null}
      current.val = pop();
    } else {
      current.next = new ListNode();
      current = current.next;
      current.val = pop();
    }
    index++;
  }

  return result;
}

const a: (ListNode | null)[] = [
  {
    val: 1,
    next: {
      val: 4,
      next: {
        val: 5,
        next: null
      }
    }
  },
  null,
  {
    val: 1,
    next: {
      val: 3,
      next: {
        val: 4,
        next: null
      }
    }
  },
  {
    val: 2,
    next: {
      val: 6,
      next: null
    }
  },
  null
];

// const a: (ListNode | null)[] = [
//   null,
//   {
//     val: 1, next: null
//   }
// ];

// console.dir(mergeKLists(a), { depth: null });

// *暴力求解，暴力求解的时间复杂度也不高，也就 reduce 循环km次（m为最长的链表长度）其实就是n次  sort时间复杂度为 O(nLogn) reduce 循环n次，时间复杂度为 O(nLogn) 空间复杂度， O(n) 但是这个写法绝对是我见过的最精简的写法了 最好快的写法了 不记得reduce也可以去复习一下 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
export function mergeKListsViolence(lists: (ListNode | null)[]): ListNode | null {
  return lists
    .reduce<ListNode[]>((prev, current) => { // 对lists进行循环
      while (current) {// 循环当前链表
        prev.push(current); // *这里是将链表的节点放入数组，而不是链表的val
        current = current.next;
      }
      return prev;// 返回
    }, []) // *prev 初始为空字符串  返回的结果为所有的链表节点数组  注意 这里的返回的数组值应该是 [{1->2->3->null},{2->3->null}, {3->null}] 这样的，因为截取的时候并没有将next指向null。
    .sort((a, b) => {
      return a.val - b.val; // *对节点的val值进行排序
    })
    .reduceRight<ListNode | null>((p, n) => (n.next = p, p = n, p), null); // !这里是重点 此时的数组已经是 [ {1->...}, {1->...}... ] 等一系列排序好了的链表节点数组，这里从右开始遍历，也就是最大的值，然后将prev初始化为 null， 然后倒序开始连接节点， 这样不仅可以保证最后一个节点的next为null，还可以保证遍历完成返回的值刚好指向头部，就是一条完整的链表了。
  //* 如果使用从左到右，就需要使用一个head记录头部，
}

console.dir(mergeKListsViolence(a), { depth: null });

// *其他的解法：还可以遍历list，然后提取出最小的val加入新链表，这个方法每一次循环都要比较每一个链表的头节点。如果进行优化的话就是使用优先级队列了，比较的过程不需要对每一个数进行比较。所以我上面的解法有一些问题


// *还可以再次进行优化，使用分治的思想，基本与归并算法一致了
