var largestPalindromic = function (num) {
  const obj = {};
  const len = num.length;
  for (let i = 0; i < len; i++) {
    if (obj[num[i]]) obj[num[i]]++;
    else obj[num[i]] = 1;
  }
  const arr = Object.entries(obj);
  const arrLen = arr.length;
  const resArr = new Array(len);
  let first = 0;
  let last = resArr.length - 1;
  let single = null;

  for (let i = arrLen - 1; i >= 0; i--) {
    let [key, value] = arr[i];
    const shang = value / 2;
    const l = Math.floor(shang);
    if (single === null && l < shang) {
      single = key;
    }
    if (key === '0') {
      if (arrLen - 1 === 0) return '0';
      if (first === 0) break;
    }
    for (let j = 0; j < l; j++) {
      resArr[first] = key;
      first++;
      resArr[last] = key;
      last--;
    }
  }
  if (single !== null) {
    resArr.splice(Math.floor(len / 2), 1, single);
  }

  return resArr.join('');
};

console.log(largestPalindromic("7449447"))