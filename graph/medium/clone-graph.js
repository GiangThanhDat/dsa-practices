/*
 * 133.Clone Graph
 * Given a reference of a node in connected undirecte graph.
 *
 * Return a deep copy (clone) of the graph.
 *
 * Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
 * ```
 *  class Node {
 *    public int val;
 *    public List<Node> neighbors;
 *  }
 * ```
 * Test case format:
 *
 * For simplicity, each node's value is the same as the node's index (1-indexed). For excample, the first node with val == 1,
 * the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
 *
 * An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors
 * of a node in the graph.
 *
 * The given node will always be the first node with val = 1. You must return the copy of the ginven node a a reference to
 * the cloned graph.
 *
 * problem link : https://leetcode.com/problems/clone-graph/?envType=study-plan-v2&envId=top-interview-150
 *
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 * Explanation: There are 4 nodes in the graph.
 *
 * 1st  node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
 * 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
 * 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
 * 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
 *
 * adjList = [[]]
 * Output = [[]]
 * Explanation : Node that the input contains one empty list. The grap consists of only one node with val = 1 and it does not have any neighbors.
 *
 * Excample 3:
 *
 * Input : adjList = []
 * Output: []
 * Explanation : This an empty graph, it does not have any nodes.
 */

class _Node {
  constructor(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

function cloneGraph(node) {
  if (!node) return;

  const queue = [node];
  const clonedNodes = new Map();
  clonedNodes.set(node.val, new _Node(node.val));

  while (queue.length) {
    const node = queue.shift();
    for (const neighbor of node.neighbors) {
      if (!clonedNodes.has(neighbor.val)) {
        queue.push(neighbor);
        clonedNodes.set(neighbor.val, new _Node(neighbor.val));
      }
      clonedNodes.get(node.val).neighbors.push(clonedNodes.get(neighbor.val));
    }
  }

  return clonedNodes.get(node.val);
}

function createGraph(adjList) {
  const nodes = new Map();

  for (let i = 0; i < adjList.length; i++) {
    nodes.set(i + 1, new _Node(i + 1));
  }

  for (let i = 0; i < adjList.length; i++) {
    const node = nodes.get(i + 1);
    for (const neighbors of adjList[i]) {
      node.neighbors.push(nodes.get(neighbors));
    }
  }

  return nodes.get(1);
}

function printGraph(node) {
  if (!node) return;

  const visited = new Map();
  const queue = [node];
  const result = [];

  while (queue.length) {
    const node = queue.shift();
    if (!visited.get(node.val)) {
      const neighbors = [];
      visited.set(node.val, node);

      for (const neighbor of node.neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          neighbors.push(neighbor.val);
        }
      }

      result[node.val - 1] = neighbors;
    }
  }

  const n = visited.size;
  for (let i = 0; i < n; i++) {
    if (!result[i]) result = [];
  }

  return result;
}

const testcases = [
  createGraph([
    [2, 4],
    [1, 3],
    [2, 4],
    [1, 3],
  ]),
  createGraph([[2, 3, 4], [1], [1, 5], [1], [3]]),
  createGraph([[2], [1]]),
  createGraph([[]]),
  createGraph([]),
];

for (const testcase of testcases) {
  const input = printGraph(testcase);
  console.log("input:", input);
  const clonedGraph = cloneGraph(testcase);
  const output = printGraph(clonedGraph);
  console.log("output: ", output);
}
