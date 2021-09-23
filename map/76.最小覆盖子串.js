"use strict";
// *这个题确实很难
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// !卧槽居然过了 这里的做法基本与视频中的一致，确实没有想出来解法。
// *这种做法其实就跟暴力破解差不多，使用了滑动窗口的暴力破解。这里使用map的方法很巧妙，因为map里面的key不能重复，所以这里不让值为index，而是让值为字符的个数，这样一个map就可以表示一整个字符串了。
function minWindow(s, t) {
    var e_1, _a;
    if (s.length < t.length)
        return '';
    var tMap = new Map();
    try {
        // *这里使用map代替字符串。
        for (var t_1 = __values(t), t_1_1 = t_1.next(); !t_1_1.done; t_1_1 = t_1.next()) {
            var i = t_1_1.value;
            tMap.set(i, tMap.has(i) ? tMap.get(i) + 1 : 1);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (t_1_1 && !t_1_1.done && (_a = t_1.return)) _a.call(t_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // 左右指针和最终结果  注意当没有最小子串时 返回空字符串 所以我们这里把它初始化为空字符串
    var leftIndex = 0;
    var rightIndex = 0;
    var res = '';
    // 这里的两个while就是就是暴力破解，几乎将所有的子串都列出来，然后比较其长度而已。
    while (leftIndex < s.length) {
        // *这里移动左指针，不论长度，先获取包含T所有字符的子串。
        if (tMap.has(s[leftIndex])) {
            tMap.set(s[leftIndex], tMap.get(s[leftIndex]) - 1);
        }
        // *两个指针之间的字符串 包含了T的所有字符时，就需要移动右指针了 注意这里比较的方式，我这里是直接将values放出来，如果最大的是0的话，就表示包含所有的字符了，就进入循环。 我这里用者更方便。 还有一种方法应该性能更好，使用一个变量来存储map中所有的key， const needKey = tMap.size; 然后每有一个key的value为0时就让这个值-1；如果这个值等于0，那么代表左右指针之间包含所有的字符了。 但是操作会多一些。
        while (Math.max.apply(Math, __spreadArray([], __read(tMap.values()))) === 0) {
            // 直接截取字符串
            var str = s.slice(rightIndex, leftIndex + 1);
            if (res === '')
                res = str;
            else if (str.length < res.length)
                res = str; // 因为初始化为空字符串不能直接比较长度
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
