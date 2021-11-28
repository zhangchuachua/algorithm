// !贪心算法：这道题是贪心算法的开始。难度为 easy
// !贪心算法：在对问题的求解时，总是做当前看来最好的选择。但是：注意贪心算法在结果上不一定时最优的。 比如说钱找零：目前我们有 [1,3,4] ，需要将8元钱换成零钱，换成零钱的数量越少越好；那么我们按照贪心算法来解：当前最好的选择就是最大的面额，所以我们只需要两个 4 元就可以了。但是如果是 6 元的话，我们还是使用 4 元，那么就需要 4+1+1 三张了。
// *贪心算法在面试中问到的比较少，贪心算法需要充分挖掘题目中条件，没有固定的模式，解决有贪心算法需要一定的直觉和经验。

// *这道题需要满足尽可能多的小孩，所以我们在满足小孩的时候应该尽可能的给他对应的饼干尺寸，所以可以使用贪心算法：每一次给小孩饼干，都恰好给他最合适的饼干。
// *如何给他最合适的饼干呢？不可能每一次都去使用indexOf求吧，而且遇到没有完全对应的尺寸的饼干应该怎么办呢？所以可以对小孩和饼干进行排序。在进行分配。

// *能够做出来，但是时间复杂度很高，看一下题解。
export function findContentChildren(g: number[], s: number[]): number {
  quickSort(g);
  quickSort(s);
  let count = 0;
  // *一开始自己的做法，时间复杂度和空间复杂度都很高  我的做法是遍历两个数组，互相比较。其实完全可以只遍历一个数组。
  // for (let i of g) {
  //   let j = 0;
  //   while (j < s.length && s[j] < i) {
  //     j++;
  //   }
  //   if (j < s.length && s[j] >= i) {
  //     count += 1;
  //     s = s.slice(j + 1);
  //   } else if (j >= s.length) break;
  // }

  // !只遍历一个数组，遍历饼干数组，因为已经排序过了，所以小孩的顺序是从饭量小-饭量大，所以我们当前的饼干满足了当前小孩就向后走，最后返回count就可以了。
  s.forEach(item => {
    if (item >= g[count]) {
      count += 1;
    }
  });

  return count;
}

console.log(findContentChildren([1, 2], [1, 2, 3]));

// *再次复习一下排序算法。
function quickSort(nums: number[], start: number = 0, end: number = nums.length - 1): number[] {
  if (start >= end) return nums;
  const pIndex = Math.round(Math.random() * (end - start)) + start;
  let i = start - 1;
  let j = start;
  [nums[end], nums[pIndex]] = [nums[pIndex], nums[end]];
  while (j < end) {
    if (nums[j] > nums[end]) j++;
    else {
      i++;
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }
  [nums[i + 1], nums[end]] = [nums[end], nums[i + 1]];
  quickSort(nums, start, i);
  quickSort(nums, i + 2, end);
  return nums;
}
