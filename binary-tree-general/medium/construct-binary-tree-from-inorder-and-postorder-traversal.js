import TreeNode from "../classes/tree-node.js";
import { traversalPreorder } from "../utils.js";

/*
 * Give two integer arrays inorder and postorder where inorder
 * is the inorder traversal of a binary tree and postorder is
 * the posorder trversal of the same tree, construct and return
 * the binary tree.
 * Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * Output: [3,9,20, null, null, 15,17]
 * */

function buildTree(inorder, postorder) {
  return null;
}

const testcases = [
  [
    [9, 3, 15, 20, 7],
    [9, 15, 7, 20, 3],
  ],
  [
    [9, 3, 15, 20, 7],
    [9, 15, 7, 20, 3],
  ],
  [
    [1, 2, 3, 5, 6, 8, 9],
    [1, 3, 2, 6, 9, 8, 5],
  ],
  [
    [2, 5, 7, 10, 15, 20],
    [2, 7, 5, 20, 15, 10],
  ],
  [
    [1, 2, 3],
    [3, 2, 1],
  ],
  [[-1], [-1]],
];

for (const testcase of testcases) {
  const [inorder, postorder] = testcase;
  console.log("inorder:", inorder, "postorder:", postorder);
  const tree = buildTree(inorder, inorder);
  traversalPreorder(tree);
}
