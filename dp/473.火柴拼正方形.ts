// *473.火柴拼正方形 https://leetcode.cn/problems/matchsticks-to-square/  标签：位运算，数组，动态规划，回溯，状态压缩

export function makesquare(matchsticks: number[]): boolean {
    if (matchsticks.length < 4) return false;
    const edge = matchsticks.reduce((a, b) => a + b);
    if (Math.floor(edge) !== edge) return false;

}