export function jump(nums: number[]): number {
  if (nums.length < 2) return 0;
  const target = nums.length - 1;
  const dp = [0];
  for(let i = 0; dp.length < nums.length; i++) {
    for(let j = i; j < nums[i]; j++) {
      dp[i+j+1] = dp[i] + 1;
    }
  }
  return dp[target];
}

console.log(jump([2,3,1,1,4,4,2,1,1,1,1,1,1,2,3,3,4,4,1,1,1,1,1,1,2,1,1,2]));
