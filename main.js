const calculator = {
  firstPress: true,
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: true,

  handleInput: function (button) {
    if (this.firstPress) {
      this.handleFirstInput(button);
      return;
    }

    if (button.textContent === "." && this.displayValue.includes(".")) {
      return;
    }

    if (this.displayValue.includes("e")) {
      if (this.displayValue.includes("-")) {
        return;
      }

      let displayValueNumber = Number(this.displayValue);
      displayValueNumber = displayValueNumber * 10 + Number(button.textContent);
      if (displayValueNumber == Infinity) {
        return;
      }
      this.displayValue = displayValueNumber.toExponential(2);
      return;
    } else {
      this.displayValue += button.textContent;
    }

    if (this.displayValue.length > 13) {
      this.displayValue = Number(this.displayValue).toExponential(2);
    }
  },

  handleFirstInput: function (button) {
    if (button.textContent === "0" || button.classList.contains("clear")) {
      return;
    }

    if (button.textContent === ".") {
      this.displayValue = "0.";
    } else {
      this.displayValue = button.textContent;
    }
    this.firstPress = false;
  },

  outputToScreen: function (screen) {
    screen.textContent = this.displayValue;
  },
};

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
    calculator.handleInput(button);
    calculator.outputToScreen(screen);
  });
});
