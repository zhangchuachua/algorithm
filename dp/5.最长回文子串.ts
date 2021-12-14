// !动态规划问题,难度为 medium

// *想用动态规划来着,结果发现这是暴力求解,就是遍历每一个子串,然后判断是不是回文子串,然后记录max,记录start,end最后返回就是了.  注意这里是如何遍历所有子串的, 其实很简单比如 abc子串分别为 abc bc c 子串的概念就是字符串中连续的一部分字符串. 所以只需要像这样 遍历字符串中的字符, 然后不断截取, 直到末尾, 可以看 算法.md -> 动态规划 -> 5 最长回文子串 中的截图示例.
// *居然可以通过,  时间复杂度为 O(n^3) 空间复杂度为 O(1)
export function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  let max = 1;
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (s[i] === s[j]) {
        if (isPalindrome(s, i, j) && j - i + 1 > max) {
          max = j - i + 1;
          start = i;
          end = j;
        }
      }
    }
  }
  return s.slice(start, end + 1);
}

export function isPalindrome(
  s: string,
  start: number = 0,
  end: number = s.length - 1
): boolean {
  if (start === end) return true;
  while (start < end) {
    if (s[start] !== s[end]) return false;
    start++;
    end--;
  }
  return true;
}

// *使用了动态规划,其实整体思路与暴力破解有点类似, 也是需要找到所有的子串, 但是暴力破解会使用循环判断每一个子串是否为回文, 但是dp不一样, 比如当前字符串为 aaca 先判断两边的字符是否一样, a === a , 暴力破解在这里会循环判断 aaca 是否为回文, 但是dp中使用了一个数组存储了 ac 是否为回文, 因为两边一样, 我们就只需要判断内部字符串是否为回文, 很明显 ac 不是.

// *一开始,我完全意识不到二维数组中, 每个元素的含义, 现在知道了, 就是对应的子串. 然后元素之间的关系就是如果当前子串是回文的话, 那么其内部子串也是回文.

// !时间复杂度为 O(n^2) 空间复杂度为 o(n^2)  这里的空间复杂度应该也是可以优化的, 因为每次最多使用到 dp[i+1][j-1] 这个元素.
export function longestPalindromeDP(s: string): string {
  // 针对特殊请客进行返回
  if (s.length < 2) return s;
  // *初始化一个二维空数组.
  let arr: boolean[][] = new Array(s.length).fill(0).map(() => []);
  // *这下面是我的代码, 看到leetcode上有一位大佬的代码非常简洁. 但是我这里的循环方式有一些不一样, 算法.md -> 动态规划 -> 5 最长回文子串 中的截图示例. 我是构建的右上方的那部分的. 但是这样一来有一个问题, 我必须要一条斜线来更新数组, 因为判断回文需要依赖左下角的回文情况, 也就是判断 dp[i][j] 是否为回文时, 需要依赖 dp[i+1][j-1] 的值. 而如果我是正常循环来更新数组, 那么就会遇到被依赖的元素没有值的情况, 比如说第一排的最后一个元素, 依赖第二排的倒数第二个元素, 但是这个时候并没有更新这个元素.  所以我更新的方式必须是斜向的, [0][0] [1][1] [2][2]; [0][1] [1][2] [2][3] 这样斜向更新  所以看下面的第三个循环
  // let max = 1;
  // let start = 0;
  // let end = 0;
  // *这两个for循环都是 更新初始值, 这里有些拖沓了 下面的另一种方式更简洁
  // for (let i = 0; i < s.length; i++) {
  //   arr[i][i] = true;
  // }
  // for (let i = 0; i < s.length - 1; i++) {
  //   if (s[i] === s[i + 1]) {
  //     arr[i][i + 1] = true;
  //     if (2 > max) {
  //       max = 2;
  //       start = i;
  //       end = i + 1;
  //     }
  //   } else arr[i][i + 1] = false;
  // }
  // *注意这里 就是斜向的循环方式, 把 i 行数定义在内层循环, i+j 作为列数, 就可以实现行数 +1, 列数也 +1 的斜向循环.
  // for (let j = 2; j < s.length; j++) {
  //   for (let i = 0; i + j < s.length; i++) {
  //     const realJ = i + j;
  //     if (s[i] !== s[realJ]) arr[i][realJ] = false;
  //     else {
  //       arr[i][realJ] = arr[i + 1][realJ - 1];
  //       if (arr[i + 1][realJ - 1] && j + 1 > max) {
  //         max = j + 1;
  //         start = i;
  //         end = i + j;
  //       }
  //     }
  //   }
  // }
  // !下面是leetcode上大佬写的简介代码 https://leetcode-cn.com/problems/longest-palindromic-substring/solution/5zui-chang-hui-wen-zi-chuan-cong-di-gui-44xrh/
  // !这里大佬的更新方式不一样, 他选择的是左下方的部分, 很明显这样的更新方式更好, 因为这样的方式, 如果需要判断回文, 那么依赖的是 右上方的元素, 也就是要判断 dp[i][j] 那么就需要依赖 dp[i-1][j+1] 这个元素, 这样的话,就可以进入正常的顺序循环, 因为当前元素的右上方一定是更新好了的.
  let [start, end] = [0, 0];
  for (let i = 0; i < s.length; i++) {
    // *而且这里还将初始化元素放到了这个循环里面
    arr[i][i] = true;
    // *注意这里的 j 是小于 i 的
    for (let j = 0; j < i; j++) {
      // *这里判断当前子串是否为回文, 还是一样的先判断两边, 如果相同就使用中间子串的结果, 如果不相同那么直接为 false
      // !注意这里, 这里不能直接写一个 ?: 因为对于 j = i+1 的情况下, 也就是当前子串只有两个字符的情况下, 只需要判断这两个字符是否相同就是了, 而且这样的循环, 两个字符的子串的依赖项根本就为 undefined 所以需要特殊处理一下.
      arr[i][j] = s[i] === s[j] ? arr[i - 1]?.[j + 1] ?? true : false; // !这里判断是否为undefined 如果是undefined 那么直接返回true
      // !注意这里, 因为填充的是右下角的部分, 所以此刻的长度应该是 i - j
      if (arr[i][j] && i - j > end - start) {
        // *如果当前是回文子串, 而且长度大于之前的子串长度,那么就进行赋值
        [start, end] = [j, i];
      }
    }
  }
  return s.slice(start, end + 1);
}

console.log(longestPalindromeDP("babad"));

// *还有两种方式:中心扩散 与 马拉车https://leetcode-cn.com/problems/longest-palindromic-substring/solution/bao-li-zhong-xin-kuo-san-dong-tai-gui-hu-qdvv/
// !其中中心扩散与暴力破解有一部分类似, 暴力破解是 两个for循环,前后不断截取子串,判断回文. 中心扩散是使用一个for循环, 遍历字符, 然后直接判断是否为回文, 判断回文的方式很独特, 就是向两边扩散, 因为回文两边的字符应该是相等的. 但是要注意偶数个和奇数个的情况. 这种方式是从中心向两边扩散, 而上面的方式 都是两边向中心
// TODO 马拉车方式可以看一下 好像能解很多题型.
