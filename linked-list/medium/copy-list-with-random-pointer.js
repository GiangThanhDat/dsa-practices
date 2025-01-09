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

// My solution
function copyRandomList(head) {
  const randomNodesMap = new Map();
  const copyHead = new _Node();

  let p = head,
    c = copyHead;

  while (p !== null) {
    c.next = new _Node(p.val);
    randomNodesMap.set(p, c.next);
    p = p.next;
    c = c.next;
  }

  p = head;
  c = copyHead.next;

  while (p !== null) {
    if (p.random) {
      c.random = randomNodesMap.get(p.random);
    }
    p = p.next;
    c = c.next;
  }

  return copyHead.next;
}

// only one while loop solution
function copyRandomList(head) {
  const map = new Map();
  const copyHead = new _Node();

  let p = head,
    c = copyHead;

  while (p !== null) {
    let copy;

    if (map.has(p)) {
      copy = map.get(p);
    } else {
      copy = new _Node(p.val);
      map.set(p, copy);
    }

    if (p.random) {
      let random;
      if (map.has(p.random)) {
        random = map.get(p.random);
      } else {
        random = new _Node(p.random.val);
        map.set(p.random, random);
      }
      copy.random = random;
    }

    c.next = copy;
    c = c.next;
    p = p.next;
  }

  return copyHead.next;
}

// solution with more concise
function copyRandomList(head) {
  const map = new Map([[null, null]]);

  let curr = head;

  while (curr) {
    if (!map.has(curr)) map.set(curr, new _Node());
    if (!map.has(curr.next)) map.set(curr.next, new _Node());
    if (!map.has(curr.random)) map.set(curr.random, new _Node());

    map.get(curr).val = curr.val;
    map.get(curr).next = map.get(curr.next);
    map.get(curr).random = map.get(curr.random);

    curr = curr.next;
  }
  return map.get(head);
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
