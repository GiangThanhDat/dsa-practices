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
  //
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
