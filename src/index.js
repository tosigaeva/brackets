module.exports = function check(str, bracketsConfig) {
  const openBrackets = [];
  const closeBrackets = new Map();
  const sameBrackets = new Map();
  const stack = [];

  bracketsConfig.forEach(([open, close]) => {
    openBrackets.push(open);
    closeBrackets.set(close, open);
    if (open === close) {
      sameBrackets.set(open, close);
    }
  });

  for (let char of str) {
    if (sameBrackets.has(char)) {
      if (stack.length && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (closeBrackets.has(char)) {
      if (stack.pop() !== closeBrackets.get(char)) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
