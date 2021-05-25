function createButton(id, gridArea, text) {
  let btn = document.createElement("button");
  btn.id = id;
  btn.style.gridArea = gridArea;
  btn.textContent = text;
  return btn;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    alert("You can't divide by zero!");
    return;
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

// Create calculator buttons
const buttons = document.querySelector("#buttons");
let nums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
for (let i = 0; i < 10; i++) {
  let id = `btn-${i}`;
  let gridArea = `${nums[i]}`;
  buttons.appendChild(createButton(id, gridArea, `${i}`));
}
buttons.appendChild(createButton("btn-del", "del", "DEL"));
buttons.appendChild(createButton("btn-ac", "ac", "AC"));
buttons.appendChild(createButton("btn-multiply", "multiply", "×"));
buttons.appendChild(createButton("btn-divide", "divide", "÷"));
buttons.appendChild(createButton("btn-add", "add", "+"));
buttons.appendChild(createButton("btn-subtract", "subtract", "−"));
buttons.appendChild(createButton("btn-equals", "equals", "="));
buttons.appendChild(createButton("btn-decimalPoint", "decimalPoint", "."));
