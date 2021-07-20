"use strict";
// *这是我的做法，纯粹是使用js的官方函数完成的
function reverseAlgorithm(x) {
    var MAX = Math.pow(2, 31) - 1;
    var MIN = -(Math.pow(2, 31));
    var res;
    if (x < 0)
        res = -((Math.abs(x) + '').split('').reverse().join('') - 0);
    else if (x > 0)
        res = ((x + '').split('').reverse().join('') - 0);
    else
        return 0;
    if (res > MAX || res < MIN)
        return 0;
    return res;
}
console.log(reverseAlgorithm(1534236469));
// *这是官方的做法，官方使用的是将不同位数分别提出来，然后重新组成。
// *因为在js中默认都是8个字节64位的，所以比较大小直接比较就是了，但是在其他语言中int表示整数，而且只占4字节，32位，所以比较比较困难
// *官方是这样比较的，已知 INT_MAX = 2147483647，所以 INT_MAX = (INT_MAX / 10) * 10 + 7 (其他语言中注意整数/10只能得到整数)
// *所以 rev⋅10+digit(digit是余数)≤INT_MAX 可以转换为 rev⋅10+digit≤INT_MAX/10*10 + 7 最终得到 (rev - INT_MAX)*10 <= 7 - digit;
var reverse = function (x) {
    var rev = 0;
    while (x !== 0) {
        var digit = x % 10;
        // *还使用了位运算，~就是位取反，对于正数来说，就是取反再-1，比如~1 = -2 对于负数来说，也是取反-1，比如~-1 = 0;
        // *感觉这里没有必要啊 应该是可以不要的
        x = ~~(x / 10);
        rev = rev * 10 + digit;
        // *这里是每次循环都会进行比较，只要有一次比较成功那么就会退出循环
        if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
};
