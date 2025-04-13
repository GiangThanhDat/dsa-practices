/*
 * 399. Evaluate division
 * You are given an array of variable paris equations and an array of real numbers value,
 * where quations[i] = [Ai, Bi] and values[i] represent the requation Ai/Bi = values[i].
 * Each Ai or Bi is a string that represents a single variable.
 *
 * You are also given some queries, where queries[j] = [Ci,Di] represents the jth query here you must find the
 * answer for Cj/Dj=?.
 *
 * Return the answers to all queries. if a single answer cannot be determined. return -1.
 *
 * Note: The input is always valid, you may assume that evaluating the queries wil not result
 * in divisionby zero and that there is no contradiction.
 *
 * Note: The variables that do not occur in the list of equtions are undefined, so the answer cannot be determined for them.
 *
 */

function calcEquation(equations, values, queries) {
  const valueGrahp = new Map();
  const graph = new Map();

  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a).push(b);
    graph.get(b).push(a);
    valueGrahp.set(`${a},${b}`, values[i]);
    valueGrahp.set(`${b},${a}`, 1 / values[i]);
  }

  function bfs(from, to) {
    if (!graph.has(from) || !graph.has(to)) {
      return -1;
    }

    const queue = [[from, 1.0]];
    const visited = new Set();
    while (queue.length > 0) {
      const [node, value] = queue.shift();
      if (node === to) return value;
      visited.add(node);
      for (const neighbor of graph.get(node)) {
        if (!visited.has(neighbor)) {
          const edgeValue = valueGrahp.get(`${node},${neighbor}`);
          queue.push([neighbor, value * edgeValue]);
        }
      }
    }
    return -1;
  }

  const result = [];
  for (const [a, b] of queries) {
    result.push(bfs(a, b));
  }

  return result;
}

const testcases = [
  {
    equations: [
      ["a", "b"],
      ["b", "c"],
    ],
    values: [2.0, 3.0],
    queries: [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"],
    ],
  },
  {
    equations: [
      ["a", "b"],
      ["b", "c"],
      ["bc", "cd"],
    ],
    values: [1.5, 2.5, 5.0],
    queries: [
      ["a", "c"],
      ["c", "b"],
      ["bc", "cd"],
      ["cd", "bc"],
    ],
  },
  {
    equations: [["a", "b"]],
    values: [0.5],
    queries: [
      ["a", "b"],
      ["b", "a"],
      ["a", "c"],
      ["x", "y"],
    ],
  },
  {
    equations: [
      ["a", "e"],
      ["b", "e"],
    ],
    values: [4, 3],
    queries: [["a", "b"]],
  },
];

for (const testcase of testcases) {
  console.log("testcases:", testcase);
  const { equations, values, queries } = testcase;
  const output = calcEquation(equations, values, queries);
  console.log("Output: ", output);
}
