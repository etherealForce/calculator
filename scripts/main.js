const numberButtons = document.querySelector(".buttons .numbers");
const display = document.querySelector(".display");
const reset = document.querySelector("#clear");
const funktions = document.querySelector(".buttons .funktions");
const evaluate = document.querySelector("#evaluate");
let leftOperand = "";
let rightOperand = "";
let operator = "";
let leftStatus = false;

reset.addEventListener("click", () => {
    display.innerHTML = "";
    leftStatus = false;
});

funktions.addEventListener("click", (e) => {
    let content = e.target.innerText;

    if (content.length > 1 
        || content === "C" 
        || content === "=") {
        return;
    }
    

    if (display.innerHTML === "") {
        leftOperand += content;
        display.innerHTML += content;
        return;
    }

    display.innerHTML += content;
    operator += content;
    leftStatus = true;
});


numberButtons.addEventListener("click", (e) => {
    let content = e.target.innerText;
    if (content.length > 1 
        || content === ".") {
        return;
    }

    display.innerHTML += content;

    if (leftStatus) {
        rightOperand += content;
    } else {
        leftOperand += content;
    }
    

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
