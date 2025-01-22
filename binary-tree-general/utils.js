export function traversalPreorder(node) {
  if (node === null) return null;
  console.log(node.val);
  traversalPreorder(node.left);
  traversalPreorder(node.right);
}
