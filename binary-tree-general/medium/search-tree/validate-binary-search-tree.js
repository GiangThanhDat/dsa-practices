/*
 * 98. Validate binary search tree
 *
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST)
 * A valid BST is defined as follows
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key.
 * - Both the left and right subtrees must also be binary search trees
 * * */

import TreeNode from "../../classes/tree-node.js";

// giai phap dau tien nghi ra
function isValidBST(root) {
  if (!root) return false;

  let curr = root;
  const [stack, trail] = [[], []];

  while (stack.length || curr) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();

    if (trail[trail.length - 1] >= curr.val) {
      return false;
    }

    trail.push(curr.val);
    curr = curr.right;
  }

  return true;
}

// Giai phap toi uu space hon
function isValidBST2(root) {
  if (!root) return false;

  let curr = root,
    prev = -Infinity;
  const stack = [];

  while (stack.length || curr) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();

    // console.log("prev:", prev, "curr:", curr.val);
    if (prev && prev >= curr.val) {
      return false;
    }

    prev = curr.val;
    curr = curr.right;
  }

  return true;
}

const testcases = [
  new TreeNode(2, new TreeNode(1), new TreeNode() * 3),
  new TreeNode(
    5,
    new TreeNode(1),
    new TreeNode(4, new TreeNode(3), new TreeNode(6)),
  ),
  new TreeNode(3, new TreeNode(1, null, new TreeNode(2)), new TreeNode(4)),
  new TreeNode(
    5,
    new TreeNode(3, new TreeNode(2, new TreeNode(1)), new TreeNode(4)),
    new TreeNode(6),
  ),
  new TreeNode(1, new TreeNode(1)),
];

for (const testcase of testcases) {
  const result = isValidBST(testcase);
  const result2 = isValidBST2(testcase);
  console.log("result:", result);
  console.log("result2:", result2);
}
