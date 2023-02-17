export function quickSort(arr: number[]) {
  return quickSortCore(arr);
}

function quickSortCore(arr: number[], start: number = 0, end: number = arr.length - 1) {
  const n = end - start + 1;
  if (n < 2) return arr;

  let index = start + Math.floor(Math.random() * n);
  let left = start;
  let right = end;
  swap(arr, index, right);

  index = right--;
  const pivot = arr[index];

  while (left < right) {
    while (left < right && arr[left] <= pivot) left++;
    while (left < right && arr[right] >= pivot) right--;
    swap(arr, left, right);
  }

  if (arr[index] < arr[left]) {
    swap(arr, index, left);
    index = left;
  }

  quickSortCore(arr, start, index - 1);
  quickSortCore(arr, index + 1, end);

  return arr;
}

function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

const arr = [9, 7, 5, 11, 12, 2, 14, 3, 10, 6];
const arr1 = [3, 2];
const arr2 = [5, 1, 1, 2, 0, 0];

console.log(quickSort(arr));


// console.log(arr)
