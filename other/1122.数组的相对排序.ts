// *145周赛-第一题 1122.数组的相对排序 easy

export function relativeSortArray(arr1: number[], arr2: number[]): number[] {
    arr1.sort((a, b) => a - b);
    const res = new Map<number, number[]>();
    arr1.forEach(item => {
        if (!res.has(item)) res.set(item, [item]);
        else (res.get(item) as number[]).push(item);
    })
    const result: number[] = [];
    for (const i of arr2) {
        result.push(...(res.get(i) as number[]));
        res.delete(i)
    }
    for (const i of res.values()) {
        result.push(...i);
    }

    return result;
}

[5,3,1,2,4].sort((a, b) => {
    console.log(`a: ${a}, b: ${b}`);
    return a - b;
})