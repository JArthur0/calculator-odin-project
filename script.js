const buttons = document.querySelector(".buttons");
const displayTxt = document.querySelector(".display-text");
let input = "";

let aNumber = 0;
let bNumber = 0;
let result = 0;
let operator = "";

let hasDot = false;
let firstOperation = true;
let hasInput = false;

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
  return a / b;
}
function operate(op, a, b) {
  switch (op) {
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
function roundDecimal(op, a, b) {
  let number = Math.round(`${operate(op, a, b)}` + "e2") + "e-2";
  return parseFloat(number);
}

buttons.addEventListener("mousedown", (e) => {
  const value = e.target.textContent;
  calcLogic(value);
});

document.addEventListener("keydown", (e) => {
  const keyName = e.key;
  calcLogic(keyName);
})

function calcLogic(value) {

  if (!isNaN(parseInt(value))) {
    input += `${value}`;
    displayTxt.textContent = input;
    hasInput = true;
  }

  if (value === "+" || value === "/" || value === "*" || value === "-") {
    if (firstOperation) {
      if (input === "") return;
      aNumber = parseFloat(input);
      operator = value;
      input = "";
      firstOperation = false;
      hasInput =false;
      hasDot = false;
    }
    else {
      if (hasInput) {
        if (input === "") input = bNumber;
        bNumber = parseFloat(input)
        result = roundDecimal(operator, aNumber, bNumber);
        aNumber = result;
        operator = value;
        displayTxt.textContent = result;
        input = "";
        hasInput = false;
        hasDot = false;
      } else {
        operator = value;
      }
    }
  }

  if (value === "=" || value === "Enter") {
    if (!hasInput || aNumber === 0) {
      
      return;
    }
    else if(firstOperation) aNumber = result;
    if (input === "") input = bNumber;
    bNumber = parseFloat(input);
    result = roundDecimal(operator, aNumber, bNumber);
    displayTxt.textContent = result;
    input = "";
    hasDot = false;
    firstOperation = true;
  }

  if (value === "del" || value === "Delete") {
    input = "";
    aNumber = 0;
    bNumber = 0;
    result = 0;
    operator = "";
    firstOperation = true;
    hasInput =false;
    hasDot = false;
    displayTxt.textContent = "0"
  }

  if (value === "Backspace") {
    if (input === "") return;
    let temp = input.at(-1);
    input = input.replace(temp, "")
    displayTxt.textContent = input;
  }

  if (value === "." || value === ",") {
    if (hasDot || input === "") {
      return;
    }
    input += ".";
    displayTxt.textContent = input;
    hasDot = true;
  }
}
