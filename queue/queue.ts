class Queue<T> {
  queue: T[];
  constructor(params?: T[]) {
    this.queue = params ? params : [];
  }
  enqueue (value:T) {
    return this.queue.push(value);
  }
  dequeue () {
    return this.queue.shift();
  }
}

const queue = new Queue<number>([123,12,3,12]);

console.log(queue.dequeue());
