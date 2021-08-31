//* 这个版本可太垃圾了，时间复杂度和空间复杂度都拉到最高。
function threeSum(nums: number[]): number[][] {
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
      };
    }
  }
  const res:number[][] = [];
  set.forEach(value => {
    res.push(JSON.parse(value));
  })
  return res;
};

console.log(threeSum([-4, -2, 1, -5, -4, -4, 4, -2, 0, 4, 0, -2, 3, 1, -5, 0]));