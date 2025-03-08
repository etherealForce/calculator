const numberButtons = document.querySelector(".buttons .numbers");
const display = document.querySelector(".display");
const reset = document.querySelector("#clear");
const funktions = document.querySelector(".buttons .funktions");
let leftOperand;
let rightOperand;
let operator;


reset.addEventListener("click", () => {
    display.innerHTML = "";
});

funktions.addEventListener("click", (e) => {
    let content = e.target.innerText;
    if (content.length > 1 || content === "C") {
        return;
    }

    display.innerText += content;
    operator += content;
});


numberButtons.addEventListener("click", (e) => {
    if (e.target.innerText.length > 1) {
        return;
    }
    display.innerText += e.target.innerText;
    leftOperand = display.innerText;
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
