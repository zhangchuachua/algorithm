// *这个题确实很难

// !卧槽居然过了 这里的做法基本与视频中的一致，确实没有想出来解法。
// *这种做法其实就跟暴力破解差不多，使用了滑动窗口的暴力破解。这里使用map的方法很巧妙，因为map里面的key不能重复，所以这里不让值为index，而是让值为字符的个数，这样一个map就可以表示一整个字符串了。
function minWindow(s: string, t: string): string {
  if (s.length < t.length) return '';
  const tMap = new Map();
  // *这里使用map代替字符串。
  for (let i of t) {
    tMap.set(i, tMap.has(i) ? tMap.get(i) + 1 : 1);
  }
  // 左右指针和最终结果  注意当没有最小子串时 返回空字符串 所以我们这里把它初始化为空字符串
  let leftIndex = 0;
  let rightIndex = 0;
  let res = '';
  // 这里的两个while就是就是暴力破解，几乎将所有的子串都列出来，然后比较其长度而已。
  while (leftIndex < s.length) {
    // *这里移动左指针，不论长度，先获取包含T所有字符的子串。
    if (tMap.has(s[leftIndex])) {
      tMap.set(s[leftIndex], tMap.get(s[leftIndex]) - 1);
    }
    // *两个指针之间的字符串 包含了T的所有字符时，就需要移动右指针了 注意这里比较的方式，我这里是直接将values放出来，如果最大的是0的话，就表示包含所有的字符了，就进入循环。 我这里用者更方便。 还有一种方法应该性能更好，使用一个变量来存储map中所有的key， const needKey = tMap.size; 然后每有一个key的value为0时就让这个值-1；如果这个值等于0，那么代表左右指针之间包含所有的字符了。 但是操作会多一些。
    while (Math.max(...tMap.values()) === 0) {
      // 直接截取字符串
      const str = s.slice(rightIndex, leftIndex + 1);
      if (res === '') res = str;
      else if (str.length < res.length) res = str; // 因为初始化为空字符串不能直接比较长度
      // *如果当前字符属于tMap的key的话，就让他的value+1，这样不一定会跳出循环，因为有可能区间中有多个相同的字符。比如 s='abacbba' t='bba' 那么tMap 需要两个b，一个a，进入这个循环的时候两个指针之间的字符串应该是： 'abacb' 才满足条件，这里的第一个a 就会让a的value+1 但是进入这个循环时 a的value为-1 所以+1也不会跳出循环。  如果是使用 needKey 的方法，还要在这里进行判断才可以。
      if (tMap.has(s[rightIndex])) {
        tMap.set(s[rightIndex], tMap.get(s[rightIndex]) + 1);
      }
      // *然后再让右指针+1
      rightIndex += 1;
    }
    // *左指针+1
    leftIndex += 1;
  }
  return res;
}

console.log(minWindow('abacbba', 'bba'));
