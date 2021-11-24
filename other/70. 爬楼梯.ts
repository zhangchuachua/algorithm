// !这是一个动态规划问题

// *这算是最简单的动态规划问题了，而且从本质上来说，它就是一个斐波那契数列。  动态规划问题，也是把大问题给分解成小问题，但是与分而治之的不同之处在于，分而治之的各个问题之间是可以互相独立的不依赖的。但是动态规划问题，问题之间是互相依赖的，我们可以通过这种依赖来优化我们的算法。！

// !动态规划问题大致分为三步骤： 这是我在掘金上看到的一篇文章，并不是按书来的，所以可能一定出入 https://juejin.cn/post/6844903993429196813
// !1. 定义数组元素的含义，很多时候动态规划问题，都依赖于小问题的结果，我们可以使用数组来存储结果，在再次碰到的时候不需要重新计算直接获得结果。
// !2. 找出大问题与小问题之间的联系，相当于数组元素之间的关系式。也一步是最重要的，也是最困难的。
// !3. 找出初始条件，尝试写代码

// !尝试解决这道题：第一步：定义数组的含义：这道题要求有n个台阶时，一次只能上一个台阶或者两个台阶，一共有多少种方式到达n阶。那么这里的数组就可以定义为：当前索引就是台阶数量，索引对应的值就是多少种方式： 比如说索引为0时，就只有0种方式；索引为1时，表示有1个台阶，那我们只有一种方式登上台阶； 索引为2时，我们有 1 + 1 和 2 两种方式登上台阶。

// !第二步：找出联系，我们要想登上n阶台阶，那么我们就可以在 n-1 的台阶处走一个台阶到达n阶。或者可以在 n-2 台阶处，走2个台阶到达n阶。也就是 f(n) = f(n-1) + f(n-2)
// !之前一直看得懂上面的推导，但是就是不懂这个式子是怎么的出来的。其实很好理解：  我们需要找出到达n阶的所有方式，是所有方式，而到达n阶的方式有 n-1+1 和 n-2+2 注意这里的和，因为是所有的方式，所以这里的 f(n-1) 应该是 加上 f(n-2) 。
// !第二个问题：那么为什么不是 n-3 或者 n-4 呢，因为 n-3 再向上走一个台阶时就变成了 n-2, 但是我们式子已经有 n-2 了；如果向上 +2 就变成了 n-1 式子中也有 n-1 了， 所以 n-3, n-4 已经北包含在式子中了。 当然如果允许一步走三个台阶，那么就可以使用 n-3；再注意: 因为上面的 n-1 , n-2 完全是两个不一样的式子，所以可以相加！。
// !再再注意：这里的 f(n-1) f(n-2) 其实指的是到达 n-1, n-2 的所有方式，比如 f(n) = 所有到 n-1 台阶的方式再 +1 台阶，f(n-2)也是同理
// *时间复杂度为 o(n) 空间复杂度为 O(n)
export function climbStairs(n: number): number {
  // *使用memory存储对应的台阶数的值。 在求n个台阶时会用到。 注意：这里直接从初始值定义到了索引为2，因为 f(n) = f(n-1) + f(n-2) 对2来说并不适用，可以算一下。用式子来表示就是 f(n) = n (n<=1); f(n) = 2 (n=2); f(n) = f(n-1) + f(n-2);
  const memory = [0, 1, 2];
  // *因为上面哪个式子，所以索引直接从3开始。
  for (let i = 3; i <= n; i++) {
    memory.push(memory[i - 1] + memory[i - 2]);
  }
  return memory[n];
}

// console.log(climbStairs(5));

// *这里对动态规划进行一些优化。 主要优化空间复杂度: 因为我们只是用到了n的前两个子问题的值，所以我们只需要每次存储前两个子问题的值就可以了。 时间复杂度为 O(n) 空间复杂度为 o(1);
export function climbStairsOptimizationSpace(n: number): number {
  if (n === 1) return 1;
  let first = 1;// *声明两个变量。作为初始值
  let second = 2;// *声明两个变量。作为初始值
  for (let i = 3; i <= n; i++) {// *循环依旧从3开始，
    const tmp = second;
    second = first + second;// *循环过程中，把second变成 n
    first = tmp;// *first变成 n-1 ，如果循环结束，那么second就是n，如果没有结束那么在下一次循环中 second 就是 n-1 first 就是 n-2
  }
  return second;
}

// console.log(climbStairsOptimizationSpace(10));

// *也可以使用递归的方式实现, 但是这样直接使用递归的方式就不是动态规划了，因为没有存储小问题的值。 所以时间复杂度很高。 时间复杂度为 O(2^n) 假设n为5就可以分解为: 5->4,3;4->3,2;3->2,1…… 可以画一个树形图看一下。
export function climbStairsRecursive(n: number): number {
  if (n <= 1) return n;
  if (n === 2) return 2;
  return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}

// *其实就是在函数内部定义一个函数，使用递归向数组里面填充值而已。
// *但是对于递归的理解还是不深，经过提示写代码依然写的比较艰难，能看懂，但是写着很困难。
export function climbStairsRecursiveOptimization(n: number): number {
  const memory: number[] = [0, 1, 2];
  return climbStairsMemo(n, memory);

  function climbStairsMemo(n: number, memo: number[]): number {
    if (memo[n] > 0) return memo[n];// 如果memo[n]存在就返回
    else memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo); // *如果不存在就对该值进行赋值
    return memo[n];
  }
}

// console.log(climbStairsRecursiveOptimization(5));

// !根据leetcode上的官方题解：还有矩阵求解，通项公式求解（因为爬楼梯本质就是斐波那契数列，所以可以通过斐波那契数列的通项公式求解）因为需要的数学基础，所以并没有看~~~。以后再说把
