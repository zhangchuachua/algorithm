// *这个解法 太丑陋拉！！！虽然确实解出来了
export function repeatedStringMatch(a: string, b: string): number {
  if (b.includes(a)) {
    const arr = b.split(a);
    const lastIndex = arr.length - 1;
    if (arr.filter((item) => item !== "").length > 2) return -1;
    if (
      a.slice(a.length - arr[0].length) !== arr[0] ||
      a.slice(0, arr[lastIndex].length) !== arr[lastIndex]
    )
      return -1;
    if (arr[0] === "" && arr[lastIndex] === "") return lastIndex;
    else if (arr[0] !== "" && arr[lastIndex] !== "") return lastIndex + 2;
    else return lastIndex + 1;
  }
  if (a.includes(b)) return 1;
  else if ((a + a).includes(b)) {
    return 2;
  } else return -1;
}

console.log(repeatedStringMatch("aa", "a"));
