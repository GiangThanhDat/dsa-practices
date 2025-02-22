/*
 * 173. Bunary search tree iterator
 * Implement the BSTIterator class that represents an iterator over the
 * in-order traversal of a binary search tree (BST):
 *
 * + BSTIterator(TreeNode root) Initializes an object of the BSTIterator class.
 * The root of the BST is given as part of the constructor. The pointer
 * should be initialized to a non-existent number smaller than any element
 * in the BST
 * + boolean hasNext() Returns true if there exists a number in the
 * traversal to the right of the pointer, otherwise returns false
 *
 * + int next() Moves the pointer to the right, then returns the number
 * at the pointer.
 *
 * Notice that by initializing the poniter to a non-existent smallest number
 * , the first call to next() will return the snallest element in the BST.
 * You may assume that next)_ calls will always be valid. That is, there will be at
 * least a next number in the in-order traversal when next() is called.
 * */

import TreeNode from "../classes/tree-node.js";

class BSTIterator {
  constructor(root) {
    this.list = [];
    this.index = -1;
    const inorder = (node) => {
      if (node === null) return;
      inorder(node.left);
      this.list.push(node.val);
      inorder(node.right);
    };
    inorder(root);
  }

  next() {
    return this.list[++this.index];
  }

  hasNext() {
    const next = this.list[this.index + 1];
    return next !== null && next !== undefined;
  }
}

class BSTIterator2 {
  constructor(root) {
    this.stack = [];
    this.node = this.mostLeft(root);
  }

  mostLeft(node) {
    while (node) {
      this.stack.push(node);
      node = node.left;
    }
  }

  next() {
    const node = this.stack.pop();
    if (node.right) {
      this.mostLeft(node.right);
    }
    return node.val;
  }

  hasNext() {
    return this.stack.length !== 0;
  }
}

const testcases = [
  [
    [
      "BSTIterator",
      "next",
      "next",
      "hasNext",
      "next",
      "hasNext",
      "next",
      "hasNext",
      "next",
      "hasNext",
    ],
    [
      new TreeNode(
        7,
        new TreeNode(3),
        new TreeNode(15, new TreeNode(9), new TreeNode(20)),
      ),
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
  ],
];

for (const testcase of testcases) {
  const [actions, params] = testcase;

  let bstIterator;
  let result = [];
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === "BSTIterator") {
      // bstIterator = new BSTIterator(params[i]);
      bstIterator = new BSTIterator2(params[i]);
      result.push(null);
    } else {
      result.push(bstIterator[actions[i]](params[i]));
    }
  }

  console.log("result:", result);
}
