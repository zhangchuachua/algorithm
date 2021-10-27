// *随机生成数组
export default function randomArr(length: number): number[] {
// *生成指定长度的随机数字数组。
  return Array.from({ length: length }, () => {
    let res = Math.round(Math.random() * length);
    if (Math.round(Math.random())) return res;
    else return ~res + 1;
  });
}
