/**
 * Flatten binary tree to linked list
 * given the root of a binary tree, flatten the tree into a "linked list"
 * - The Linked list should use the same TreeNode class where the right child
 *   pointer points to the next node in the list and the left child pointer
 *   is alway null;
 *   The linked list should be in the same orde as a pre-order traversal of the
 *   the binary tree.
 *
 *   Input: root = [1,2,5,3,4,null,6],
 *   Output = [1,null,2,null,3,null,4, null,5,null,6]
 */

import TreeNode from "../classes/tree-node.js";
import { traversalPreorder } from "../utils.js";

/**
 * Do not return anything, modify root in-place instaed.
 * */

// morris traversal
function flatten(root) {
  let curr = root;
  while (curr) {
    if (curr.left) {
      let mostRightNode = curr.left;
      while (mostRightNode.right) {
        mostRightNode = mostRightNode.right;
      }
      mostRightNode.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }
    curr = curr.right;
  }
}

// stack
function flattenWithStack(root) {
  if (!root) return;
  const stack = [root];
  if (stack.length) {
    const node = stack.pop();
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
    if (stack.length) {
      node.right = stack[stack.length - 1];
    }
    node.left = null;
  }
}

const testcases = [
  new TreeNode(
    1,
    new TreeNode(2, new TreeNode(3), new TreeNode(4)),
    new TreeNode(5, null, new TreeNode(6)),
  ),
];

for (const testcase of testcases) {
  traversalPreorder(testcase);
  flatten(testcase);
  flattenWithStack(testcase);
  traversalPreorder(testcase);
}
