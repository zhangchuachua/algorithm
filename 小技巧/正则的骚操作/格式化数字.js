"use strict";
/*
* @param 两个参数，第一个参数是需要被格式化的数字，或者字符串，但是不能包含除了 数字和小数点之外的其他字符；第二个参数是如何被分割开，默认为三位一分；
* @return 返回 false或者字符串，如果匹配失败，返回false
* */
// TODO 还可以进行优化，比如第三个参数，指定哪个符号进行分割
function formatterNumber(num, n) {
    if (n === void 0) { n = 3; }
    var s = num.toString();
    // TODO 目前这里的写法还有点麻烦，需要分为前后两节，而且下面还需要判断是否有小数点。 优化： 希望可以通过正则表达式在多种情况下依旧可以挑选出正确的字符串
    // TODO 期望： '12312s.123' 不匹配   '1232' 匹配 prev='1232' suf=''  '123.3456' 匹配 prev='123' suf='.3456'
    var isNumRex = /^(?<prev>\d*)\.?(?<suf>\d*)$/;
    if (!isNumRex.test(s))
        return false;
    var groups = s.match(isNumRex).groups;
    var prev = '';
    var suf = '';
    if (s.includes('.')) {
        prev = groups.prev;
        suf = "." + groups.suf;
    }
    else {
        prev = "" + groups.prev + groups.suf;
    }
    var r = new RegExp("(\\d)(?=(?:\\d{" + n + "})+$)", 'g');
    return "" + prev.replace(r, '$1,') + suf;
}
console.log(formatterNumber(12345.67, 4));
