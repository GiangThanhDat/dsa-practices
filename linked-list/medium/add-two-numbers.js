console.log("Add two numbers");

/**
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0
 * itself.
 *
 * Example 1:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 *
 *
 * Example 2:
 *
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 *
 *
 *
 * Example 3:
 * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * Output: [8,9,9,9,0,0,0,1]
 *
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 *
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const addTwoNumbers = function (l1, l2) {
  const result = new ListNode(0);

  let p1 = l1,
    p2 = l2,
    r = result;

  while (p1 !== null && p2 !== null) {
    const val = p1.val + p2.val + r.val;
    const mem = Math.floor(val / 10);
    r.val = val % 10;
    if (p1.next || p2.next || mem !== 0) {
      r.next = new ListNode(mem);
      r = r.next;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  while (p1 !== null) {
    const val = p1.val + r.val;
    const mem = Math.floor(val / 10);
    r.val = val % 10;
    if (p1.next || mem !== 0) {
      r.next = new ListNode(mem);
      r = r.next;
    }
    p1 = p1.next;
  }

  while (p2 !== null) {
    const val = p2.val + r.val;
    const mem = Math.floor(val / 10);
    r.val = val % 10;
    if (p2.next || mem !== 0) {
      r.next = new ListNode(mem);
      r = r.next;
    }
    p2 = p2.next;
  }

  return result;
};

const print = function (list) {
  let r = "";
  while (list) {
    r += list.val;
    list = list.next;
  }
  console.log(r);
};

const testcases = [
  [
    new ListNode(2, new ListNode(4, new ListNode(3))),
    new ListNode(5, new ListNode(6, new ListNode(4))),
    [7, 0, 8],
  ],
  [new ListNode(0), new ListNode(0), [0]],
  [
    new ListNode(
      9,
      new ListNode(
        9,
        new ListNode(
          9,
          new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))),
        ),
      ),
    ),
    new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))),
    [8, 9, 9, 9, 0, 0, 0, 1],
  ],
  [
    new ListNode(2, new ListNode(4, new ListNode(9))),
    new ListNode(5, new ListNode(6, new ListNode(4, new ListNode(9)))),
    [7, 0, 4, 0, 1],
  ],
  [new ListNode(0), new ListNode(7, new ListNode(3)), [7, 3]],
];

for (let testcase of testcases) {
  console.log("\n\n\ninput :");
  print(testcase[0]);
  print(testcase[1]);
  const output = addTwoNumbers(...testcase);
  console.log("\noutput:");
  print(output);
}
