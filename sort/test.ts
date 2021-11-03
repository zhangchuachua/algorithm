import { createReadStream } from "fs";
import { findLastIndex } from 'lodash';
import readline from 'readline';
import Koa from 'koa';
import { v4 } from 'uuid';


interface TocNode {
  id: string;
  level: number;
  text: string;
  pid: string;
}

interface TocTree extends TocNode {
  children: any[];
}

const app = new Koa();
const root: TocNode[] = [];
const a = '┣━━';
const b = '┗━━';
let pointer: {
  id: string;
  level: number;
};

// !逐行读取文件流 第一种方法
async function name() {
  const txt = createReadStream('./list.txt');
  txt.setEncoding('utf-8');

  const rl = readline.createInterface({
    input: txt, crlfDelay: Infinity
  });
  for await (let line of rl) {
    let index = line.indexOf(a);
    if (index === -1) index = line.indexOf(b);
    if (index === -1) {
      pointer = {
        id: v4(),
        level: 0
      };
      root.push({
        id: pointer.id, pid: "", text: line, level: 0
      });
      continue;
    }
    line = line.slice(index);
    index = index - 6;
    while (index % 5 !== 0) {
      index--;
    }
    const l = index / 5 + 1;
    const parent = root[findLastIndex(root, { level: l - 1 })];
    if (!parent) throw new Error(`parent不存在 l: ${l} line: ${line}`);
    pointer = {
      id: parent.id,
      level: pointer.level
    };
    root.push({
      id: v4(),
      level: l,
      text: line,
      pid: pointer.id
    });
  }
}

app.use(async ctx => {
  await name();
  const map = new Map<string, TocNode[]>();
  root.forEach(item => {
    if (!map.has(item.pid)) map.set(item.pid, [item]);
    else {
      (map.get(item.pid) as TocNode[]).push(item);
    }
  });
  function x(arr: any[]) {
    arr.forEach(item => {
      let child = [];
      if(map.get(item.id)?.length) child = x(map.get(item.id) as any[])
      item.children = child;
    })
    return arr;
  }
  const result = x(map.get('') as TocNode[]);
  // console.dir(result, { depth: null });
  ctx.status = 200;
  ctx.body = JSON.stringify(result);
});

// name().then(() => {
//   console.dir(root, { depth: null });
// });

app.listen(3001, () => {
  console.log('3001');
});
export {};
