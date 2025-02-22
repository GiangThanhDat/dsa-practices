/*
 * 129. Sum root to leaf numbers
 *
 * You are given the root of a binary tree containing digits from 0 to 9 only
 * each root-to-leaf path in the tree represents a number.
 * - For example, the root-to-leaf path 1->2->3 represents the number 123.
 *
 * Return the total sum of all root-to-leaf numbers. Test cases are generated so
 * that the answer will fit in a 32-bit integer.
 *
 * A left node is a node with no children
 * */

import TreeNode from "../classes/tree-node.js";

function sumNumbers(root) {
  function f(node, sum = 1) {
    if (node.left === null && node.right === null) return sum;
    let left = 0,
      right = 0;
    if (node.left) left = f(node.left, sum * 10 + node.left.val);
    if (node.right) right = f(node.right, sum * 10 + node.right.val);

    return left + right;
  }

  return f(root, root.val);
}

const testcases = [
  new TreeNode(
    4,
    new TreeNode(9, new TreeNode(5), new TreeNode(1)),
    new TreeNode(0),
  ),
];

for (const testcase of testcases) {
  console.log("testcase:", testcase);
  const sum = sumNumbers(testcase);
  console.log("sum:", sum);
}
