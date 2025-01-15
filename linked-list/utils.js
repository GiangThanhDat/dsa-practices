import ListNode from "./classes/list-node.js";

/**
 *
 */
export function convertLinkedListToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

/*
 *
 * */
export function createLinkedList(array) {
  if (!array || array.length === 0) {
    return null;
  }

  const result = new ListNode();
  let curr = result;

  for (const value of array) {
    curr.next = new ListNode(value);
    curr = curr.next;
  }

  return result.next;
}
