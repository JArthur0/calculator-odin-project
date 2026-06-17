const buttons = document.querySelector(".buttons");
const displayTxt = document.querySelector(".display-text");
let input = "";

let state = 1;
let aNumber = 0;
let bNumber = 0;
let operator = "";

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
  }

  if (value === "=" && input != "") {
    bNumber = parseInt(input);
    input = "";
    displayTxt.textContent = operate(operator, aNumber, bNumber);
  }

  if (
    isNaN(parseInt(value)) &&
    value != "del" &&
    value != "=" &&
    value != "." &&
    input != ""
  ) {
    switch (state) {
      case 1:
        aNumber = parseInt(input);
        input = "";
        operator = value;
        state++;
        console.log("case1");
        break;
      case 2:
        bNumber = parseInt(input);
        input = "";
        aNumber = operate(operator, aNumber, bNumber);
        displayTxt.textContent = aNumber;
        operator = value;
        // state++;
        console.log("case2");
        break;
      case 3:
        aNumber = operate(operator, aNumber, bNumber);
        displayTxt.textContent = aNumber;
        state--;
        console.log("case3");
        break;
    }
  }
});

// aNumber = parseInt(input);
// input = "";
// operator = value;
// buttons.addEventListener("mousedown", (e) => {
//   let value = e.target.textContent;

//   console.log(value);
//   if (isNaN(parseInt(value))) {
//     switch (value) {
//       case "=":
//         console.log("CRAZY");
//         break;
//     }
//   }
// });

// if (value === "+" || value === "/" || value === "*" || value === "-") {
//   numbers.push(input);
//   input = "";
//   console.log("Crazy");
// } else if (value === "del") {
//   numbers = [];
//   displayTxt.textContent = "0";
// } else {
//   input += `${value}`;
//   displayTxt.textContent = input;
// }
