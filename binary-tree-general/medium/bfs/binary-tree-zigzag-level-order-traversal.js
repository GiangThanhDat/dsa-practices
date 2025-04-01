/*
 * 103.  Binary tree zigzag level order traversal
 *
 *  Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e, from left to right, then right to left for the next level and alternate between)
 *  */

import TreeNode from "../../classes/tree-node.js";

// giai phap dau tien nghi ra
function zigzagLevelOrder(root) {
  if (!root) return [];

  const [queue, result] = [[root], []];
  let [start, ltr] = [0, true];

  while (start < queue.length) {
    const end = queue.length;
    const nodes = [];

    for (let i = start; i < end; i++) {
      const node = queue[i];
      nodes.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(ltr ? nodes : nodes.reverse());

    ltr = !ltr;
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
  new TreeNode(
    1,
    new TreeNode(2, new TreeNode(3, new TreeNode(4, new TreeNode(5)))),
  ),
  null,
];

for (const testcase of testcases) {
  const result = zigzagLevelOrder(testcase);
  console.log("result:", result);
}
