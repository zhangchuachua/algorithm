// *这道题的题解需要配合图，很重要，可以在算法.md->动态规划->72 中找到。
// *依旧试着跟着三步骤试一下，结合图的话更好理解一些。
// *第一步：找出数组元素的定义。 如果没有图解让我自己想的话，我应该是想不出来的。 但是根据图解可以想出来，应该是一个二维数组，数组中的元素代表由word1变成word2的最小步数。
// !第二步：找出数组元素之间的关系，大问题小问题之间的关系：关系是应该是 word1[i] === word2[j] 时， dp[i][j] = dp[i-1][j-1];  当 word1[i] !== word2[j] 时： dp[i][j] = min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;
// !这里 dp[i-1][j-1], dp[i-1][j], dp[i][j-1] 其实就对应着题目中的三种操作： dp[i-1][j-1] 就是替换操作。 dp[i-1][j] 就是删除操作。 dp[i][j-1] 就是插入操作
// !我看到这里非常懵逼，不知道这是怎么得来的，然后看了评论发现可以这样理解： 比如说图解中的最后一个格子：dp[5][3] 也就可以认定为 dp[i][j]: 把 horse 变成 ros 。dp[i-1][j-1] 代表的是 hors 变成 ro 的最短距离，所以我们只需要将最后一位 e 替换为 s 就可以了。dp[i-1][j] 代表的是 hors 变成 ros 的最短距离，然后我们再把最后一位的 e 删除就可以了。 dp[i][j-1] 代表的是 horse 变成 ro 的最短距离，这个时候我们还需要再追加一个 s 就可以了。
// ! 大白话就是：dp[i-1][j-1] 变成 dp[i][j] 需要替换操作。  dp[i-1][j] 变成 dp[i][j] 需要删除操作,  dp[i][j-1]变成dp[i][j] 需要插入操作。 这就与题目中的三个要求呼应上了。
// *还有就是 word1[i] === word2[j] 时，也就是当前两个字符是一样的，所以完全可以不操作它们两个，只需要将前面的字符串修改正确就可以了。所以就忽略当前的 word1[i] word2[j] ，那么前面的字符串指的也就是 dp[i-1][j-1]
// *第三步：找出初始条件：初始条件应该与图解中的类似。
// !所以初始值需要 i+1 行 j+1 列，因为需要额外添加空字符串作为初始值。
export function minDistance(word1: string, word2: string): number {
  // *按照图解那样先创建初始值。
  const memory: number[][] = Array.from({ length: word1.length + 1 }, (val, key) => {
    return Array.from({ length: word2.length + 1 }, (value, index) => {
      if (key === 0) return index;
      if (index === 0) return key;
      return 0;
    });
  });
  // *迭代的做法，就是自顶向下，一个一个接着推导。递归的话，就相当于自底向上，直接从需要得出的结果开始，然后一步步递归到初始值（即出口）。
  for (let i = 1; i < memory.length; i++) {
    for (let j = 1; j < memory[i].length; j++) {// *两个for循环进行遍历。
      if (word1[i - 1] === word2[j - 1])// *因为数组的长度为 [word1.length+1][word2.length+1] 所以这里需要将i，j 减去1。
        memory[i][j] = memory[i - 1][j - 1];
      else memory[i][j] = Math.min(memory[i - 1][j - 1], memory[i - 1][j], memory[i][j - 1]) + 1; // *否则，memory[i][j] 就等于式子里面推导的那样。
    }
  }
  return memory[word1.length][word2.length];
}

console.log(minDistance('horse', 'ros'));
