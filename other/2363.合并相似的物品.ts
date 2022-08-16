// leetcode 2363.合并相似的物品 https://leetcode.cn/problems/merge-similar-items/
export default function mergeSimilarItems(items1: number[][], items2: number[][]): number[][] {

  items1 = [...items1, ...items2].sort(([a], [b]) => a - b)

  let i = 0;

  while (i < items1.length - 1) {
    const [v1, w1] = items1[i];
    const [v2, w2] = items1[i + 1];
    if (v1 === v2) {
      items1[i][1] = w1 + w2;
      items1.splice(i + 1, 1);
    }
    i++;
  }

  return items1;
};