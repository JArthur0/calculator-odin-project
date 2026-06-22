const buttons = document.querySelector(".buttons");
const displayTxt = document.querySelector(".display-text");
let input = "";

let aNumber = 0;
let bNumber = 0;
let firstOperation = true;
let operator = "";
let b = false;

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

buttons.addEventListener("mousedown", (e) => {
  let value = e.target.textContent;

  if (!isNaN(parseInt(value))) {
    input += `${value}`;
    displayTxt.textContent = input;
    b = true;
  }

  if (value === "+" || value === "/" || value === "*" || value === "-") {
    if (firstOperation) {
      if (input === "") return;
      aNumber = parseInt(input);
      operator = value;
      input = "";
      firstOperation = false;
    }
    else {
      if (b) {  
        if (input === "") input = bNumber;
        bNumber = parseInt(input)
        aNumber = operate(operator, aNumber, bNumber);
        operator = value;
        displayTxt.textContent = aNumber;
        input = "";
         b = false;
      } else {
        operator = value;
      }
    }
  }

  if (value === "=") {
    if (input === "") input = bNumber;
    bNumber = parseInt(input);
    aNumber = operate(operator, aNumber, bNumber);
    displayTxt.textContent = aNumber;
    input = "";
    b = false;
  }

  if(value === "del"){
    input = "";
    aNumber = 0;
    bNumber = 0;
    operator = "";
    firstOperation = true;
    b = false;
    displayTxt.textContent = "0"
  }
  
});

