// 使用ts创建链表的代码。

class LinkedList {
  private head: any;

  constructor(element: any) {
    this.append(element);
  }

   private node(element: any) {
    return {
      ...element,
      next: null
    }
  }

  append(element: any) {
    const newNode = this.node(element);
    if(!this.head) {
      this.head = newNode;
    } else {
      let tail = this.head;
      while (tail.next) {
        tail = tail.next
      }
      tail.next = newNode;
    }
  }
}

const link = new LinkedList({
  name: 'zhangxu',
  age: 21
});

link.append({
  name: 'zwt',
  age: 21
});

console.log(link);
