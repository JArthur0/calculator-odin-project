const buttons = document.querySelector(".buttons");
const displayTxt = document.querySelector(".display-text");
const opTxt = document.querySelector(".operator-text");
let input = "";

let aNumber = 0;
let bNumber = 0;
let result = 0;
let operator = "";

let check = ""

let hasDot = false;
let firstOperation = true;
let hasInput = false;
let isBroken = false;

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
function clearAll(value) {
  if (value === "del" || value === "Delete") {
    input = "";
    aNumber = 0;
    bNumber = 0;
    result = 0;
    operator = "";
    firstOperation = true;
    hasInput = false;
    hasDot = false;
    isBroken = false;
    displayTxt.textContent = "0"
    opTxt.textContent = ""
  }
}
function roundDecimal(op, a, b) {
  let number = Math.round(`${operate(op, a, b)}` + "e2") + "e-2";
  return parseFloat(number);
}
function checkResult() {
  check = `${result}`
  if (check.length > 11) {
    displayTxt.textContent = "Number too high";
    isBroken = true;
  }
}
function checkDivide0(){
  if(operator === "/" && bNumber === 0){
    displayTxt.textContent = "Don't even think about it! del to reset"
    isBroken = true;
  }
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
  if (!isBroken) {
    if (!isNaN(parseInt(value))) {
      if (input.length > 11) return;
      if (firstOperation) opTxt.textContent = "" 
      input += `${value}`;
      displayTxt.textContent = input;
      hasInput = true;
    }

    if (value === "+" || value === "/" || value === "*" || value === "-") {
      if (firstOperation) {
        if (input === "") return;
        aNumber = parseFloat(input);
        operator = value;
        opTxt.textContent = value
        input = "";
        firstOperation = false;
        hasInput = false;
        hasDot = false;
      }
      else {
        if (hasInput) {
          if (input === "") input = bNumber;
          bNumber = parseFloat(input)
          result = roundDecimal(operator, aNumber, bNumber);
          aNumber = result;
          displayTxt.textContent = result;
          input = "";
          hasInput = false;
          hasDot = false;
          checkResult();
          checkDivide0();
          operator = value;
          opTxt.textContent = value
        } else {
          operator = value;
          opTxt.textContent = value
        }
      }
    }

    if (value === "=" || value === "Enter") {
      if (!hasInput || aNumber === 0) return;
      else if (firstOperation) aNumber = result;
      if (input === "") input = bNumber;
      bNumber = parseFloat(input);
      result = roundDecimal(operator, aNumber, bNumber);
      displayTxt.textContent = result;
      input = "";
      hasDot = false;
      firstOperation = true;
      checkDivide0();
      checkResult();
      opTxt.textContent = "="
    }

    clearAll(value);

    if (value === "Backspace") {
      if (input === "") return;
      let temp = input.at(-1);
      input = input.replace(temp, "")
      displayTxt.textContent = input;
    }

    if (value === "." || value === ",") {
      if (hasDot || input === "") return;
      input += ".";
      displayTxt.textContent = input;
      hasDot = true;
    }
  } else {
    clearAll(value)
  }
}
