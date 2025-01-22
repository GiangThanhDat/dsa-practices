/**
 * Definition for a binary tree node.
 */
class TreeNode {
  // val: number
  // left: TreeNode | null
  // right: TreeNode | null
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export default TreeNode;
