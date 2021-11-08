import {
  performance,
  PerformanceObserver
} from 'perf_hooks';

export function iPerformance<T extends (...params: any[]) => any>(func: T) {
  const fn = performance.timerify(func);

  const obs = new PerformanceObserver((list) => {
    console.log(list.getEntries()[0]);
    obs.disconnect();
    performance.clearMarks(); // 这个函数好像已经被删除了 这个贴子是17年的
  });
  obs.observe({ entryTypes: ['function'] });

  return fn;
}
