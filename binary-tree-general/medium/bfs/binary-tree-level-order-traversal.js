/*
 * 102. Binary tree level order traversal
 * Given the root of a binary tree, return the level order travesal of its nodes' values, (i.e, from left to right, level by level) Given the root of a binary tree, return the level order travesal of its nodes' values, (i.e, from left to right, level by level).
 * * */

import TreeNode from "../../classes/tree-node.js";

// giai phap dau tien nghi ra
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const nodes = [];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      nodes.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(nodes);
  }

  return result;
}

// giai phap toi uu hon, khong dung shift() => O(1)
function levelOrder2(root) {
  if (!root) return [];

  let queue = [root];
  const result = [];

  while (queue.length) {
    const nodes = [];
    const nextQueue = [];

    for (const node of queue) {
      nodes.push(node.val);
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }

    result.push(nodes);
    queue = nextQueue;
  }

  return result;
}

// giai phap toi uu 3, khong shift, khong next queue, toi uu nhat voi sliding window
function levelOrder3(root) {
  if (!root) return [];

  const queue = [root];
  const result = [];
  let start = 0;

  while (start < queue.length) {
    const end = queue.length;
    const nodes = [];

    for (let i = start; i < end; i++) {
      const node = queue[i];
      nodes.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    start = end;
  }

  return result;
}

const testcases = [
  new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7)),
  ),
  new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(4)),
  ),
  new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4, new TreeNode(5))),
    new TreeNode(3),
  ),
  null,
];

for (const testcase of testcases) {
  // console.log("testcase:", testcase);
  const result = levelOrder(testcase);
  const optResult = levelOrder2(testcase);
  const optResult3 = levelOrder3(testcase);
  console.log("result:", result);
  console.log("optResult:", optResult);
  console.log("optResult3:", optResult3);
}
