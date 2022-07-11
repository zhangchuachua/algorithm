## 前端也要会的排序算法！一网打尽所有常用排序算法

数据结构可视化的网站：[https://visualgo.net/zh/](https://visualgo.net/zh/)

话不多说，进入正题

首先来几个比较简单的排序算法

### 冒泡排序

相信很多人遇到的第一种排序算法就是这个了吧。

普通版本：

```ts
export function bubbleSort(nums: number[]) {
  // *记录 length 避免每次 for 循环都去读取 nums.length
  const len = nums.length;
  // *外层循环，每循环一次都会保证让当前最大（最小）的值排序完成。
  // *当 n - 1 个元素完成排序时，那么剩余的最后一个元素也已经排序完成了。所以这里 i < len - 1 代表只需要排序 len - 1 个元素。
  for (let i = 0; i < len - 1; i++) {
    // *内层循环，冒泡排序的核心，相邻两个元素之间进行比较，满足条件则进行交换。
    // *与外层循环相同的 只需要排序 n - 1 个元素，所以 len - 1。 然后又因为不用再次排序已经排序好的元素，所以 j < len - 1 - i;
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {// 这里是升序 降序的话使用 <
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
}
```

动图演示：

![bubbleSort](../md_img/sort/bubbleSort.gif);

优化版本：

使用普通版本的冒泡排序很可能通过不了力扣的测试。所以需要对上面的代码进行一些优化。

从上面的动图可以看出来，在循环还没有完成时，已经排序好了，那么我们只需要在排序完成后提前结束循环就可以了。

```ts
export function bubbleSort(nums: number[]) {
  const len = nums.length;
  if (len <= 1) return nums;// 当 len <= 1 时，不需要排序
  // *用于记录当前是否进行了交换，如果没有进行交换，那么说明当前已经排序完成。
  let isSwap;
  for (let i = 0; i < len - 1; i++) {
    isSwap = false;
    for (let j = i; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        // *进行了交换，就让 isSwap = true
        isSwap = true;
      }
    }
    // *如果没有进行交换，那么说明已经排序完成， break。
    if (!isSwap) break;
  }
  return nums;
}
```

### 选择排序

