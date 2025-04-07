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

function buildGraph(connects) {
  const graph = new Map();

  for (const connect of connects) {
    for (const node of connect) {
      graph.set(node, [
        ...(graph.get(node) || []),
        ...connect.filter((i) => i !== node),
      ]);
    }
  }
  return graph;
}

function canFinish(numCourses, prerequisites) {
  if (numCourses === 0 || !prerequisites) return;
  const graph = buildGraph(prerequisites);
  // console.log("graph:", graph);
  // implement bfs
  const queue = [graph.get(prerequisites[0][0])];
  const visited = new Map();

  let count = 0;
  while (queue.length) {
    const node = queue.shift();
    count++;
    if (!visited.has(node)) {
      visited.set(node, true);
      for (const edge of node) {
        const edgeNode = graph.get(edge);
        if (!visited.has(edgeNode)) {
          queue.push(edgeNode);
        }
      }
    }
  }

  console.log("count:", count, numCourses);
  return count <= numCourses;
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
];

for (const testcase of testcases) {
  console.log("testcases:", testcase);
  const isCanFinish = canFinish(...testcase);
  console.log("Can finish:", isCanFinish);
}
