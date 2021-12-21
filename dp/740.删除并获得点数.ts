// *动态规划，难度为 medium  但是看了很久没有做出来，看到了评论说相当于变形的打家劫舍，才做出来的，但是做出来的时间消耗和内存消耗有点差

// *时间复杂度应该为 O(nlogn) ? 生成map为 n，然后生成数组，排序最坏应该为 nlogn 然后遍历数组，为 n - 1 综合得出 nlogn 时间复杂度为 O(n) 最坏打算，map 为 2n 长度，综合的 O(n);
export function deleteAndEarn(nums: number[]): number {
  const map = new Map<number, number>();
  for (let i of nums) {
    map.get(i) ? map.set(i, (map.get(i) as number) + i) : map.set(i, i); // *使用map存储，key 为 i, value 为所有 i 的值， 比如 [2,4,3,3,3,4] => [[2,2], [4,8], [3,9]];
  }
  const arr = Array.from(map).sort((a, b) => a[0] - b[0]); // *转换为数组，然后进行排序， 这里就可以看作另类的打家劫舍了。相邻的元素不能同时相加， 但是打家劫舍中遍历的顺序就是相邻的元素，但是这道题不是，它根据 i 的大小进行判断，所以需要自己手动判断是否相邻。  所以我这里进行了排序，next - prev === 1 的话就证明两个是相邻的
  if (arr.length === 1) return arr[0][1]; // !这下面就与打家劫舍类似了 但是还是有一点不一样  打家劫舍中，dp[1] 也就是 dp 中第二个元素的值，直接判断 nums[0], nums[1] 的大小就可以了。但是这里不一样，因为需要事先判断一下是否相邻。 所以我在这里 first = 0; second = arr[0][1] 然后循环从第二个开始，相当于 second 才是dp数组真正意义上的第一个元素。 first 也需要事先声明，所以初始值为 0  而且循环中的逻辑依然受用
  let first = 0;
  let second = arr[0][1];
  for (let i = 1; i < arr.length; i++) {
    let tmp = second;
    if (arr[i][0] - arr[i - 1][0] === 1) second = Math.max(first + arr[i][1], second); else second += arr[i][1];
    first = tmp;
  }
  return second;
};


// TODO 看题解
