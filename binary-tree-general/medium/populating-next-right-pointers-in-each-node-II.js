/* Give a binary tree
 * class _Node {
 *    val: number;
 *    left: _Node | null;
 *    right: _Node | null;
 *    next: _Node | null;
 *
 *    constructor(val?:number, left?: _Node, right?: _Node, _next?:_Node){
 *      this.val = (val===undefined ? 0 : val);
 *      this.left =  (left===undefined ? null : left)
 *      this.right =  (right===undefined ? null : right)
 *      this.next =  (next===undefined ? null : right)
 *    }
 * }
 * */

import { traversalPreorder } from "../utils.js";

class _Node {
  constructor(val, left, right, next) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

function connect(root) {
  const map = new Map();

  function f(node, level = 0) {
    if (node === null) return null;

    if (!map.get(level)) {
      map.set(level, [node]);
    } else {
      map.get(level).push(node);
    }

    f(node.left, level + 1);
    f(node.right, level + 1);
  }
  f(root);

  for (const [, nodes] of map.entries()) {
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
  }

  return root;
}

const testcases = [
  new _Node(
    1,
    new _Node(2, new _Node(4), new _Node(5)),
    new _Node(3, null, new _Node(7)),
  ),
];

function travelsalPreorderWithNextPointer(node) {
  console.log("node:", node);
}

for (const testcase of testcases) {
  travelsalPreorderWithNextPointer(connect(testcase));
}
