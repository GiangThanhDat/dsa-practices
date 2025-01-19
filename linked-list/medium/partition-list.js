import ListNode from "../classes/list-node.js";
import { convertLinkedListToArray, createLinkedList } from "../utils.js";

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

// My solution
function partition(head, x) {
  if (head === null) {
    return null;
  }

  const dummy = new ListNode(0, head);
  let left = dummy;

  while (left && left.next?.val < x) {
    left = left.next;
  }
  let right = left.next;

  while (right && right.next?.val >= x) {
    right = right.next;
  }

  while (right && right.next !== null) {
    if (right.next?.val < x) {
      let p = left.next;
      let next = right.next.next;
      left.next = right.next;
      right.next.next = p;
      right.next = next;
      left = left.next;
    } else {
      right = right.next;
    }
  }

  return dummy.next;
}

// 2 list seperator approach
function partition2List(head, x) {
  const lessList = new ListNode();
  const greaterList = new ListNode();

  let less = lessList,
    greater = greaterList;

  while (head !== null) {
    if (head.val < x) {
      less.next = head;
      less = less.next;
    } else {
      greater.next = head;
      greater = greater.next;
    }
    head = head.next;
  }

  less.next = greaterList.next;
  greater.next = null;

  return lessList.next;
}

const testcases = [
  [createLinkedList([1, 4, 3, 2, 5, 2]), 3],
  [createLinkedList([2, 1]), 2],
  [createLinkedList([1, 7, 2, 1, 4, 5, 3, 2, 5, 2]), 3],
  [createLinkedList([1, 2, 1, 3, 7, 2, 1, 4, 5, 3, 2, 5, 2]), 4],
  [createLinkedList([1, 4, 3, 5, 2, 1, 2]), 3],
  [createLinkedList([1, 4, 3, 5, 2, 5, 1, 2]), 3],
  [createLinkedList([1]), 0],
  [createLinkedList([]), 3],
  [createLinkedList([1]), 2],
];

for (const testcase of testcases) {
  console.log("Input:");
  const [list, x] = testcase;
  console.log("List:", convertLinkedListToArray(list));
  console.log("x: ", x);
  console.log("\n");
  // const output = partition(list, x);
  const output2List = partition2List(list, x);
  // const outputAsArray = convertLinkedListToArray(output);
  const output2ListAsArray = convertLinkedListToArray(output2List);
  // console.log("Output:", outputAsArray);
  console.log("Output:", output2ListAsArray);
}
