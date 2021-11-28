export class Solution {
  arr: number[][];
  valueNotZeroList: [number, number][];

  constructor(m: number, n: number) {
    this.arr = Array.from({ length: m }, () => {
      return Array.from({ length: n }, () => 0);
    });
    this.valueNotZeroList = [];
  }

  flip(): number[] {

  }

  reset(): void {

    this.valueNotZeroList.forEach((value) => {
      const [i, j] = value;
      this.arr[i][j] = 0;
    });

  }
}
