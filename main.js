let firstPress = true;

const screen = document.querySelector("#screen-text");
const buttonsContainer = document.querySelector("#buttons");

function createButton(id, btnClass, gridArea, text) {
  let btn = document.createElement("button");
  btn.id = id;
  btn.style.gridArea = gridArea;
  btn.textContent = text;
  btn.classList.add(btnClass);
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

function processButtonPress(button, screen) {
  if (firstPress) {
    if (button.textContent === "0") {
      return;
    }

    if (button.textContent === ".") {
      screen.textContent = "0.";
    } else {
      screen.textContent = "";
      screen.textContent += button.textContent;
    }

    firstPress = false;
    return;
  }

  // Avoid multiple decimals
  if (button.textContent === "." && screen.textContent.includes(".")) {
    return;
  }

  // Check if currently displaying scientific notation
  if (screen.textContent.includes("e")) {
    let number = Number(screen.textContent);
    number = number * 10 + Number(button.textContent);
    if (number == Infinity) {
      return;
    }
    screen.textContent = number.toExponential(2).toString();
  } else {
    screen.textContent += button.textContent;
  }

  if (screen.textContent.length > 13) {
    screen.textContent = Number(screen.textContent).toExponential(2);
  }
}

// Create calculator buttons
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

// Number buttons
for (let i = 0; i < 10; i++) {
  let id = `btn-${i}`;
  let gridArea = `${nums[i]}`;
  buttonsContainer.appendChild(createButton(id, "number", gridArea, `${i}`));
}

// Other buttons
buttonsContainer.appendChild(createButton("btn-del", "clear", "del", "DEL"));
buttonsContainer.appendChild(createButton("btn-ac", "clear", "ac", "AC"));
buttonsContainer.appendChild(
  createButton("btn-multiply", "operator", "multiply", "×")
);
buttonsContainer.appendChild(
  createButton("btn-divide", "operator", "divide", "÷")
);
buttonsContainer.appendChild(createButton("btn-add", "operator", "add", "+"));
buttonsContainer.appendChild(
  createButton("btn-subtract", "operator", "subtract", "−")
);
buttonsContainer.appendChild(
  createButton("btn-equals", "operator", "equals", "=")
);
buttonsContainer.appendChild(
  createButton("btn-decimalPoint", "number", "decimalPoint", ".")
);

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    processButtonPress(button, screen);
  });
});
