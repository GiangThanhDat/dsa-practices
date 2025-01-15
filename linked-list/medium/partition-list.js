import ListNode from "../classes/list-node.js";

console.log("Partition List");

/**
 *
 * Give the head of a linked list and a value x, partition it sich that all nodes less than x come before nodes greater than or equal to x.
 *
 * You should preserve the original relative order of the nodes in each of the two partitions
 *
 * Examples:
 * Input - head = [1,4,3,2,5,2], x = 3
 * Output = [1,2,2,4,3,5]
 *
 * Input : head = [2,1,], x = 2
 * Output  = [1,2]
 */

// class ListNode {
//   constructor(val, next) {
//     this.val = val === undefined ? 0 : val;
//     this.next = next === undefined ? null : next;
//   }
// }

function partition(head, x) {
  return head;
}

function createLinkedList(array) {
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

function convertLinkedListToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

const testcases = [
  [createLinkedList([1, 4, 3, 2, 5, 2]), 3],
  [createLinkedList([2, 1]), 2],
];

for (const testcase of testcases) {
  console.log("Input:");
  const [list, x] = testcase;
  console.log("List:", convertLinkedListToArray(list));
  console.log("x: ", x);
  console.log("\n");
  const output = partition(list, x);
  const outputAsArray = convertLinkedListToArray(output);
  console.log("Output:", outputAsArray);
}
