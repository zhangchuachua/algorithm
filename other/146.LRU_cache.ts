// https://leetcode.cn/problems/lru-cache/solution/

interface INode {
  key: number;
  value: number;
  next: INode | null;
  prev: INode | null;
}

// *存储数据很简单，使用了一个双向链表，head 记录最久没有使用的元素，tail 记录最新才使用的元素； 难点就在于 如何正确的连表； 在获取时，插入时都应该整理一下链表；
class LRUCache {
  private map: Map<number, INode>;
  private head: INode | null;
  private tail: INode | null;
  private readonly maxSize: number;

  constructor(capacity: number) {
    this.map = new Map();
    this.maxSize = capacity;
    this.head = null;
    this.tail = null;
  }

  get(key: number): number {
    if (this.map.has(key)) {
      const node = this.map.get(key) as INode;
      this.update(node);
      return node.value;
    }
    return -1;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      const node = this.map.get(key) as INode;
      node.value = value;
      this.update(node);
    } else {
      const node: INode = {
        key,
        value,
        prev: null,
        next: null,
      };

      if (this.map.size >= this.maxSize) {
        this.map.delete(this.head!.key);
        this.head = this.head!.next;
        if (this.head) this.head.prev = null;
      }

      this.update(node);
      this.map.set(key, node);
    }
  }

  private update(node: INode) {
    if (this.map.size === 0) {
      this.head = node;
      this.tail = node;
    }
    if (this.tail === node) return;
    const { prev, next } = node;
    if (this.head === node) this.head = next;
    if (prev) prev.next = next;
    if (next) next.prev = prev;
    this.tail!.next = node;
    node.next = null;
    node.prev = this.tail;
    this.tail = node;
  }
}

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1); // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1); // 返回 -1 (未找到)
lRUCache.get(3); // 返回 3
lRUCache.get(4); // 返回 4

export {};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
