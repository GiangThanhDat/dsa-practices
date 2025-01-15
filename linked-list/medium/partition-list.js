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

// x = 3
// Xac dinh thang cuoi cung < 3
// va dau tien >= 3
// loop lan nua xem thang nao < 3 thi dua ra truoc thang
// dau tien >= 3
function partition(head, x) {
  let lastLast = null;
  let firstGreaterOrEqal = null;

  let prev = head;
  let curr = head.next;

  while (curr && lastLast === null && firstGreaterOrEqal === null) {
    if (curr.val >= x) {
      firstGreaterOrEqal = curr;
      lastLast = prev;
    } else {
      prev = prev.next;
      curr = curr.next;
    }
  }

  prev = firstGreaterOrEqal;
  curr = firstGreaterOrEqal.next;
  while (curr) {
    if (curr.val < x) {
      const next = curr.next;
      lastLast.next = curr;
      curr.next = firstGreaterOrEqal;
      prev.next = next;
    }
    console.log(prev.val, curr.val);
    prev = prev.next;
    curr = curr.next;
  }

  return head;
}

const testcases = [
  [createLinkedList([1, 4, 3, 2, 5, 2]), 3],
  [createLinkedList([2, 1]), 2],
  [createLinkedList([1, 7, 2, 1, 4, 5, 3, 2, 5, 2]), 3],
  [createLinkedList([1, 2, 1, 3, 7, 2, 1, 4, 5, 3, 2, 5, 2]), 4],
  // 1, 2, 1, 2, 2, 7, 4, 5, 3, 5
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
