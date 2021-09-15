// *这个题目之前在set时就已经做过了，之前使用的set来做，这里使用字典，也就是map来做
// *这个题就很简单了，只是这里换成了完全使用map来实现
function intersection(nums1: number[], nums2: number[]): number[] {
  const map = new Map();
  // *这里遍历数组，建立一个新的map
  nums1.forEach((item, index) => {
    map.set(item, index);
  })
  // *这里遍历数组2，如果数组2也有对应的元素，那么就是公有的元素。
  return nums2.filter(item=>{
    if(map.has(item)) {
      // *这里要删除map中的值，如果不删除可能会有重复的值。
      map.delete(item);
      return true;
    }
  })
}

console.log(intersection([8,0,3], [0]))
