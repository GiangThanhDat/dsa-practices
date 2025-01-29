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
  const inorderMap = new Map();

  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  function createTree(
    leftInorder,
    rightInorder,
    leftPostorder,
    rightPostorder,
  ) {
    if (leftInorder > rightInorder) {
      return null;
    }
    const val = postorder[rightPostorder];
    const inorderIndex = inorderMap.get(val);
    const leftSubtreeSize = inorderIndex - leftInorder;

    return new TreeNode(
      val,
      createTree(
        leftInorder,
        inorderIndex - 1,
        leftPostorder,
        leftPostorder + leftSubtreeSize - 1,
      ),
      createTree(
        inorderIndex + 1,
        rightInorder,
        leftPostorder + leftSubtreeSize,
        rightPostorder - 1,
      ),
    );
  }

  return createTree(0, inorder.length - 1, 0, postorder.length - 1);
}

function buildTreeRightFirst(inorder, postorder) {
  const inorderMap = new Map();

  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let postorderIndex = postorder.length - 1;
  function createTree(left, right) {
    if (left > right) return null;

    const val = postorder[postorderIndex];
    const inorderIndex = inorderMap.get(val);
    postorderIndex--;
    const root = new TreeNode(val);
    root.right = createTree(inorderIndex + 1, right);
    root.left = createTree(left, inorderIndex - 1);
    return root;
  }

  return createTree(0, inorder.length - 1);
}

const testcases = [
  [
    [9, 3, 15, 20, 7],
    [9, 15, 7, 20, 3],
  ],
  [
    [4, 2, 5, 1, 3],
    [4, 5, 2, 3, 1],
  ],
  [
    [2, 5, 7, 10, 15, 20],
    [2, 7, 5, 20, 15, 10],
  ],
  [[-1], [-1]],
];

for (const testcase of testcases) {
  const [inorder, postorder] = testcase;
  console.log("inorder:", inorder, "postorder:", postorder);
  const tree = buildTree(inorder, postorder);
  const tree2 = buildTreeRightFirst(inorder, postorder);
  traversalPreorder(tree);
  traversalPreorder(tree2);
}
