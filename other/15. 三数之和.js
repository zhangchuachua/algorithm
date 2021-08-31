//* 这个版本可太垃圾了，时间复杂度和空间复杂度都拉到最高。
function threeSum(nums) {
    if (nums.length < 3)
        return [];
    var set = new Set([]);
    for (var i = 0; i < nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            var result = nums[i] + nums[j];
            var index = nums.indexOf(0 - result, j + 1);
            if (index !== -1) {
                var arr = [nums[i], nums[j], nums[index]];
                arr.sort(function (a, b) { return a - b; });
                set.add(JSON.stringify(arr));
            }
            ;
        }
    }
    var res = [];
    set.forEach(function (value) {
        res.push(JSON.parse(value));
    });
    return res;
}
;
console.log(threeSum([-4, -2, 1, -5, -4, -4, 4, -2, 0, 4, 0, -2, 3, 1, -5, 0]));
