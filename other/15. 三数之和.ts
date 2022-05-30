//* 这个版本可太垃圾了，时间复杂度和空间复杂度都拉到最高。
export function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    const set: Set<string> = new Set([]);
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const result = nums[i] + nums[j];
            const index = nums.indexOf(0 - result, j + 1);
            if (index !== -1) {
                const arr = [nums[i], nums[j], nums[index]];
                arr.sort((a, b) => a - b);
                set.add(JSON.stringify(arr));
            }
        }
    }
    const res: number[][] = [];
    set.forEach(value => {
        res.push(JSON.parse(value));
    })
    return res;
};

function binarySearch(nums: number[], target: number): number | null {
    if (!nums.length) return null;
    const middleIndex = Math.floor(nums.length / 2);
    if (nums[middleIndex] === target) return nums[middleIndex];
    if (target > nums[middleIndex]) return binarySearch(nums.slice(middleIndex + 1), target);
    else return binarySearch(nums.slice(0, middleIndex), target);
}

// *三数之和的优化版本，添加了许多剪枝操作，并且使用二分查找进行优化
export function threeSumOptimization(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    nums = nums.sort((a, b) => (a - b));
    // *二分查找需要有序数组
    // *如果最小值大于0 那么直接返回
    if (nums[0] > 0) return [];
    const last = nums.length - 1;
    // *如果最大值小于 0 那么直接返回
    if (nums[last] < 0) return [];
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        // *跳过重复的值，避免重复的结果
        if (nums[i] === nums[i - 1]) continue;
        for (let j = i + 1; j < last; j++) {
            // *跳过重复的值
            if (j - 1 > i && nums[j] === nums[j - 1]) continue;
            // *得出 target，这里没有直接写 - (nums[i] + nums[j]) 因为 -(0 + 0) 得到的是 -0 虽然不知道对结果有什么影响
            const target = 0 - (nums[i] + nums[j]);
            if (target > nums[last]) continue;
            if (target < nums[j + 1]) continue;
            // 二分搜索
            if (binarySearch(nums.slice(j + 1), target) !== null) res.push([nums[i], nums[j], target])
        }
    }
    return res;
};

// !这里是双指针的做法，其实总体的思路是差不多的，只是使用了双指针，减少了一个嵌套的循环
export function threeSumPoint(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    nums = nums.sort((a, b) => a - b);
    if (nums[0] > 0) return [];
    const last = nums.length - 1;
    // *如果最大值小于 0 那么直接返回
    if (nums[last] < 0) return [];
    const res: number[][] = [];
    for (let i = 0; i < nums.length - 2 && nums[i] <= 0; i++) {
        if (nums[i] === nums[i - 1]) continue;
        const target = 0 - nums[i];
        // !定义双指针
        let prevPoint = i + 1;
        let nextPoint = last;
        // *前面的指针要小于后面的
        while (prevPoint < nextPoint) {
            // *同样的跳过相同值的操作，为什么只需要 prevPoint 跳过相同值呢？ 第一是因为 nextPoint 跳不了 第二是因为 prevPoint + nextPoint = sum 当一个值发生改变 那么 sum 就会改变，所以不需要两个指针都跳过相同值
            if (nums[prevPoint] === nums[prevPoint - 1] && prevPoint - 1 > i) {
                prevPoint += 1;
                continue;
            }
            const sum = nums[prevPoint] + nums[nextPoint];
            // 等于的时候就直接 push
            if (sum === target) {
                res.push([nums[i], nums[prevPoint], nums[nextPoint]]);
                prevPoint += 1;
                nextPoint -= 1;
                // *target 大于 sum 的话，就要让小指针变大
            } else if (target > sum) {
                prevPoint += 1;
            } else {
                nextPoint -= 1;
            }
        }
    }
    return res;
}

console.log(threeSumPoint([-4, -2, 1, -5, -4, -4, 4, -2, 0, 4, 0, -2, 3, 1, -5, 0]));