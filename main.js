const calculator = {
  firstPress: true,
  displayValue: "0",
  firstOperand: null,
  secondOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  precision: 5,

  operate: function () {
    if (this.operator === "/" && this.secondOperand === 0) {
      alert("You can't divide by zero!");
      return;
    }

    switch (this.operator) {
      case "+":
        return add(this.firstOperand, this.secondOperand);
      case "−":
        return subtract(this.firstOperand, this.secondOperand);
      case "×":
        return multiply(this.firstOperand, this.secondOperand);
      case "÷":
        return divide(this.firstOperand, this.secondOperand);
    }
  },

  setDisplayValue: function (value) {
    // allow a max of 12 characters on display before reformatting
    if (value.length > 12) {
      this.displayValue = Number(value).toPrecision(this.precision);
    } else {
      this.displayValue = value;
    }
  },

  handleInput: function (button) {
    if (button.classList.contains("number")) {
      this.handleNumberInput(button.textContent);
    } else if (button.classList.contains("operator")) {
      this.handleOperatorInput(button.textContent);
    } else {
      this.handleClearInput(button.textContent);
    }
  },

  outputToScreen: function (screen) {
    screen.textContent = this.displayValue;
  },

  handleNumberInput: function (numberStr) {
    if (this.waitingForSecondOperand && !this.operator) {
      this.reset();
    }

    if (this.firstPress) {
      if (!this.waitingForSecondOperand && numberStr === "0") return;
      if (numberStr === ".") {
        this.setDisplayValue("0.");
      } else {
        this.setDisplayValue(numberStr);
      }
      this.firstPress = false;
      return;
    }

    if (numberStr === "." && this.displayValue.includes(".")) return;

    if (this.displayValue.includes("e")) {
      if (this.displayValue.includes("-")) return;

      let displayValueNumber = Number(this.displayValue);
      displayValueNumber = displayValueNumber * 10 + Number(numberStr);
      if (displayValueNumber != Infinity) {
        this.setDisplayValue(displayValueNumber.toString());
      }
    } else {
      this.setDisplayValue(this.displayValue + numberStr);
    }
  },

  handleOperatorInput: function (operatorStr) {
    // user changes mind about which operator to use
    if (this.waitingForSecondOperand && this.firstPress) {
      if (this.displayValue === "0") {
        this.firstPress = false;
      } else if (operatorStr !== "=") {
        this.operator = operatorStr;
        return;
      }
    }

    if (!this.waitingForSecondOperand && this.firstPress) {
      if (operatorStr === "=") return;
      this.firstOperand = 0;
      this.waitingForSecondOperand = true;
      this.operator = operatorStr;
      return;
    }

    if (this.waitingForSecondOperand && !this.firstPress) {
      this.secondOperand = Number(this.displayValue);
      let result = this.operate();
      console.log(
        this.firstOperand,
        this.operator,
        this.secondOperand,
        "=",
        result
      );
      if (result) {
        this.setDisplayValue(result.toString());
        this.firstPress = true;
        this.firstOperand = Number(this.displayValue);
        this.secondOperand = null;
        this.operator = operatorStr === "=" ? null : operatorStr;
      } else {
        this.reset();
      }
      return;
    }

    if (operatorStr !== "=") {
      this.firstPress = true;
      this.firstOperand = Number(this.displayValue);
      this.operator = operatorStr;
      this.waitingForSecondOperand = true;
    }
  },

  handleClearInput: function (clearStr) {
    if (clearStr === "AC") {
      this.reset();
    }

    if (this.firstPress) return;

    if (this.displayValue.length === 1 || this.displayValue.includes("e-")) {
      this.setDisplayValue("0");
      this.firstPress = true;
    } else if (this.displayValue.includes("e")) {
      let number = Number(this.displayValue);
      number = Math.floor(number / 10);
      this.setDisplayValue(number.toString());
    } else {
      this.setDisplayValue(this.displayValue.slice(0, -1));
    }
  },

  reset: function () {
    this.firstPress = true;
    this.displayValue = "0";
    this.firstOperand = null;
    this.secondOperand = null;
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

window.addEventListener("keydown", (e) => {
  let key = e.code;
  let targetButton;
  let selector;

  switch (true) {
    case key.includes("Digit"):
      selector = e.shiftKey ? "#btn-multiply" : `#btn-${key.slice(-1)}`;
      break;
    case key === "Period":
      selector = "#btn-decimalPoint";
      break;
    case key === "Backspace":
      selector = "#btn-del";
      break;
    case key === "Space":
      selector = "#btn-ac";
      break;
    case key === "Enter":
      selector = "#btn-equals";
      break;
    case key === "Equal":
      selector = e.shiftKey ? "#btn-add" : "#btn-equals";
      break;
    case key === "Slash":
      selector = "#btn-divide";
      break;
    case key === "Minus":
      selector = "#btn-subtract";
      break;
    case key.includes("Shift"):
  }

  if (selector) {
    targetButton = document.querySelector(selector);
    calculator.handleInput(targetButton);
    calculator.outputToScreen(screen);
  }
});
