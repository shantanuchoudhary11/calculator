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
    return "Cannot divide by zero";
  }
  return a / b;
}

function operate(a, b, operator) {
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

let firstNumber = null;
let operator = null;
let inputNumber = null;
let startNewNumber = true;
let floatPresent = false;

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const floatingPoint = document.querySelector(".floating-point");
const backspace = document.querySelector(".backspace");

function clearDisplay() {
  operator = null;
  inputNumber = null;
  startNewNumber = true;
  floatPresent = false;
  display.textContent = "0";
}

// Returns the result, or null (after showing the message) if operate gave back text.
function calculate() {
  const result = operate(firstNumber, inputNumber, operator);
  if (typeof result === "string") {
    clearDisplay();
    display.textContent = result;
    return null;
  }
  return result;
}

numbers.forEach(number => {
  number.addEventListener("click", function(event) {
    const numberValue = event.target.textContent;
    if (!startNewNumber && display.textContent !== "0") {
      display.textContent += numberValue;
    } else {
      display.textContent = numberValue;
    }
    startNewNumber = false;
    inputNumber = Number(display.textContent);
  });
});

operations.forEach(operation => {
  operation.addEventListener("click", function(event) {
    if (operator === null) {
      firstNumber = inputNumber ?? 0;
    } else if (!startNewNumber) {
      const result = calculate();
      if (result === null) return;
      firstNumber = result;
      display.textContent = Number(result.toFixed(6));
    }
    operator = event.target.textContent;
    startNewNumber = true;
    floatPresent = false;
  });
});

floatingPoint.addEventListener("click", function(event) {
    if(floatPresent){
        return;
    }
    if (!startNewNumber && display.textContent !== "0") {
      display.textContent += ".";
    } else {
      display.textContent = "0.";
    }
    startNewNumber = false;
    floatPresent = true;
    inputNumber = Number(display.textContent);
  });
    

equals.addEventListener("click", function() {
  if (operator === null || startNewNumber) return;
  const result = calculate();
  if (result === null) return;
  display.textContent = Number(result.toFixed(6));
  inputNumber = result;
  operator = null;
  startNewNumber = true;
  floatPresent = false;
});

backspace.addEventListener("click", function() {
  // Only delete while typing a number, not from a result or error message.
  if (startNewNumber) return;
  if (display.textContent.at(-1) === ".") {
    floatPresent = false;
  }
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "") {
    display.textContent = "0";
  }
  inputNumber = Number(display.textContent);
});

clear.addEventListener("click", clearDisplay);

// Keyboard support: find the matching button and click it, so the click handlers do the work.
document.addEventListener("keydown", function(event) {
  const key = event.key;
  let button = null;

  if ("0123456789+-*/".includes(key)) {
    button = document.getElementById(key);
  } else if (key === "=" || key === "Enter") {
    button = equals;
  } else if (key === "Backspace") {
    button = backspace;
  }

  if (button) {
    event.preventDefault();
    button.click();
  }
});
