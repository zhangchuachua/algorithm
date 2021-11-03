import { createReadStream, createWriteStream } from "fs";
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

const app = new Koa();
const root: TocNode[] = [];
const a = '┣━━';
const b = '┗━━';
let pointer: {
  id: string;
  level: number;
};

const json = createWriteStream('./out.json');

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

  function generatorTree(arr: any[]): any[] {
    return arr.map(item => {
      let child;
      if (map.get(item.id)?.length) child = generatorTree(map.get(item.id) as TocNode[]);
      if (child) {
        return {
          text: item.text,
          children: child
        };
      } else return item.text;
    });
  }

  const result = generatorTree(map.get('') as TocNode[]);

  json.write(JSON.stringify(result));
  json.end(() => {
    console.log('完成');
  });
  ctx.status = 200;
  ctx.body = result;
});

app.listen(3001, () => {
  console.log('3001');
});
export {};
