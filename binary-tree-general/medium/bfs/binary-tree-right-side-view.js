/*
 * 199. Binary Tree Right Side View
 *
 * Given the root of a binary tree, imagine yourself standing on the right
 * side of it, return the values of the nodes you can see orderred from top to bottom
 *
 *
 * * */
import TreeNode from "../../classes/tree-node.js";

// giai phap dau tien nghi ra
function rightSideView(root) {
  if (!root) return [];

  const queu = [{ node: root, level: 0 }];
  // const levels = {};
  const levels = new Map();

  while (queu.length) {
    const { node, level } = queu.shift();
    // levels[level] = [...(levels[level] || []), node.val];
    if (levels.has(level)) levels.get(level).push(node.val);
    else levels.set(level, [node.val]);
    if (node.left) {
      queu.push({ node: node.left, level: level + 1 });
    }
    if (node.right) {
      queu.push({ node: node.right, level: level + 1 });
    }
  }

  // return Object.values(levels).map((nodes) => nodes[nodes.length - 1]);
  return Array.from(levels).map(([_, nodes]) => nodes[nodes.length - 1]);
}

// giai phap sau khi toi uu
function rightSideViewOptimize(root) {
  if (!root) return [];

  const queue = [[root, 0]];
  const result = [];

  while (queue.length) {
    const [node, level] = queue.shift();

    // Nếu đây là node đầu tiên của level mới (vì BFS duyệt từ trái sang phải)
    if (result.length === level) {
      result.push(node.val); // Node đầu tiên của level là rightmost
    }
    // Ưu tiên right trước để rightmost node được xử lý trước
    if (node.right) queue.push([node.right, level + 1]);
    if (node.left) queue.push([node.left, level + 1]);
  }

  return result;
}

const testcases = [
  new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(4)),
  ),
  new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4, new TreeNode(5))),
    new TreeNode(3),
  ),
  null,
];

for (const testcase of testcases) {
  // console.log("testcase:", testcase);
  const result = rightSideView(testcase);
  const optResult = rightSideViewOptimize(testcase);
  console.log("result:", result);
  console.log("optResult:", optResult);
}
