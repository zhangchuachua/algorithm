// *这个解法 太丑陋拉！！！虽然确实解出来了
// !我在这里进行了三个情况的判断。当 b 里面完全包含 a 的时候，是最理想的一种情况，这个情况下，只需要把全部的 a 字符串提取出来，然后观察左右两边剩余的子串，就可以判断需要重复几次了。因为只判断了 b 包含 a， 但是 a 包含 b 的情况，会返回 false, 所以第二种情况就是 a 包含 b 的情况，这个时候 b 已经是 a 的子串了，所以直接返回 1，最后就是第三种情况，与第二种情况差不多，比如：aaaab, ba 很明显，两个 a 字符串重复就可以了，所以直接返回 2    不然就返回 -1
// !这样的解法，简直是又丑陋，又没有分析，完全考撞出来的。  不要看这里，直接看题解
export function repeatedStringMatch(a: string, b: string): number {
  if (b.includes(a)) {
    const arr = b.split(a);
    const lastIndex = arr.length - 1;
    if (arr.filter((item) => item !== "").length > 2) return -1;
    if (
      a.slice(a.length - arr[0].length) !== arr[0] ||
      a.slice(0, arr[lastIndex].length) !== arr[lastIndex]
    )
      return -1;
    if (arr[0] === "" && arr[lastIndex] === "") return lastIndex;
    else if (arr[0] !== "" && arr[lastIndex] !== "") return lastIndex + 2;
    else return lastIndex + 1;
  }
  if (a.includes(b)) return 1;
  else if ((a + a).includes(b)) {
    return 2;
  } else return -1;
}

// console.log(repeatedStringMatch("aa", "a"));

// *以下是题解部分。

/*
* 首先进行分析：  分析下界和上界
* 下界：因为要满足，b 是 a 的子串这个条件，那么说明：重复后的 a 的长度，一定大于等于 b ； 所以得出下界：重复次数n * a.length >= b.length
* 上界：b 是 重复后 a 的子串，那么 b 已经被包含在其中，然后来列举可能出现的几种情况(假设目前重复后的 a 的长度恰好大于等于 b 的长度），b 的头部，小于等于 a 的头部，b 的尾部小与等于 a 的尾部，那么这个时候，上界与下界相等。第二种情况：b 的头部小于等于 a 的头部，b 的尾部大于 a 的尾部，这个时候应该再将 a 重复一次，也就是说 上界n2 = 下界n1 + 1; 接下来应该就没有其他符合要求的情况了。 所以得出上界 最多为 下界 + 1；
* 仔细思考一下，b 的头部肯定不能大于 a 的头部，这种情况要不然就不符合要求，要不然就会在最开始匹配。 b 的头部也不能大于 a 的尾部，不然就是不符合要求。 。。。
* 所以正常判断的话，只需要一个循环，如果 循环到 (a.length >= b.length) + 1 还是不匹配，那么就返回 -1
* */
export function repeatStringMatchOptimization(a: string, b: string): number {
  for (let i = 0; i < Math.ceil(b.length / a.length) + 1; i++) {// *这里也可以不用循环，直接重复Math.ceil(b.length / a.length) 次
    const repeatRes = a.repeat(i + 1);
    if (repeatRes.length >= b.length && repeatRes.includes(b)) return i + 1;
  }
  return -1;
}

// *子串匹配算法,也叫 RK 算法,全称叫: Rabin-Karp 算法, 专门用于结局, 子串的匹配问题, 这道题也算一个子串匹配问题, 所以可以用这个算法解决

const repeatedStringMatchRK = (a: string, b: string): number => {
  const an = a.length, bn = b.length;
  const index = strStr(a, b);
  if (index === -1) {
    return -1;
  }
  if (an - index >= bn) {
    return 1;
  }
  return Math.floor((bn + index - an - 1) / an) + 2;
};

const strStr = (haystack: string, needle: string) => {
  const n = haystack.length, m = needle.length;
  if (m === 0) {
    return 0;
  }

  let k1 = 1000000009;
  let k2 = 1337;
  let kMod1 = Math.floor(Math.random() * k1) + k1;
  let kMod2 = Math.floor(Math.random() * k2) + k2;

  let hashNeedle = 0;
  for (let i = 0; i < m; i++) {
    const c = needle[i].charCodeAt(0);
    hashNeedle = (hashNeedle * kMod2 + c) % kMod1;
  }
  let hashHaystack = 0, extra = 1;
  for (let i = 0; i < m - 1; i++) {
    hashHaystack = (hashHaystack * kMod2 + haystack[i % n].charCodeAt(0)) % kMod1;
    extra = (extra * kMod2) % kMod1;
  }
  for (let i = m - 1; (i - m + 1) < n; i++) {
    hashHaystack = (hashHaystack * kMod2 + haystack[i % n].charCodeAt(0)) % kMod1;
    if (hashHaystack === hashNeedle) {
      return i - m + 1;
    }
    hashHaystack = (hashHaystack - extra * haystack[(i - m + 1) % n].charCodeAt(0)) % kMod1;
    hashHaystack = (hashHaystack + kMod1) % kMod1;
  }
  return -1;
};


console.log(repeatedStringMatchRK('aab', 'ba'));
