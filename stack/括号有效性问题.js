"use strict";
/**
 * @param {string} s
 * @return {boolean}
 * @description 时间复杂度为O(n), 空间复杂度，如果没有Map只有一个Array的话就为O(n)如果有Map暂时还不知道
 */
// 我这个写法的速度还要略快于官方的写法 不知道为什么
var isValid = function (s) {
    // 作为栈
    var stack = [];
    // 用于匹配右括号
    var str = ')]}';
    var match = new Map([['(', ')'], ['[', ']'], ['{', '}']]);
    for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
        var i = s_1[_i];
        if (str.includes(i)) {
            var pop = stack.pop();
            if (i !== match.get(pop)) {
                return false;
            }
            continue;
        }
        stack.push(i);
    }
    return !stack.length;
};
var s = '(){[}';
console.log(isValid(s));
// 官方给出的答案
// 官方对于一些方面做了优化，比如当长度为奇数个直接返回false
// new Map([[')','('],[']','['],['}','{']]) 使用这样的Map，就不再需要定义一个 ")]}" 的数组了，直接通过map
// 知道当前是否为右括号，还可以根据右括号判断当前的左括号是否相等 一举两得
function isValidOfficial(s) {
    if (s.length % 2 === 1) {
        return false;
    }
    var stack = [];
    var match = new Map([[')', '('], [']', '['], ['}', '{']]);
    for (var _i = 0, s_2 = s; _i < s_2.length; _i++) {
        var i = s_2[_i];
        if (match.has(i)) {
            // 这里也可以使用stack.pop()代替stack[stack.length -1]
            if (!stack.length || match.get(i) !== stack[stack.length - 1]) {
                return false;
            }
            stack.pop();
            // 但是我觉得这里可以直接不要这个else
        }
        else {
            stack.push(i);
        }
    }
    return !stack.length;
}
