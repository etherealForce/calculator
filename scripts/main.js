const numberButtons = document.querySelector(".buttons .numbers");
const display = document.querySelector(".display");

numberButtons.addEventListener("click", (e) => {
    display.innerText += e.target.innerText;
});


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

let leftOperand;
let rightOperand;
let operator;

function operate(num1 , num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}
