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

// Giai phap Bfs tho so nhat
function numIslands(grid) {
  const m = grid.length,
    n = grid[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));

  function isValid(i, j) {
    return (
      i >= 0 &&
      j >= 0 &&
      i < m &&
      j < n &&
      grid[i][j] === "1" &&
      visited[i][j] === false
    );
  }

  const directions = [
    [-1, 0], // tren
    [1, 0], // duoi
    [0, -1], // trai
    [0, 1], // phai
  ];

  function bfs(row, col) {
    const queue = [[row, col]];
    visited[row][col] = true;
    let start = 0;
    while (start < queue.length) {
      const end = queue.length;
      for (let left = start; left < end; left++) {
        const [i, j] = queue[left];
        // if (isValid(i - 1, j)) {
        //   queue.push([i - 1, j]);
        //   visited[i - 1][j] = true;
        // }
        // if (isValid(i, j - 1)) {
        //   queue.push([i, j - 1]);
        //   visited[i][j - 1] = true;
        // }
        // if (isValid(i, j + 1)) {
        //   queue.push([i, j + 1]);
        //   visited[i][j + 1] = true;
        // }
        // if (isValid(i + 1, j)) {
        //   queue.push([i + 1, j]);
        //   visited[i + 1][j] = true;
        // }
        for (const [di, dj] of directions) {
          const [ni, nj] = [i + di, j + dj];
          if (isValid(ni, nj)) {
            visited[ni][nj] = true;
            queue.push([ni, nj]);
          }
        }
      }
      start = end;
    }
  }

  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1" && visited[i][j] === false) {
        count++;
        bfs(i, j);
      }
    }
  }

  return count;
}

const testcases = [
  [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "1", "1"],
  ],
  [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ],
];

for (const testcase of testcases) {
  const result = numIslands(testcase);
  console.log("Result:", result);
}
