export interface Graph {
  [key: string]: string[];
}

const graph: Graph = {
  0: ['1', '2'],
  1: ['2'],
  2: ['0', '3'],
  3: ['3'] // 这里是访问自己
};

export class Node {
  val: number;
  neighbors: Node[];

  constructor(val?: number, neighbors?: Node[]) {
    this.val = (val === undefined ? 0 : val);
    this.neighbors = (neighbors === undefined ? [] : neighbors);
  }
}


export default graph;
