console.log("Remove duplicates from sorted list II");

/**
 *
 * Given the head of a sorted linked list,
 * delete all nodes that have duplicate numbers,
 * leaving only distinct numbers from the original list.
 * Return the linked list sorted as well.
 * Example 1 :
 * Input: head = [1,2,3,3,4,4,5]
 * Output: [1,2,5]
 * Example 2:
 * Input: head = [1,1,1,2,3]
 * Output: [2,3]
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// My first solution
function deleteDuplicates(head) {
  const dummy = new ListNode(0, head);

  let prev = dummy,
    curr = head;

  while (prev.next && curr.next) {
    let next = curr.next;
    let hasDuplicate = false;

    while (next && curr.val === next.val) {
      curr.next = next.next;
      next = next.next;
      hasDuplicate = true;
    }

    if (hasDuplicate) {
      prev.next = next;
      curr = prev.next;
    } else {
      prev = prev.next;
      curr = curr.next;
    }
  }

  return dummy.next;
}

function deleteDuplicates2(head) {
  const res = new ListNode();

  let curr = res;
  let node = head;
  let duplicate = null;

  while (node) {
    if (node.val === node.next?.val) {
      duplicate = node.val;
    }

    if (duplicate !== node.val) {
      curr.next = node;
      curr = curr.next;
    }

    node = node.next;
  }

  curr.next = null;
  return res.next;
}

const testcases = [
  new ListNode(
    1,
    new ListNode(
      2,
      new ListNode(
        3,
        new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5)))),
      ),
    ),
  ),
  new ListNode(
    1,
    new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3)))),
  ),
  new ListNode(
    1,
    new ListNode(
      1,
      new ListNode(
        2,
        new ListNode(2, new ListNode(2, new ListNode(3, new ListNode(4)))),
      ),
    ),
  ),
  new ListNode(1, new ListNode(1)),
  new ListNode(
    5,
    new ListNode(
      6,
      new ListNode(
        7,
        new ListNode(7, new ListNode(8, new ListNode(8, new ListNode(9)))),
      ),
    ),
  ),
];

function print(head) {
  let out = "";
  while (head) {
    out += head.val;
    head = head.next;
  }
  console.log(out);
}

for (const testcase of testcases) {
  console.log("Input:");
  print(testcase);
  // const output = deleteDuplicates(testcase);
  // console.log("Output:");
  // print(output);

  const output2 = deleteDuplicates2(testcase);
  console.log("Output2:");
  print(output2);
}
