// *这个解法 太丑陋拉！！！虽然确实解出来了
// !我在这里进行了三个情况的判断。当 b 里面完全包含 a 的时候，是最理想的一种情况，这个情况下，只需要把全部的 a 字符串提取出来，然后观察左右两边剩余的子串，就可以判断需要重复几次了。因为只判断了 b 包含 a， 但是 a 包含 b 的情况，会返回 false, 所以第二种情况就是 a 包含 b 的情况，这个时候 b 已经是 a 的子串了，所以直接返回 1，最后就是第三种情况，与第二种情况差不多，比如：aaaab, ba 很明显，两个 a 字符串重复就可以了，所以直接返回 2    不然就返回 -1
// !这样的解法，简直是又丑陋，又没有分析，完全考撞出来的。  不要看这里，直接看题解
export function repeatedStringMatch(a: string, b: string): number {
  if (b.includes(a)) {
    const arr = b.split(a);
    const lastIndex = arr.length - 1;
    if (arr.filter((item) => item !== '').length > 2) return -1;
    if (
      a.slice(a.length - arr[0].length) !== arr[0] ||
      a.slice(0, arr[lastIndex].length) !== arr[lastIndex]
    )
      return -1;
    if (arr[0] === '' && arr[lastIndex] === '') return lastIndex;
    else if (arr[0] !== '' && arr[lastIndex] !== '') return lastIndex + 2;
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

// !字符串哈希教程：https://www.bilibili.com/video/BV12T4y1g7Vc?from=search&seid=14862855392596893775&spm_id_from=333.337.0.0

// *要判断是否是子串，如果使用循环比较的方式时间复杂度很高，一般都为字符串的长度，但是使用字符串哈希可以让空间复杂度降低为 O(1) 原理就是将字符串转换为 number，计算机直接比较 number 就可以做到空间复杂度为 O(1) ，比如说全是小写字母的字符串，就可以使用 26 进制，比如说 abc = 1*26^2 + 2*26^1 + 3*26^0 这样就转换为数字了，因为小写字母一共有 26 个，这样一来所有小写字母组成的字符串都可以转换为一个独立的，唯一的数字。 但是如果对中文文字进行 hash 转换的话，因为中文的字非唱多，我们如果取十万进制的话，那么就算是一个长度为十的字符串转换成的数字大小都是： X*100000^9... 这样肯定是不行的，所以我们可以对这个数字进行取模操作，也就是 % 。但是对 取模 数字的选取也很重要，比如说如果取 2 的话，那么得出的结果，一定是 0， 1，很明显，非常容易发生冲突，
// !所以我们取模的数应该尽可能的大，同时这个数最好与进制数互质，互质说明两个数不能互相除，可以减少出错。
// !当取 131, 1331, 13331, ... 作为进制时，出错是最少的，这个是由计算机科学家得出的。
// !通过上面两步还是有可能会发生错误，也就是哈希冲突所以我们还需要解决冲突
// !第一种，可以直接直接比较子串每个字符。但是时间复杂度较高
// !第二种，计算的时候使用不同的取模值，计算出两个结果，这个时候两个结果都是错误的概率是非常小的。
// !布隆过滤?
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

const strStr = (a: string, b: string) => {
  const n = a.length, m = b.length;
  if (m === 0) {
    return 0;
  }

  let k1 = 1000000009;
  let k2 = 1337;
  let kMod1 = Math.floor(Math.random() * k1) + k1;// *取模的值，也就是 mod  这里是通过计算的方式得出的
  let kMod2 = Math.floor(Math.random() * k2) + k2;// *这里是得出的进制数，也是通过计算的方式得出，与上面的解释有一点出入，但是并不影响。

  let hashNeedle = 0;
  // *循环，对 b 进行 hash 转换。
  for (let i = 0; i < m; i++) {
    // *得出当前字符的 ASCII 码。
    const c = b[i].charCodeAt(0);
    // !然后转换为 hash 值。注意：这里的表达式：比如说当前字符串为： abc 那么整个字符串的值为 1*26^2 + 2*26^1 + c*26^0 (假设这里的 a 为 1, 进制数 X 为 26) 因为循环只能一个一个遍历啊，所以真实过程是： a -> ab -> abc，a: 1*26^0 ab: 1*26^1 + 2*26^1，很明显 ab = hashCode(a) * X + b 。 这个表达式就是这么推导出来的。  最后再取模。
    hashNeedle = (hashNeedle * kMod2 + c) % kMod1;
  }
  let hashHaystack = 0, extra = 1;
  for (let i = 0; i < m - 1; i++) {
    hashHaystack = (hashHaystack * kMod2 + a[i % n].charCodeAt(0)) % kMod1;
    extra = (extra * kMod2) % kMod1;
  }
  for (let i = m - 1; (i - m + 1) < n; i++) {
    hashHaystack = (hashHaystack * kMod2 + a[i % n].charCodeAt(0)) % kMod1;
    if (hashHaystack === hashNeedle) {
      return i - m + 1;
    }
    hashHaystack = (hashHaystack - extra * a[(i - m + 1) % n].charCodeAt(0)) % kMod1;
    hashHaystack = (hashHaystack + kMod1) % kMod1;
  }
  return -1;
};


console.log(repeatedStringMatchRK('aab', 'ba'));
