const calculator = {
  firstPress: true,
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,

  setDisplayValue: function (value) {
    if (value.length > 12) {
      this.displayValue = Number(value).toExponential(2);
    } else {
      this.displayValue = value;
    }
  },

  handleInput: function (button) {
    if (this.firstPress) {
      this.handleFirstInput(button);
      return;
    }

    if (button.textContent === "." && this.displayValue.includes(".")) {
      return;
    }

    if (button.classList.contains("number")) {
      this.handleNumberInput(button);
    } else if (button.classList.contains("operator")) {
      this.handleOperatorInput(button);
    } else {
      this.handleClearInput(button);
    }
  },

  handleFirstInput: function (button) {
    if (
      button.textContent === "0" ||
      button.classList.contains("clear") ||
      button.textContent === "="
    ) {
      return;
    }

    if (button.textContent === ".") {
      this.setDisplayValue("0.");
    } else if (button.classList.contains("operator")) {
      this.firstOperand = 0;
      this.waitingForSecondOperand = true;
      this.operator = button.textContent;
    } else {
      this.setDisplayValue(button.textContent);
    }
    this.firstPress = false;
  },

  outputToScreen: function (screen) {
    screen.textContent = this.displayValue;
  },

  handleNumberInput: function (button) {
    if (this.displayValue.includes("e")) {
      if (this.displayValue.includes("-")) {
        return;
      }

      let displayValueNumber = Number(this.displayValue);
      displayValueNumber = displayValueNumber * 10 + Number(button.textContent);
      if (displayValueNumber != Infinity) {
        this.setDisplayValue(displayValueNumber.toExponential(2));
      }
    } else {
      this.setDisplayValue(this.displayValue + button.textContent);
    }
  },

  handleOperatorInput: function (button) {
    if (this.waitingForSecondOperand) {
    } else {
      if (button.textContent === "=") {
      }
    }
  },

  handleClearInput: function (button) {
    if (button.textContent === "DEL") {
      if (this.displayValue.length === 1) {
        this.reset();
      } else if (this.displayValue.includes("e")) {
        let number = Number(this.displayValue);
        number = Math.floor(number / 10);
        this.setDisplayValue(number.toString());
      } else {
        this.setDisplayValue(this.displayValue.slice(0, -1));
      }
    } else {
      this.reset();
    }
  },

  reset: function () {
    this.firstPress = true;
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
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
