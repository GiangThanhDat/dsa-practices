console.log("Rotate-list");

/*
 * 61. Rotate List
 * given the head of a linked list, rotate the list to the right by k places.
 * input = [1,2,3,4,5], k = 2
 * output = [4,5,1,2,3]
 * input = [0,1,2],  k = 4
 * output = [2,0,1]
 * */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? null : val;
    this.next = next === undefined ? null : next;
  }
}

function rotateRight(head, k) {
  if (!head || k === 0) return head;

  const dummy = new ListNode(0, head);
  let prev = dummy,
    curr = head;

  let len = 0;
  while (curr) {
    curr = curr.next;
    len++;
  }

  curr = dummy;
  let step = k % len;

  while (step && curr.next) {
    step--;
    curr = curr.next;
  }

  while (curr.next) {
    prev = prev.next;
    curr = curr.next;
  }

  if (prev === curr) {
    return curr;
  }

  dummy.next = prev.next;
  prev.next = null;
  curr.next = head;

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
  [new ListNode(0, new ListNode(1, new ListNode(2))), 4],
  [new ListNode(1, new ListNode(2)), 1],
  [null, 1],
  [new ListNode(1), 1],
  [new ListNode(1), 0],
  [new ListNode(1, new ListNode(2, new ListNode(3))), 2000000000],
];

for (const testcase of testcases) {
  const [list, k] = testcase;
  console.log("Head:");
  print(list);
  console.log("k:", k);

  const output = rotateRight(list, k);
  console.log("\n\n\nOutput:");
  print(output);
}
