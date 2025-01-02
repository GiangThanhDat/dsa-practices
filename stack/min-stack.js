console.log("Min Stack");

/**
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 * Implement the MinStack class:
 * * `MinStack()` initializes the stack object.
 * * `void push(int val)` pushes the element val onto the stack.
 * * `void pop()` removes the element on the top of the stack.
 * * `int top` gets the top element of the stack.
 * * `int getMin` retrieves the minimum element in the stack.
 * * `int getMin()` retrieves the minimum element in the stack.
 * You must implement a solution with O(1) time complexity for each function.
 * */

class MinStack {
  constructor() {
    this.stack = [];
  }

  push(val) {
    this.stack.push({ val, min: Math.min(this.getMin() ?? Infinity, val) });
  }

  pop() {
    this.stack.pop();
  }

  top() {
    return this.stack?.[this.stack.length - 1]?.val;
  }

  getMin() {
    return this.stack?.[this.stack.length - 1]?.val;
  }

  show() {
    for (const { val } of this.stack) {
      console.log({ val });
    }
  }
}

const testCases = [
  {
    actions: [
      "MinStack",
      "push",
      "push",
      "push",
      "getMin",
      "pop",
      "top",
      "getMin",
    ],
    params: [[], [-2], [0], [-3], [], [], [], []],
  },
  {
    actions: [
      "MinStack",
      "push",
      "push",
      "push",
      "push",
      "top",
      "getMin",
      "pop",
      "push",
      "push",
      "top",
      "getMin",
      "pop",
      "getMin",
      "pop",
      "getMin",
      "push",
      "push",
      "push",
      "top",
      "getMin",
    ],
    params: [
      [],
      [2],
      [1],
      [4],
      [8],
      [],
      [],
      [],
      [0],
      [7],
      [],
      [],
      [],
      [],
      [],
      [],
      [-1],
      [5],
      [3],
      [],
      [],
    ],
  },
];

for (const testcase of testCases) {
  const { actions, params } = testcase;

  let minStack;
  const result = [];

  actions.forEach((action, index) => {
    if (action === "MinStack") {
      minStack = new MinStack();
      result.push(null);
    } else if (minStack instanceof MinStack) {
      result.push(minStack[action](...params[index]));
    }
  });

  minStack.show();
  console.log("result:", result);
}
