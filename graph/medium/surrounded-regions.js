/*
 * 130. Surrounded Regions
 * You are given an m x n  matrix board containing letters 'X' and 'O', capture regions that
 * are sourrounded:
 * - Connect :A cell is connected to adjacent cells horizontally or vertically
 * - Region: To form a region connect every 'O' cell.
 * - Surround: The region is surrounded with 'X' cels if you can connect the region with 'X'
 *   cells and none of the region cells are on the edge of the board.
 *
 * To capture a sorrounded region, replace all '0's with 'X's in-place within the original board. You do not need to return anything
 *
 * Excample 1 :
 * Input : board = [
 *  ['X', 'X', 'X', 'X']
 *  ['X', 'O', 'O', 'X']
 *  ['X', 'X', 'O', 'X']
 * ]
 *  ['X', 'O', 'X', 'X']
 * Output =
 *  ['X', 'X', 'X', 'X']
 *  ['X', 'X', 'X', 'X']
 *  ['X', 'X', 'X', 'X']
 *  ['X', 'O', 'X', 'X']
 */

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

/**
 * Do not return anything, modify board in-place instead.
 */
function solve(board) {
  if (!board) return;

  const [m, n] = [board.length, board[0].length];

  function bfs(row, col) {
    const queue = [[row, col]];
    const marks = [[row, col]];
    board[row][col] = "X";
    let noSurrounded = false;

    while (queue.length) {
      const [i, j] = queue.shift();
      if (i === 0 || j === 0 || i === m - 1 || j === n - 1) {
        noSurrounded = true;
        break;
      }

      for (const [di, dj] of directions) {
        const locate = [di + i, dj + j];
        const [ni, nj] = locate;
        if (0 <= ni && ni < m && 0 <= nj && nj < n && board[ni][nj] === "O") {
          board[ni][nj] = "X";
          queue.push(locate);
          marks.push(locate);
        }
      }
    }

    if (!noSurrounded) return;

    for (const [i, j] of marks) {
      board[i][j] = "O";
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "O") bfs(i, j);
    }
  }
}

const testcases = [
  [
    ["X", "X", "X", "X", "X"],
    ["X", "O", "O", "X", "X"],
    ["X", "X", "O", "X", "X"],
    ["X", "O", "X", "X", "X"],
  ],
  [
    ["O", "O", "O", "X", "X"],
    ["X", "O", "O", "X", "X"],
    ["X", "O", "O", "X", "X"],
    ["X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X"],
    ["X", "O", "O", "X", "X"],
    ["X", "O", "O", "O", "X"],
    ["X", "X", "X", "X", "X"],
  ],
  [
    ["X", "X", "X"],
    ["X", "O", "X"],
    ["X", "X", "X"],
  ],
  [
    ["O", "X", "O", "O", "O", "X"],
    ["O", "O", "X", "X", "X", "O"],
    ["X", "X", "X", "X", "X", "O"],
    ["O", "O", "O", "O", "X", "X"],
    ["X", "X", "O", "O", "X", "O"],
    ["O", "O", "X", "X", "X", "X"],
  ],
];

for (const testcase of testcases) {
  solve(testcase);
  console.log("captured:", testcase);
}
