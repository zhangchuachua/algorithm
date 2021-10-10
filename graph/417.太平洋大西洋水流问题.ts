function pacificAtlantic(heights: number[][]): number[][] {

  const set = new Set<string>();

  function dfs([f, s]: [number, number]) {
    const current = heights[f][s];
    console.log(current);
    const prevRow = heights[f - 1][s];
    const nextRow = heights[f + 1][s];
    const prevCol = heights[f][s - 1];
    const nextCol = heights[f][s + 1];
    if (prevRow && prevRow <= current && !set.has(`${f - 1},${s}`)) {

    }
  }

  for (let i = 0; i < heights.length; i++) {

  }

};
