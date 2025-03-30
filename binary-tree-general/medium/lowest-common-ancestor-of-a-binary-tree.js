/*
 * 236.Lowest common ancestor of a binary tree
 *
 * given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree
 *
 * Acording to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q
 * as the lowest node in T that has both p and q as descendants (where we allow a node to be descendant of itself)."
 *
 * */

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;

  return left || right;
}
