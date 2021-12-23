export function canJump(nums: number[]): boolean {
  if (nums.length < 2) return true;
  const target = nums.length - 1;
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    if (dp[i - 1] >= target) return true;
    if (dp[i - 1] < i) return false;
    dp[i] = Math.max(i + nums[i], dp[i - 1]);
  }
  return false;
}
