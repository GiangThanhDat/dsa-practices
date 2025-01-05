console.log("Reverse linked list I");

/*
 * Given the head of a singly linked list and two integers left and right where left <= right,
 * reverse the nodes of the list from position left to position right, and return the reversed list.
 *
 * Input: head = [1,2,3,4,5], left = 2, right = 4
 * Output: [1,4,3,2,5]
 *
 * Input: head = [5], left = 1, right = 1
 * Output: [5]
 * */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

// My solution (using map)
const reverseBetween = function (head, left, right) {
  const map = new Map();

  for (let p = head, index = 1; p !== null; p = p.next, index++) {
    map.set(index, p);
  }

  while (left < right) {
    const [leftNode, rightNode] = [map.get(left), map.get(right)];
    let temp = leftNode.val;
    leftNode.val = rightNode.val;
    rightNode.val = temp;
    left++;
    right--;
  }

  return head;
};

// Using stack data structure
const reverseBetweenUsingQueue = function (head, left, right) {
  let prev = null,
    curr = head,
    i = 1;

  while (i < left && curr) {
    i++;
    prev = curr;
    curr = curr.next;
  }

  const stack = [];
  while (i <= right && curr) {
    i++;
    stack.push(curr);
    curr = curr.next;
  }

  const last = curr;
  curr = stack[stack.length - 1];

  while (stack.length > 0) {
    const node = stack.pop();

    if (stack.length === 0) {
      node.next = last;
    }

    if (prev !== null) {
      prev.next = node;
    }

    prev = node;
  }

  return left == 1 ? curr : head;
};
// [list, l, r]
const testcases = [
  [
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
    ),
    2,
    4,
  ],
  [
    new ListNode(
      7,
      new ListNode(
        4,
        new ListNode(
          3,
          new ListNode(2, new ListNode(8, new ListNode(9, new ListNode(6)))),
        ),
      ),
    ),
    2,
    4,
  ],
  [new ListNode(5), 1, 1],
];

function print(head) {
  let out = "";
  while (head) {
    console.log("loop");
    out += head.val;
    head = head.next;
  }
  console.log(out);
}

for (const testcase of testcases) {
  const [list, left, right] = testcase;
  console.log("Input:");
  print(list);
  const output = reverseBetween(list, left, right);
  console.log("list:", list);
  print(output);
  console.log("output stack solution: ");
  const outputStackSolution = reverseBetweenUsingQueue(list, left, right);
  console.dir(outputStackSolution, { depth: null });
  print(outputStackSolution);
}
