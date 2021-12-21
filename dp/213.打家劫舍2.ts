// *打家劫舍2 只是相当于多了一个 第一家 与 最后一家 不能同时打劫的条件而已。  开始想的是能不能进行一些变换，直接使用一个for循环完成，但是很遗憾想不出来，看题解，也没有其他的做法。  所以说做法很简单，就是分为两种情况，因为第一家和最后一家不能同时打劫，所以只需要分为两个情况，第一个保留第一家，第二个保留最后一家，因为有可能是既不会抢第一家也不会抢最后一家，我们只需要给出两种情况，然后判断最大的值就可以了。 比如下面就是直接截取数组，然后对结果进行判断。
export function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0]; else if (nums.length === 2) return Math.max(nums[0], nums[1]);
  return Math.max(rob1(nums.slice(0, -1)), rob1(nums.slice(1))); // *其实在这里可以进行优化，对 rob1 函数添加两个参数，决定数组的开始与结束： start, end 就不用使用 slice 截取数组了
}

function rob1(nums: number[]): number {
  let first = nums[0];
  let second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    let tmp = second;
    second = Math.max(first + nums[i], second);
    first = tmp;
  }
  return second;
}
