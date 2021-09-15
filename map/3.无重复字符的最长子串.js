"use strict";
// *这道题我在没有看过视频的情况下做过，目前看使用map来做一下。
// *这里使用了map进行了优化，首先这里的基本思想还是一样的，通过滑动窗口的方法来解决问题。也就是 /other/3.无重复字符的最长子串.ts 里面的第二种解法，只不过换了map，两者的性能其实没有太大差距的。
// *一开始我的想法是使用 map 不断的放进新的不同的字符，然后遇到相同字符的时候直接取缔之前的字符。但是后面发现不止要取缔字符，应该取缔字符之前的字符串，但是没有找到map批量删除元素的方法。
// *所以换了与之前差不多的解法，还是使用 leftIndex - rightIndex + 1 的方法来解的。
function lengthOfLongestSubstringMap(s) {
    var map = new Map();
    var maxsize = 0;
    var rightIndex = 0;
    for (var i = 0; i < s.length; i++) {
        // *重点是这里，将map的优势利用了起来，就不用再indexOf了。这里如果map里面有当前字符，而且对应的index应该大于等于 rightIndex，注意这里是大于等于，这是为了避免恰好i等于rightIndex的情况。
        if (map.has(s[i]) && map.get(s[i]) >= rightIndex) {
            // rightIndex移到相同的字符后一位。
            rightIndex = map.get(s[i]) + 1;
        }
        // 这里直接覆盖，没有问题，map本来就不是有序的。
        map.set(s[i], i);
        maxsize = Math.max(maxsize, i - rightIndex + 1);
    }
    return maxsize;
}
