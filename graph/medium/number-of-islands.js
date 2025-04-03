/*
 * 200. Number of islands
 *
 * Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water)
 * return the number of islands.
 *
 *  An island í surounded by water and is formed by connecting adjacent lands
 *  horizontally or vertically. You may assume all four edges of the grid are
 *  all surrounded by water.
 *
 * Excample 1 :
 * Input : grid = [
 *  ['1', '1', '1', '1', '0']
 *  ['1', '1', '0', '1', '0']
 *  ['1', '1', '0', '0', '0']
 *  ['1', '1', '0', '0', '0']
 * ]
 * Output = 1
 */

function numIslands(grid) {
  const m = grid.length,
    n = grid[0].length;

  const visited = new Array(m).fill(new Array(n).fill(false));

  function isValid(i, j) {
    return (
      !(i < 0 || j < 0 || i > m || i > n) &&
      grid[i][j] === "1" &&
      visited[(i, j)] === false
    );
  }

  function bfs(i, j) {
    const queue = [[i, j]];
    let start = 0;
    while (queue.length) {
      const size = queue.length;
      for (let left = start; left < size; left++) {
        const [i, j] = queue[left];
        if (!visited[(i, j)]) {
          visited[(i, j)] = true;
        }
        if (isValid(i - 1, j - 1)) {
          queue.push([i - 1, j - 1]);
        }
        if (isValid(i - 1, j)) {
          queue.push([i - 1, j]);
        }
        if (isValid(i - 1, j + 1)) {
          queue.push([i - 1, j + 1]);
        }
        if (isValid(i, j - 1)) {
          queue.push([i, j - 1]);
        }
        if (isValid(i, j + 1)) {
          queue.push([i, j + 1]);
        }
        if (isValid(i + 1, j - 1)) {
          queue.push([i + 1, j - 1]);
        }
        if (isValid(i + 1, j)) {
          queue.push([i + 1, j]);
        }
        if (isValid(i + 1, j + 1)) {
          queue.push([i + 1, j + 1]);
        }
      }
      start = end;
    }
  }

  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1" && visited[i][j] === false) {
        bfs(i, j);
        console.log(`visited at count ${count}: `, visited);
        count++;
      }
    }
  }

  console.log("count:", count);
}

const testcases = [
  [
    ["1", "1", "1", "1", "0"][("1", "1", "0", "1", "0")][
      ("1", "1", "0", "0", "0")
    ][("1", "1", "0", "0", "0")],
  ],
];

for (const testcase of testcases) {
  const result = numIslands(testcase);
  console.log("Result:", result);
}
