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
Object.defineProperty(exports, "__esModule", { value: true });
// *这是我一开始的思路，理清那些值后面可以接那些值，并且使用邻接表的方式列出来，然后循环字符串，比较当前字符和下一个字符是否符合规则，如果不符合规则就返回false，但是我这里对于特殊情况很难做，比如 'e' 'e9' 这样总是判断为true
// !这种做法完全就是不了解图的定义
// const graph: Graph = {
//   '0': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '1': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '2': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '3': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '4': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '5': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '6': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '7': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '8': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '9': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'e', 'E'],
//   '.': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
//   '+': ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
//   '-': ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
//   'e': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-'],
//   'E': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-']
// };
//
// function isNumber(s: string): boolean {
//   for (let i = 0; i < s.length - 1; i++) {
//     const current = s[i];
//     const next = s[i + 1];
//     const allowCurrent = graph[current];
//     if(!allowCurrent || !allowCurrent.includes(next)) return false
//   }
//   return true;
// };
// !解体思路需要使用看看 算法.md 里面对应的一节
// *注意这里的图的构建方式  后面添加的字符是哪一种就移动到对应的状态上去
// !感觉图的构建才是最难的，不是说这里的把图抽象称对象而是画出图的对应关系
var graph = {
    0: { 'blank': '0', 'sign': '1', '.': '2', 'digit': '6' },
    1: { 'digit': '6', '.': '2' },
    2: { 'digit': '3' },
    3: { 'digit': '3', 'e': '4' },
    4: { 'digit': '5', 'sign': '7' },
    5: { 'digit': '5' },
    6: { 'digit': '6', '.': '3', 'e': '4' },
    7: { 'digit': '5' }
};
function charJudge(char) {
    if (char === ' ')
        return 'blank';
    if (char === '.')
        return '.';
    if (!isNaN(Number(char)))
        return 'digit';
    if (char === 'e' || char === 'E')
        return 'e';
    if (char === '+' || char === '-')
        return 'sign';
    return 'undefined';
}
function isNumber(s) {
    var e_1, _a;
    var currentStatus = '0';
    try {
        for (var _b = __values(s.trim()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var i = _c.value;
            var charType = charJudge(i);
            var a = graph[currentStatus][charType];
            console.log(i, a, charType);
            if (!a)
                return false;
            currentStatus = a;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return ['3', '5', '6'].includes(currentStatus);
}
;
