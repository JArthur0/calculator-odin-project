const buttons = document.querySelector(".buttons")
const displayTxt = document.querySelector(".display-text")
let input = ""
let numbers = []

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

buttons.addEventListener("mousedown", (e) => {
    let value = e.target.textContent

    if(value === "+" || value=== "/" || value === "*" || value === "-"){
        numbers.push(input)
        input = ""
        console.log("Crazy")
    }else if(value === "del"){
        numbers = [];
        displayTxt.textContent = "0"
    }
    else{
        input += `${value}`
        displayTxt.textContent = input
    }

    console.log(input)
})