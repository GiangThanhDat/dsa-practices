/*
 * 207. Course Schedule
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1
 * you are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you mus take course bi, first if you want to take course ai.
 *
 * - For example, the pair [0, 1], indicates that to take course 0 you have
 *  to first take course 1.
 *
 * Return true if you can finish all courses. Otherwise, return false.
 *
 * Example 1:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output : true
 * Explanantion: There are a total of 2 course to take. To take corse 1 you should have finised course 0. So it is possible.
 *
 * Example 2:
 * Input : numCourses = 2, prerequisites = [[1,0],[0,1]]
 *  Output: false
 *  Explanation: There are a total of 2 courses to take.
 *  To take corse 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 */

function canFinish(numCourses, prerequisites) {
  const graph = new Map();
  const inDegree = new Array(numCourses).fill(0);

  // Build graph and count in-dgrees
  for (const [a, b] of prerequisites) {
    if (!graph.has(b)) graph.set(b, []);
    graph.get(b).push(a);
    inDegree[a]++;
  }

  // Add courses with 0 in-degree to queue
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let visitedCount = 0;

  while (queue.length) {
    const course = queue.shift();
    visitedCount++;

    const neighbors = graph.get(course) || [];
    for (const next of neighbors) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return visitedCount === numCourses;
}

const testcases = [
  [2, [[1, 0]]],
  [
    4,
    [
      [1, 0],
      [2, 1],
      [3, 2],
    ],
  ],
  [
    3,
    [
      [1, 0],
      [2, 1],
      [0, 2],
    ],
  ],
  [
    5,
    [
      [2, 4],
      [0, 3],
      [4, 3],
      [1, 0],
    ],
  ],
  [
    6,
    [
      [6, 0],
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [0, 3],
    ],
  ],
  [
    20,
    [
      [0, 10],
      [3, 18],
      [5, 5],
      [6, 11],
      [11, 14],
      [13, 1],
      [15, 1],
      [17, 4],
    ],
  ],
  [
    7,
    [
      [1, 0],
      [0, 3],
      [0, 2],
      [3, 2],
      [2, 5],
      [4, 5],
      [5, 6],
      [2, 4],
    ],
  ],
];

for (const testcase of testcases) {
  console.log("testcases:", testcase);
  const isCanFinish = canFinish(...testcase);
  console.log("Can finish:", isCanFinish);
}
