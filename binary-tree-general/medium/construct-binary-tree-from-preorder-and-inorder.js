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

function buildTree(preorder, inorder) {
  const inorderMap = new Map();

  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let preorderIndex = 0;
  function createTreeNode(left, right) {
    if (left >= right) return null;

    const val = preorder[preorderIndex++];
    const index = inorderMap.get(val);

    return new TreeNode(
      val,
      createTreeNode(left, index - 1),
      createTreeNode(index + 1, right),
    );
  }

  return createTreeNode(0, inorder.length - 1);
}

const testcases = [
  [
    [3, 9, 20, 15, 7],
    [9, 3, 15, 20, 7],
  ],
  [
    [1, 2, 4, 5, 3, 6, 7],
    [4, 2, 5, 1, 6, 3, 7],
  ],
];

for (const testcase of testcases) {
  const [preorder, inorder] = testcase;
  console.log("preorder:", preorder, "inorder:", inorder);
  const tree = buildTree(preorder, inorder);
  traversalPreorder(tree);
}
