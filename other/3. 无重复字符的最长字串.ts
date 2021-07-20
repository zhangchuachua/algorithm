// *这是我自己做法，整体来说比较笨，就是提取出所有的子串，然后进行比较。我这个方法在特定情况下要比暴力求解好一点点
// *但是极限的时间复杂度还是O(n^2)，暴力求解就是逐个逐个找不重复的，知道遇到重复的，或者字符串遍历完成，比如 'abcabc'，
// *就会从a开始找没有重复字符的子串，为abc，然后再从b开始为bca，一直循环，直到完成。
// !为什么说它比暴力破解好一些呢，因为暴力破解无论如何都会O(n^2)，而我这个方法在一些情况下，遍历完成就直接完成了
// *我这个方法好像就是滑动窗口做法（并不是，这是垃圾版的滑动窗口，等于是滑动窗口与暴力解法的集合了）
function lengthOfLongestSubstring(s: string): number {
  // *我的思路大概为 创建一个存储当前最长字串的subString，直接返回这个变量的length
  let subString = '';
  // *遍历时存储不重复字串
  let str = '';
  // *用于存储当前字串的开始索引
  let index = 0;
  // *用于遍历总字符串
  let i = 0;
  while (i < s.length) {
    // *如果当前的str不重复字串中存在当前遍历的字符，那么表示还没有发生重复，然后就把str继续加长
    if (!str.includes(s[i])) {
      str += s[i];
      i += 1;
    } else {// *这里str中的字符与当前字符发生了重复
      if (str.length > subString.length) {
        subString = str;
      }
      // !注意这里很重要，我们就需要重新定位到与当前遍历字符发生重复的第一个字符的位置处，比如 'abcabcabc' 我们遇到了第二个a，
      // !我们就需要找到第一个a，然后移到下一个，也就是b，这个很重要，不然会陷入死循环，这个index也是这个作用，比如遇到了
      // !第三个a，这个时候的index就会提示我们这个当前字串从哪里开始的，直接跳过第一个a，从第二个a开始查找
      i = s.indexOf(s[i], index) + 1; // *这里的i已经指向了下一个所索引
      // *对index重新赋值，因为字串已经重新赋值
      index = i;
      str = s[i];
      i += 1;
    }
    console.log(str)
  }
  if (str?.length > subString.length) subString = str;
  return subString.length;
};

// console.log(lengthOfLongestSubstring("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"));

// *这个方法不是官方的方法，是一个老哥评论的，也是使用了窗口滑动的方法，但是优化了一下
// *窗口滑动与我上面有些类似，但是我上面太冗余了，完全不需要一个额外的变量存储字符串，也不需要再将i倒回去重新遍历，
// *只需要一个前置的index就可以了，比如minIndex, i这个区间的就是需要使用的字符串
function lengthOfLongestSubstringOptimization(s: string): number {
  // *前置index
  let minIndex = 0;
  // *存储最大的字符串长度
  let max = 0;
  // *进行遍历
  for (let i = 0; i < s.length; i += 1) {
    // !重点在这里，我们必须当重复字符串小于当前的i时，才修改前置index的位置，合理！
    // *如果是s.indexOf(s[i],minIndex !== -1 这样的判断条件，那么每一次都会判断成功，比如'abcabc' 第一次判断'a'
    // *s中有a的存在，那么就直接对minIndex进行修改，修改为minIndex指向b，下一个判断b，然后又判断成功……
    if (s.indexOf(s[i], minIndex) < i) {
      minIndex = s.indexOf(s[i], minIndex) + 1;
    } else {
      // *这里也还是比较重要，每一次都会对max进行更新，当然，也隐含了比较
      max = Math.max(max, i - minIndex + 1);
    }
  }
  return max;
}

// console.log(lengthOfLongestSubstringOptimization('abcabcbb'));

// *这是官方的做法，还是有点难以理解了
function lengthOfLongestSubstringOfficical(s: string): number {
  // *使用Set保证没有重复的字符
  const occ = new Set();
  // 这里无意义,因为这里的n全局只使用了一次
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1, max = 0;
  // *开始遍历
  for (let i = 0; i < n; ++i) {
    // *这里也算是一个重点了，可以先看下面的while循环再来看这个会比较好理解，而且建立使用打印set，来观察一下
    // *这里其实就是set里面的字符串的开始位置切换为当前的字符，保证都是以当前字符开始的最长非重复字串
    // *比如'abcabcbb'，第一次occ的值为{'a','b','c'},为什么一开始不删除一个呢，因为一开始就是以a开头的，所以这个abc就是以a开头的最短的非重复子串，
    // *然后第一次for循环后，就删除a，因为现在的字符是b，要保证以b开头，所以要删除a
    if (i != 0) {
      console.log('before', occ)
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
      console.log('after', occ);
    }
    // *这里while循环，就是向occ里面填充当前子串的，比如还是'abcabcbb'，第一次就可以获得'abc',第二次删除了a后，就剩下了bc，但是
    // *以b开头，我们就可以再往里面填充一个a，变成了bca，循环往复。
    // !这里的重点是rk一开始为-1，所以都是使用的rk+1，这是为了让rk刚好指向当前的子串的末尾，比如第一次的'abc'，i指向的是a，
    // !rk就应当指向c，如果rk一开始就为0的话，然后下面的rk+1都变成rk，最终这个while循环后，rk指向的是c的下一个元素a了。
    // !这个时候来计算这个子串的长度，就比较奇怪了。所以还是以rk指向当前子串的末尾好一点，所以初始值为-1
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1));
      ++rk;
    }
    // 每一次for循环都使用Math.max()更新max
    max = Math.max(max, rk - i + 1);
  }
  return max;
};


console.log(lengthOfLongestSubstringOfficical('abcadc'));
