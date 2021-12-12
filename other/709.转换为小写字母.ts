// *很简单，就是使用 ASCII 代码转换就可以了， A-Z 的 ASCII 码为 65~90 , a-z 的 ASCII 码为 97 ~ 122 所以需要将大写字母的ASCII码加 32 就可以了.
export function toLowerCase(s: string): string {
  let str = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i); // !charCodeAt 是 String 的原型方法,可以将一个字符转换为对应的 ASCII 码,参数是对应字符的索引值.
    if (code >= 65 && code <= 90) {
      str += String.fromCharCode(code + 32); // *fromCharCode 接收一个 ASCII 码,将 ASCII 码转换为字符.
    } else str += s[i];
  }
  return str;
}

// *数组方式, 看上去好像空间复杂度更低一些,但是实际运行上差不多.
export function toLowerCaseArray(s: string): string {
  s = s
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(code + 32);
      return char;
    })
    .join("");
  return s;
}

console.log(toLowerCase("Hello"));
