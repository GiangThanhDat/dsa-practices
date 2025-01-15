import ListNode from "../classes/list-node.js";
import { convertLinkedListToArray, createLinkedList } from "../utils.js";

console.log("Rotate-list");

/*
 * 61. Rotate List
 * given the head of a linked list, rotate the list to the right by k places.
 * input = [1,2,3,4,5], k = 2
 * output = [4,5,1,2,3]
 * input = [0,1,2],  k = 4
 * output = [2,0,1]
 * */

function rotateRight(head, k) {
  if (!head || !head.next) {
    return head;
  }

  let tail = head;
  let length = 1;

  while (tail.next) {
    tail = tail.next;
    length++;
  }

  let curr = head;

  k = k % length;

  for (let i = 1; i < length - k; i++) {
    curr = curr.next;
  }

  const newHead = curr.next;
  tail.next = head;
  curr.next = null;

  return newHead;
}

const testcases = [
  [createLinkedList([1, 2, 3, 4, 5]), 2],
  [createLinkedList([0, 1, 2]), 4],
  [createLinkedList([1, 2]), 1],
  [null, 1],
  [new ListNode(1), 1],
  [new ListNode(1), 0],
  [createLinkedList([1, 2, 3]), 2000000000],
];

for (const testcase of testcases) {
  const [list, k] = testcase;
  console.log("Head:", convertLinkedListToArray(list));
  console.log("k:", k);

  const output = rotateRight(list, k);
  console.log("\n\n\nOutput:", convertLinkedListToArray(output));
}
