// *太简单了，没啥价值
export function dayOfYear(date: string): number {
  const year = date.slice(0,4);
  // *这里相当于考察了一下 Date 原型方法的应用。
  return Math.floor((new Date(date).getTime() - Date.UTC(Number(year), 0)) / 1000 / 3600 / 24) + 1;
};
