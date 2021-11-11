import randomArr from "./randomArr";

// *计数排序 https://www.cnblogs.com/xiaochuan94/p/11198610.html 这一篇文章已经讲的非常清楚了，
// *计数排序就是空间换时间， 它使用了数组有序的特点，而且 js 中的数组可以使用负数（其实是字符串）作为索引的特点。 这种方法不需要进行比较  将数组的值变成索引，值就为重复的次数 比如说 [99,100,101,99] 这个数组 就变成了 { 99: 2, 100: 1, 101: 1 } 然后在根据遍历这个数组出来就可以了。
export function countSort(nums: number[]): number[] {
  // *找到最大最小值
  const max = Math.max(...nums);
  const min = Math.min(...nums);
  // !根据最大最小值来创建数组， 这里没有直接使用max作为长度生成数组 比如 [99,102,101] 这个数组如果按照最大的生成，那么需要长度102的数组，但是使用 max - min +1 只需要4个长度数组。 但是存储的值 都需要-min  并且全部填充0
  const arr = Array.from({ length: max - min + 1 }, () => 0);
  for (let i of nums) {
    arr[i - min]++; // 将对应的索引的值++ 如果有重复的也就++了
  }

  const result: number[] = [];
  for (let i in arr) { // *遍历数组 使用 for-in 来遍历 可以遍历负数的索引
    if (arr[i] > 0) { // *只取大于0的索引
      result.push(...Array.from<number, number>({ length: arr[i] }, () => +i + min)); // !注意这里的值应该+min  而且for-in的i是字符串 这里使用 +i 转换为数字
    }
  }
  return result;
}

console.log(countSort(randomArr(50)));
