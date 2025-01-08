console.log("Remove Nth Node From End of List");
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

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let i = 0,
    curr = dummy;

  while (curr.next) {
    curr = curr.next;
    i++;
  }

  curr = dummy;

  while (i > n) {
    curr = curr.next;
    i--;
  }

  if (curr.next) {
    curr.next = curr.next.next;
  } else {
    curr.next = null;
  }

  return dummy.next;
}

// Using distance between two pointers
function removeNthFromEndTwoPointer(head, n) {
  const dummy = new ListNode(0, head);
  let left = dummy,
    right = head;

  while (n > 0) {
    right = right.next;
    n--;
  }

  while (right) {
    left = left.next;
    right = right.next;
  }

  left.next = left.next.next;

  return dummy.next;
}

function print(head) {
  let out = "";
  while (head) {
    out += head.val;
    head = head.next;
  }
  console.log(out);
}

const testcases = [
  [
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
    ),
    2,
  ],
  [new ListNode(1), 1],
  [new ListNode(1, new ListNode(2)), 1],
];

for (const testcase of testcases) {
  console.log("\n\n ==== \n\n ");
  const [list, n] = testcase;
  console.log("Input:");
  print(list);
  console.log("n:", n, "\n\n");
  // const output = removeNthFromEnd(...testcase);
  // console.log("Output:");
  // print(output);
  const outputTwoPointer = removeNthFromEndTwoPointer(list, n);
  console.log("Output two pointer:");
  print(outputTwoPointer);
}
