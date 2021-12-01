// 源于 https://juejin.cn/post/7007031572238958629#heading-11
// 目的是 弄懂 async-await 的原理
function generatorToAsync(generatorFn: (fn: any) => Generator<any, any, string>) {
  return function () {
    // @ts-ignore
    const gen: Generator<any, any, string> = generatorFn.apply(this, arguments); // gen有可能传参

    // 返回一个Promise
    return new Promise((resolve, reject) => {

      function go(key: string, arg?: number): any {
        let res;
        try {
          // @ts-ignore
          res = gen[key](arg); // *这里有可能会执行返回reject状态的Promise 这里就是 gen.next()
        } catch (error) {
          return reject(error); // 报错的话会走catch，直接reject
        }

        // 解构获得value和done
        // *注意，这里的value可能是执行 fn() 得到的返回值，也就是一个 promise. 也可能是 generator 函数执行完成后的返回值，是一个 number
        const { value, done } = res;
        if (done) {
          // 如果done为true，说明走完了，进行resolve(value)
          return resolve(value);
        } else {
          // 如果done为false，说明没走完，还得继续走


          // value有可能是：常量，Promise，Promise有可能是成功或者失败
          // *在正常情况下，value其实都是一个 promise ，可以直接 .then 但是这里还是使用了 Promise.resolve 包装，应该是以防万一， Promise.resolve 主要作用就是将一个变量包装为promise，如果本身就是promise，那么不会做改变。
          // *这里我觉得，因为是返回后，这一步的go函数就执行完毕了，然后 then 应该是压入了微队列，并没有在当前go函数中再次调用go函数，也就不是递归。
          return Promise.resolve(value).then(val => go('next', val), err => go('throw', err));
        }
      }

      go("next"); // *首先执行这里的代码  因为 generator 函数第一次next不需要传入参数，或者说传入参数也没用，第一次，到第一个 yield 被中断，但是 yield 才会接收参数。
    });
  };
}

const fn: (num: number) => Promise<number> = (num: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * 2);
    },1000);
  });
};

function* gen(): Generator<Promise<number>> {
  const num1 = yield fn(1);
  console.log(num1); // 2
  const num2 = yield fn(num1 as number);
  console.log(num2); // 4
  const num3 = yield fn(num2 as number);
  console.log(num3); // 8
  return num3;
}

const genToAsync = generatorToAsync(gen);
const asyncRes = genToAsync();// *这一步，执行返回的函数，函数返回promise
console.log(asyncRes); //* 因为这是同步代码，所以这里打印promise  然后进入 微队列 执行promise中的异步代码。
// asyncRes.then(res => console.log(res)); // 8

export {};
