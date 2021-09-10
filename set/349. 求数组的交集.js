"use strict";
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
// *这个算法可太简单了
function intersection(nums1, nums2) {
    var set1 = new Set(nums1);
    var set2 = new Set(nums2);
    return __spreadArray([], __read(set1)).filter(function (item) {
        return set2.has(item);
    });
}
;
// *官方除了使用set方法外，还使用了一种方法，双指针遍历法，先把两个数组进行排序，然后定义两个指针分别从排序后的数组开始遍历。
// *每次遍历，都比较大小，如果有相等的，那么就属于交集，放到数组中，并且向前移动一位。我这里偷懒了，放到了set里面，如果是放到数组里面，还要
// *先判断里面是否有相同的值。如果不相等的话，那么就让比较小的向前移动一位。只到一个数组遍历完毕。因为是排过序的，而且两两相比，
// *那么一个数组遍历完成后，必然得出了交集。很好理解
function intersectionNoSet(nums1, nums2) {
    nums1 = nums1.sort(function (a, b) { return a - b; }); // 升序排序
    nums2 = nums2.sort(function (a, b) { return a - b; });
    var index1 = 0;
    var index2 = 0;
    var res = new Set();
    while (index1 < nums1.length && index2 < nums2.length) {
        var n1 = nums1[index1];
        var n2 = nums2[index2];
        if (n1 === n2) {
            res.add(n1);
            index1++;
            index2++;
        }
        else if (n1 > n2)
            index2++;
        else
            index1++;
    }
    return __spreadArray([], __read(res));
}
console.log(intersectionNoSet([4, 7, 9, 7, 6, 7], [5, 0, 0, 6, 1, 6, 2, 2, 4]));
