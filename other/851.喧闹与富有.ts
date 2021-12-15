export function loudAndRich(richer: number[][], quiet: number[]): number[] {
  const map = new Map<number, number[]>();
  for (let i of richer) {
    const [rich, poor] = i;
    if (!map.get(poor)) map.set(poor, [rich]);
    else {
      (map.get(poor) as number[]).push(rich);
    }
  }
  map.forEach((value, key, originMap) => {
    const arr: number[] = [];
    value.forEach((item) => {
      getAllRich(item, originMap, arr);
    });
    value.push(...arr);
  });

  function getAllRich(
    value: number,
    map: Map<number, number[]>,
    arr: number[] = []
  ) {
    if (!map.get(value)?.length) return;
    (map.get(value) as number[]).forEach((item) => {
      arr.push(item);
      getAllRich(item, map, arr);
    });
  }

  return Array.from({ length: quiet.length }, (val, i) => {
    if (!map.get(i)) return i;
    let index: number = i;
    (map.get(i) as number[]).forEach((item) => {
      if (quiet[item] < quiet[index]) index = item;
    });
    return index;
  });
}

console.log(
  loudAndRich(
    [
      [0, 1],
      [0, 2],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 9],
      [0, 10],
      [0, 12],
      [0, 14],
      [0, 15],
      [0, 16],
      [0, 17],
      [0, 18],
      [1, 2],
      [1, 4],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 10],
      [1, 11],
      [1, 13],
      [1, 14],
      [1, 15],
      [1, 18],
      [1, 19],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 9],
      [2, 10],
      [2, 11],
      [2, 12],
      [2, 14],
      [2, 15],
      [2, 17],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],
      [3, 11],
      [3, 12],
      [3, 14],
      [3, 18],
      [3, 19],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 9],
      [4, 11],
      [4, 12],
      [4, 13],
      [4, 14],
      [4, 16],
      [4, 17],
      [4, 18],
      [4, 19],
      [5, 6],
      [5, 7],
      [5, 9],
      [5, 10],
      [5, 11],
      [5, 12],
      [5, 13],
      [5, 14],
      [5, 16],
      [5, 18],
      [6, 7],
      [6, 9],
      [6, 10],
      [6, 12],
      [6, 13],
      [6, 15],
      [6, 17],
      [6, 18],
      [7, 8],
      [7, 9],
      [7, 10],
      [7, 11],
      [7, 12],
      [7, 13],
      [7, 14],
      [7, 15],
      [7, 16],
      [7, 17],
      [7, 18],
      [7, 19],
      [8, 9],
      [8, 11],
      [8, 13],
      [8, 14],
      [8, 15],
      [8, 16],
      [8, 17],
      [8, 18],
      [8, 19],
      [9, 10],
      [9, 12],
      [9, 13],
      [9, 15],
      [9, 17],
      [9, 19],
      [10, 11],
      [10, 12],
      [10, 13],
      [10, 14],
      [10, 15],
      [10, 16],
      [10, 17],
      [10, 18],
      [11, 13],
      [11, 15],
      [11, 16],
      [11, 17],
      [11, 18],
      [11, 19],
      [12, 13],
      [12, 15],
      [12, 19],
      [13, 17],
      [13, 18],
      [13, 19],
      [14, 16],
      [14, 17],
      [14, 18],
      [14, 19],
      [15, 16],
      [15, 17],
      [15, 18],
      [15, 19],
      [16, 17],
      [16, 18],
      [16, 19],
      [17, 19],
      [18, 19],
    ],
    [3, 5, 7, 2, 13, 6, 17, 19, 9, 16, 10, 1, 8, 14, 12, 18, 15, 0, 11, 4]
  )
);
