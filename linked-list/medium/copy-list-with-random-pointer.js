/**
 * 138. Copy List with Random Pointer
 * A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.
 * Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.
 * For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.
 * Return the head of the copied linked list.
 * The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:
 * val: an integer representing Node.val
 * random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
 * Your code will only be given the head of the original linked list.
 *
 * Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 * Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
 *
 * Input: head = [[1,1],[2,1]]
 * Output: [[1,1],[2,1]]
 *
 * Input: head = [[3,null],[3,0],[3,null]]
 * Output: [[3,null],[3,0],[3,null]]
 */

class _Node {
  constructor(val, next, random) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

function copyRandomList(head) {
  const map = new Map();
  const random = new Map();
  const result = new _Node(head.val);

  map.set(0, result);

  let count = 0;

  for (let p = head.next; p != null; p = p.next, count++) {
    const node = new _Node(p.val);
    map.set(count, node);
    random.set(count, p.random?.val);
  }

  let r = result;
  for (let i = 0; i < count; i++) {
    r.next = map.get(i);
    r.random = map.get(random.get(i));
    r = r.next;
  }

  console.dir(result, { depth: null });

  return result;
}

function print(head) {
  let result = "";
  while (head) {
    result += head.val;
    head = head.next;
  }
  console.log(result);
}

// var node7 = new _Node(7, node13, null);
// var node13 = new _Node(13, node11, node7);
// var node11 = new _Node(11, node10, node1);
// var node10 = new _Node(10, node1, node11);
// var node1 = new _Node(1, node7);
//
// const testcases = [node7];
//
// for (let testcase of testcases) {
//   console.log(testcase);
// }
