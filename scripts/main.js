const numberButtons = document.querySelector(".buttons .numbers");
const display = document.querySelector(".display");
const reset = document.querySelector("#clear");
const funktions = document.querySelector(".buttons .funktions");
const evaluate = document.querySelector("#evaluate");
let leftOperand = "";
let rightOperand = "";
let operator = "";
let leftStatus = false;
let errorStatus = false;
let calcCycle = false;

function resetCalc() {
    display.innerHTML = "";
    leftStatus = false;
    errorStatus = false;
    leftOperand = "";
    rightOperand = "";
    operator = "";
}


evaluate.addEventListener("click", function() {
    if (leftOperand === "" || rightOperand === "") {
        display.innerHTML = "Syntax Error";
        errorStatus = true;
        return;
    }
    let evaluatedValue = Math.round(operate(parseFloat(leftOperand), parseFloat(rightOperand), operator) * 10000000) / 10000000;
    if (evaluatedValue === Infinity) {
        display.innerHTML = "nub";
        errorStatus = true;
        return;
    } else {
        display.innerHTML = evaluatedValue;
        calcCycle = true;
    }
    
});

reset.addEventListener("click", resetCalc);

funktions.addEventListener("click", (e) => {
    let content = e.target.innerText;

    if (content.length > 1 
        || content === "C" 
        || content === "="
        || (errorStatus)
        ) {
        return;
    }
  

    if (display.innerHTML === "") {
        leftOperand += content;
        display.innerHTML += content;
        return;
    }

    
    
    if (leftStatus 
        && leftOperand !== "" 
        && rightOperand !== "") {
            leftOperand = Math.round(operate(parseFloat(leftOperand), parseFloat(rightOperand), operator) * 10000000) / 10000000;
            display.innerHTML = leftOperand;
            rightOperand = "";
            operator = "";
            leftStatus = false;
        } else if (rightOperand === "" && operator !== "") {
            let tempArr = display.innerText.split("");
            tempArr.pop();
            display.innerHTML = tempArr.join("");

            display.innerHTML += content;
            operator = content;
            return;
        }

    display.innerHTML += content;

    if (leftStatus) {
        rightOperand += content;
    } else {
        operator += content;
    }
    leftStatus = true;
});


numberButtons.addEventListener("click", (e) => {
    let content = e.target.innerText;

    if (calcCycle) {
        resetCalc();
        calcCycle = false;
    }
    if (content.length > 1 
        || content === "."
        || errorStatus) {
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
