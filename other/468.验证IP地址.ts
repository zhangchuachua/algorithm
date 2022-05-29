// *leetcode-468 验证IP地址 https://leetcode.cn/problems/validate-ip-address/

// *这道题感觉没啥难度啊
export function validIPAddress(queryIP: string): string {
  // *划分为数组
  const res = queryIP.includes('.') ? queryIP.split('.') : queryIP.split(':');
  // 使用 ipv4 的判断
  if (res.length === 4) {
    for (let i of queryIP.split('.')) {
      // *Number('') = 0 所以这里首先去掉空字符串的影响
      if (!i) return 'Neither';
      // *因为 parseInt('123a') = 123 所以使用 Number 而不是 parseInt
      const toN = Number(i)
      if (Number.isNaN(toN)) return 'Neither';
      // *判断大小
      if (toN > 255 || toN < 0) return 'Neither';
      // *判断是否有前置0
      if ((toN + '').length !== i.length) return 'Neither';
    }
    return 'IPv4';

  } else if (res.length === 8) {
    for (let i of queryIP.split((':'))) {
      // *使用一个 正则表达式就可以完成
      if (!i.match(/^[\da-fA-F]{1,4}$/)) return 'Neither';
    }
    return 'IPv6'

  }
  return 'Neither';
}

console.log(validIPAddress('1.0.1.'))