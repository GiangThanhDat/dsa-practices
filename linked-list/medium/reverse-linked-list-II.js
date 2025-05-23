import ListNode from "../classes/list-node.js";
import { convertLinkedListToArray, createLinkedList } from "../utils.js";

console.log("Reverse linked list II");

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

function reverseBetweenUsingPointPrev(head, left, right) {
  if (left === right) return head;
  const dummy = new ListNode(0, head);
  let prev = dummy,
    i = 1;

  while (i < left) {
    prev = prev.next;
    i++;
  }

  let curr = prev.next;
  let next = curr.next;

  while (i < right) {
    const temp = next.next;
    next.next = curr;
    curr = next;
    next = temp;
    i++;
  }

  prev.next.next = next;
  prev.next = curr;

  return dummy.next;
}

// [list, l, r]
const testcases = [
  [createLinkedList([1, 2, 3, 4, 5]), 2, 4],
  [createLinkedList([7, 4, 3, 2, 8, 9, 6]), 2, 4],
  [new ListNode(5), 1, 1],
];

for (const testcase of testcases) {
  const [list, left, right] = testcase;
  console.log(
    "\n======\nInput:",
    convertLinkedListToArray(list),
    "left:",
    left,
    "right: ",
    right,
  );

  const output = reverseBetween(list, left, right);
  console.log("my solution with map: ", convertLinkedListToArray(output));

  const outputStackSolution = reverseBetweenUsingQueue(list, left, right);
  console.log(
    "output stack solution: ",
    convertLinkedListToArray(outputStackSolution),
  );
  const outPreviousPointer = reverseBetweenUsingPointPrev(list, left, right);
  console.log(
    "output previous solution: ",
    convertLinkedListToArray(outPreviousPointer),
  );
}
