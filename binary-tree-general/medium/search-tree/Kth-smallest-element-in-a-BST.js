/*
 * 230.Kth Smallest Element in a BST
 *
 * Given the root of a binary search tree, and an integer k, return the Kth
 * smallest value (1-indexed) of all the values of the nodes in the tree.
 *
 * * */

import TreeNode from "../../classes/tree-node.js";

// giai phap dau tien nghi ra
function kthSmallest(root, k) {
  const inorderTraversal = [];

  function inorder(root) {
    if (!root) return null;
    inorder(root.left);
    inorderTraversal.push(root.val);
    inorder(root.right);
  }

  inorder(root);

  return inorderTraversal[k - 1];
}

// inorder (duyet giua) khu de quy
function inorderTraversalNonRecursive(root) {
  const stack = [];
  let current = root;
  while (stack.length > 0 || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    // console.log("current:", current.val, stack);
    console.log("current:", current.val);
    current = current.right;
  }
}

// postorder (duyet sau, tham nut goc sau cung), khu de quy
function postorderTraversalNonRecursive(root) {
  const stack = [];
  let curr = root;

  while (stack.length || curr) {
    while (curr) {
      stack.push(curr);
      curr = curr.right;
    }
    curr = stack.pop();
    console.log("curr:", curr.val);
    curr = curr.left;
  }
}

// giai phap toi uu, dung khu de quy
function kthSmallest2(root, k) {
  const stack = [];
  let curr = root;

  while (stack.length || curr) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();

    k--;
    if (k === 0) {
      return curr.val;
    }

    curr = curr.right;
  }

  return -1;
}

const testcases = [
  [new TreeNode(3, new TreeNode(1, null, new TreeNode(2)), new TreeNode(4)), 3],
  [
    new TreeNode(
      5,
      new TreeNode(3, new TreeNode(2, new TreeNode(1)), new TreeNode(4)),
      new TreeNode(6),
    ),
    1,
  ],
];

for (const testcase of testcases) {
  // console.log("testcase:", testcase);
  // inorderTraversalNonRecursive(testcase[0]);
  // postorderTraversalNonRecursive(testcase[0]);
  const result = kthSmallest(...testcase);
  const result2 = kthSmallest2(...testcase);
  console.log("resutlg:", result);
  console.log("resutl2 using non recursive:", result2);
}
