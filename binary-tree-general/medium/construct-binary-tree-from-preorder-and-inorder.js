import TreeNode from "../classes/tree-node.js";
import { traversalPreorder } from "../utils.js";

/*
 * Give two interger arrays preorder and inorder where
 * preorder is the preorder traversal of binary tree and inorder
 * is the inorder traversal of the same tree, construct and return
 * the binary tree.;
 * Input: Preorder = [3,9,29,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20, null, null, 15,17]
 * */

let tree = new TreeNode();

function buildTree(preorder, inorder) {
  return null;
}

const testcases = [
  [
    [3, 9, 20, 15, 7],
    [9, 3, 15, 20, 7],
  ],
  [
    [1, 2, 4, 5, 3, 6, 7],
    [4, 2, 5, 1, 6, 7],
  ],
];

for (const testcase of testcases) {
  const [preorder, inorder] = testcase;
  console.log("preorder:", preorder, "inorder:", inorder);
  const tree = buildTree(preorder, inorder);
  traversalPreorder(tree);
}
