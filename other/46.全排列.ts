// !回溯算法， 回溯算法适用于那些又很多条路，但是其中有出路，有死路的情况，回溯算法的思路就是，在遇到思路的时候返回到上一部分，然后选择另一条路。

// *这道题也是有一点思路，但是想不出来如何实现。
export function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  // *这里的递归看着有点复杂，其实原理还是比较简单。应该还可以进行优化。
  // *第一次直接传入一个空数组， 然后进入循环，直接对nums进行遍历，假设当前的nums是 [1,2,3] 所以遍历的顺序就是 [1,2,3] 遍历到1时，先将1放到数组里面去，然后进入下一层递归，所以当前的 path 就是 [1] ，然后这一层递归中遍历 [1,2,3] 因为 path中已经有 [1] 所以跳过1，num = 2时，又先把 2 放到数组中去，再进入下一层循环，当前的 path = [1,2]；然后在这一层循环中遍历 [1,2,3] 因为 [1,2] 都已经有了，所以跳过，遍历到 3 ，然后把 3 再放到数组中，进入下一层递归，此时的path = [1,2,3]；在这一层递归中，因为  path.length = nums.length 也就是 path 中有了 nums 的所有元素，所以直接把 path 压入 res中去，然后返回，也就是出口。
  // *我开始的想法其实就是，在数组的每一位上都遍历nums，就可以得到正确的答案，但是我想的是使用循环实现，使用循环实现的话，又不知道何时将数组放到res中，也就是这里递归的出口。
  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach(num => {
      if (path.includes(num)) return;
      backtrack(path.concat(num));
    });
  };

  backtrack([]);

  return res;
}

console.log(permute([1, 2, 3]));

// *还可以使用 BFS 广度优先遍历解题。
