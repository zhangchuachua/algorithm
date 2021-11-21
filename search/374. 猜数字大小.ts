function guess(n: number) {
  let pick = 1702766719;
  if (pick > n) return 1;
  else if (pick < n) return -1;
  else return 0;
}

// *使用了二分搜索， 虽然时间复杂度只有 O(logn) 空间复杂度只有 O(1) 但是 再力扣上排名很低 去看看力扣里的大佬这么完成的。
export function guessNumber(n: number): number {
  let start = 1;
  let end = n;
  let mid = Math.floor((start + end) / 2); // *注意这里使用位运算很可能会丢失精度，所以对于较大的数，或者较小的数尽量不要使用位运算
  let result = guess(mid);
  while (result !== 0) {
    if (result === 1) start = mid + 1;
    else if (result === -1) end = mid - 1;
    mid = Math.floor((start + end) / 2);
    result = guess(mid);
  }

  return mid;
}

// console.log(guessNumber(2126753390));

// *这是官方的做法，思路都是差不多的，都是使用二分搜索，但是这里将mid放到了循环内部，这样就会少一点内存消耗，但是时间上花费更多。  循环的条件也发生了改变， 因为外部没有声明guess返回的结果。
function guessNumberOfficial(n: number): number {
  let start = 1;
  let end = n;
  while (start < end) {// *使用start < end 的条件进行循环
    let mid = Math.floor((start + end) / 2);
    if (guess(mid) <= 0) end = mid; // *这一步与我上面的不一样，但是其实这里无所谓，反正下一步是else，但是一定咬住以有 guess(mid) === 0 的情况， 因为这里的循环条件是 start < end
    else {
      start = mid + 1;
    }
  }
  return end; // *这里返回start end 都无所谓，因为最终结果是 start === end
}

console.log(guessNumberOfficial(2126753390));

// *这是力扣上的排名很高的，还是二分搜索，但是使用了递归的方法，没有多余的变量，所以内存消耗很少。 而且不知道为什么时间消耗也很少，是因为使用递归吗？   时间复杂度为 o(logn)  空间复杂度为 0(logn) 因为递归产生的函数调用堆栈，再函数调用时会一直存在，所以函数层层嵌套，有多少层空间复杂度就为多少
export function guessNumberLeetcode(n: number): number {
  return check(0, n);

  function check(pre: number, back: number): number {
    let mid = pre + Math.round((back - pre) / 2);
    if (guess(mid) == 0) {
      return mid;
    } else if (guess(mid) == -1) {
      return check(pre, mid);
    } else {
      return check(mid, back);
    }
  }
}
