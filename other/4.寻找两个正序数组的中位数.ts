// 这个算法的难点就在于一个排序的问题，我们如果使用一般的排序法，很容易O(n^2),但是题目种提示两个数组都是正序的，所以我们就可以
// 将两个数组按元素的大小正序的创建一个新数组。
// *所以我的想法很简单，就是遍历数组，然后比较大小，正序排列得到一个新数组。我的解法时间复杂度为O(m+n), 空间复杂度为O(m+n)
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // *第一步先进行变量的初始化，我这里定义了max和min，专门用于存储最后一个值大的数组和最后一个值小的数组，这很重要，下面的循环讲解
  let max: number[];
  let min: number[] = [];
  // *创建新的数组存放元素
  const newArr: number[] = [];
  // *判断和比较挑选出较大的数组和较小的数组
  if (nums1.length && nums2.length) {
    if (nums1[nums1.length - 1] > nums2[nums2.length - 1]) {
      max = nums1;
      min = nums2;
    } else {
      max = nums2;
      min = nums1;
    }
  } else if (nums1.length) {
    max = nums1;
  } else {
    max = nums2;
  }
  // *这个用于存储while循环的数组的索引值
  let j = 0;
  // *这里的循环嵌套与具体的赋值策略有关，这只是当前的做法：这里两个循环嵌套，先说一下为什么要分max和min，比如说又两个数组， [-5, -3], [-4, 3]，我们可以知道最后一个压入数组的
  // *永远是最大的哪一个，因为我们是正序的，如果的是倒序的则相反。所以外层的循环就应该是max数组，才能够让最大的最后一个压入数组。
  // *如果是小的在外层，那么外层循环已经遍历到最后一个元素，但是内部还没有完成，然后就结束了循环，这是错误的。
  for (let i = 0; i < max.length; i += 1) {
    // *为什么使用while循环呢，因为我需要按顺序压入新数组，而两个数组在组合的过程中，可能会有大小交错的时候，这个时候我们就需要交替
    // *压入新数组，所以内部的循环就需要暂时停止，只到大小正确。开始我使用for循环，使用break跳出循环，结果连外层for一起跳出了
    // *所以使用while，没有用过continue，感觉不行
    while (max[i] >= min[j] && j < min.length) {
      newArr.push(min[j]);
      j += 1;
    }
    newArr.push(max[i]);
  }
  // *上面进行完成后newArr就是正序的数组了。这里获得中间的索引，注意这里要-1，因为是索引
  let mid = newArr.length / 2 - 1;
  // 如果索引是整数说明有偶数个
  if (Math.ceil(mid) === mid) {
    return (newArr[mid] + newArr[mid + 1]) / 2;
  }
  // 否则就是奇数个
  return newArr[Math.ceil(mid)];
};

// console.log(findMedianSortedArrays([2], []))


// *这里使用了指针的方法，这种方法还比较巧妙嗷。
// *大致思路就是不合并数组，然后使用两个指针分别指向数组的第一个数，然后较小的指针都向后移动，直到指向对应的索引，因为数组都给了, 所以中位数的索引也可以确定。这种方法的时间复杂度为O(m+n) 空间复杂度为O(1); 虽然思路说着很简单，但是实现起来一点都不简单，
// !我这里的思路不好，建议看下面哪个，这里应该根据中位数的规律来规定循环的次数更好一些。
function findMedianSortedArraysPointer(nums1: number[], nums2: number[]): number {
  // nums1的指针
  let nums1Index = -1;
  // nums2的指针
  let nums2Index = -1;
  // !记录上一个修改的index，这个比较重要，因为这种方法就是需要知道上一个改变的index是哪个，然后对应的元素就是结果
  let changeIndex = '';
  // 计算中位数的索引值，奇偶有不同的做法
  let mid = (nums1.length + nums2.length) / 2 - 1;
  let next: number | undefined = undefined;
  let res: number;
  if (Math.ceil(mid) === mid) {
    next = Math.ceil(mid) + 1;
  }
  mid = Math.ceil(mid);
  // *这个i，很挺重要的，可以看作合并完成后的大数组的索引值，比如[1,2],[3,4]，那么这个i就相当于在遍历[1,2,3,4]
  // *所以只需要判断这个i与mid的关系的就可以了。
  let i = 0;
  // 因为不确定会循环多少次，所以使用while循环
  while (i < nums1.length + nums2.length) {
    // *先更新指针的移动，更新完成后，指针指向的位置就是当前的i的位置， 比如[1,2],[2,3] 第一次完成后，所以如果i与mid匹配
    // *那么直接获得改变后的指针就可以了。但是一次只能修改一个指针，不清楚修改了哪个指针，所以我使用了changeIndex存储
    // *注意这里的判断，如果一个数组到头，那么就只增加另一个索引值
    if (nums1Index + 1 < nums1.length && nums2Index + 1 < nums2.length) {
      if (nums1[nums1Index + 1] < nums2[nums2Index + 1]) {
        nums1Index += 1;
        changeIndex = 'nums1Index';
      } else {
        nums2Index += 1;
        changeIndex = 'nums2Index';
      }
    } else if (nums1Index + 1 < nums1.length) {
      nums1Index += 1;
      changeIndex = 'nums1Index';
    } else {
      nums2Index += 1;
      changeIndex = 'nums2Index';
    }

    // *这里的判断也很烦，要分清楚next在的情况和next不在的情况
    if (next) {
      // next在的时候又要注意当前i等于mid还是next
      if (i === mid) {
        if (changeIndex === 'nums1Index') res = nums1[nums1Index];
        else if (changeIndex === 'nums2Index') res = nums2[nums2Index];
      } else if (i === next) {
        if (changeIndex === 'nums1Index') { // @ts-ignore
          // 存在next所以是偶数个，所以需要前后两个数相加/2
          res = (res + nums1[nums1Index]) / 2;
        } else if (changeIndex === 'nums2Index') { // @ts-ignore
          res = (res + nums2[nums2Index]) / 2;
        }
        break;
      }
    } else if (i === mid) {
      if (changeIndex === 'nums1Index') res = nums1[nums1Index];
      else if (changeIndex === 'nums2Index') res = nums2[nums2Index];
      break;
    }
    i += 1;
  }
  // 直接返回res结果
  // @ts-ignore
  return res;
}

// console.log(findMedianSortedArraysPointer([1, 2], [3, 4]))

// 这个函数是上个函数的优化
// !优化思路：计算出循环所需的次数，然后达到次数就结束循环，使用变量存储对应的值，最终结果就是这个值，或者是两个值/2
// !代码简单了太多
function findMedianSortedArraysPointerOptimization(nums1: number[], nums2: number[]): number {
  let n = nums1.length + nums2.length

  // *直接让指针指向第一个元素，感觉这里无所谓，初始化为-1应该也可以，因为重点是下面的两个变量
  let point1 = 0;
  let point2 = 0;

  // *这两个变量是重点，为什么是prevValue（上一个值）而不是nextValue呢，第一个是对prevValue赋值方便，第二个原因：具体取决于如何去循环看下面的循环。
  let prevValue = -1;
  let currValue = -1;

  // !这才是求中位数的正解，应该使用floor，比如数组长度为5，那么floor得到2刚好是对应的索引值，如果为6，那么得到3，
  // !是上一个元素与当前元素之和/2（这里解释了为什么上面的变量是prevValue），我上面就不该使用ceil更麻烦了还要-1
  for (let i = 0; i <= Math.floor(n/2); i++) {
    // 对上一个赋值，可以理解
    prevValue = currValue;
    // *这里还是很巧妙的，这里没有嵌套if进行判断，而是列举出所有的让point1++的情况，写法更简洁
    if (point1 < nums1.length && (point2 >=nums2.length || nums1[point1] < nums2[point2])) {
      // *注意在在point1++之前对currValue赋值，因为当前的i为多少，就要得到当前的currValue
      currValue = nums1[point1];
      point1++;
      console.log('cur')
    } else {
      console.log('pre')
      currValue = nums2[point2];
      point2++;
    }
    console.log(prevValue,currValue);
  }


  return n % 2 === 0
    ? (prevValue + currValue) / 2
    : currValue
}

console.log(findMedianSortedArraysPointerOptimization([0,0],[0,0]))

// TODO 还有一种时间复杂度只有O(log(m+n))的算法，需要用到二分查找，我现在还没有好好学过二分查找，就先不做了，学过之后再说~
