console.log("REVERSE POLISH NOTATION");

function evalRPN(tokens) {
  const stack = [],
    n = tokens.length,
    operators = ["+", "-", "*", "/"];

  for (let i = 0; i < n; i++) {
    const token = tokens[i];
    if (operators.includes(token)) {
      const [b, a] = [stack.pop(), stack.pop()];
      let value = 0;
      if (token === "+") value = a + b;
      if (token === "-") value = a - b;
      if (token === "*") value = a * b;
      if (token === "/") value = Math.trunc(a / b);
      stack.push(value);
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop();
}

const testcases = [
  ["2", "1", "+", "3", "*"],
  ["4", "13", "5", "/", "+"],
  ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
];

for (const tokens of testcases) {
  console.log("testcase: ", tokens);
  const result = evalRPN(tokens);
  console.log("result:", result);
}
