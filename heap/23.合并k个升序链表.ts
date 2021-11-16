import { ListNode } from "../linkedList/ListNode";

// !自己琢磨出来的写法，使用了堆数据结构，但是效率很一般在力扣上时间平均超过48%，空间上平均超过32%，
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

// const a: (ListNode | null)[] = [
//   {
//     val: 1,
//     next: {
//       val: 4,
//       next: {
//         val: 5,
//         next: null
//       }
//     }
//   },
//   null,
//   {
//     val: 1,
//     next: {
//       val: 3,
//       next: {
//         val: 4,
//         next: null
//       }
//     }
//   },
//   {
//     val: 2,
//     next: {
//       val: 6,
//       next: null
//     }
//   },
//   null
// ];

const a: (ListNode | null)[] = [
  null,
  {
    val: 1, next: null
  }
];

console.dir(mergeKLists(a), { depth: null });
