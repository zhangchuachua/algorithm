"use strict";
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
/**
 * @param {string} s
 * @return {boolean}
 * @description 时间复杂度为O(n), 空间复杂度，如果没有Map只有一个Array的话就为O(n)如果有Map暂时还不知道
 */
// 我这个写法的速度还要略快于官方的写法 不知道为什么
var isValid = function (s) {
    var e_1, _a;
    // 作为栈
    var stack = [];
    // 用于匹配右括号
    var str = ')]}';
    var match = new Map([['(', ')'], ['[', ']'], ['{', '}']]);
    try {
        for (var s_1 = __values(s), s_1_1 = s_1.next(); !s_1_1.done; s_1_1 = s_1.next()) {
            var i = s_1_1.value;
            if (str.includes(i)) {
                var pop = stack.pop();
                if (i !== match.get(pop)) {
                    return false;
                }
                continue;
            }
            stack.push(i);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (s_1_1 && !s_1_1.done && (_a = s_1.return)) _a.call(s_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    var e_2, _a;
    if (s.length % 2 === 1) {
        return false;
    }
    var stack = [];
    var match = new Map([[')', '('], [']', '['], ['}', '{']]);
    try {
        for (var s_2 = __values(s), s_2_1 = s_2.next(); !s_2_1.done; s_2_1 = s_2.next()) {
            var i = s_2_1.value;
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
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (s_2_1 && !s_2_1.done && (_a = s_2.return)) _a.call(s_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return !stack.length;
}
