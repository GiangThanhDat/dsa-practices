console.log("SimplifyPath problem");

function simplifyPath(path) {
  const stack = [];
  let left = 0,
    right = 1;
  const n = path.length;
  while (right < n) {
    if (path[left] === "/" && path[right] !== "/") {
      while (path[right] !== "/" && right < n) {
        right++;
      }
      if (left < right) {
        const name = path.substring(left, right);
        if (name === "/..") {
          stack.pop();
        } else if (name !== "/.") {
          stack.push(name);
        }
      }
      // left = right;
      // right = right + 1;
      left = right++;
    } else {
      left++;
      right++;
    }
  }

  if (stack.length === 0) {
    return "/";
  }

  return stack.join("");
}

function simplifyPath2(path) {
  const stack = [];
  const pathNames = path.split("/");

  for (let i = 0; i < pathNames.length; i++) {
    const char = pathNames[i];

    if (char === "..") {
      stack.pop();
      continue;
    }

    if (char === "." || char === "") continue;

    stack.push(char);
  }

  return `/${stack.join("/")}`;
}

function simplifyPath3(path) {
  const stack = [];
  const n = path.length;
  let i = 0;
  while (i < n) {
    while (i < n && path[i] === "/") i++;

    let dir = "";
    while (i < n && path[i] !== "/") {
      dir += path[i];
      i++;
    }

    if (dir === "..") {
      stack.pop();
    } else if (dir !== "." && dir !== "") {
      stack.push(dir);
    }
  }

  return `/${stack.join("/")}`;
}

const testCases = [
  "/home/",
  "/home//foo/",
  "/.../a/../b/c/../d/./",
  "/../",
  "/abc/xyz///////ukl/lxy/../.../../leetcode/simplyPath/test",
];

for (let testCase of testCases) {
  console.log("testcase:", testCase);
  const path = simplifyPath(testCase);
  const path2 = simplifyPath2(testCase);
  const path3 = simplifyPath3(testCase);
  console.log({ path, path2, path3 });
}
