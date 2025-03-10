const numberButtons = document.querySelector(".buttons .numbers");
const display = document.querySelector(".display");
const reset = document.querySelector("#clear");
const funktions = document.querySelector(".buttons .funktions");
const evaluate = document.querySelector("#evaluate");
const decimal = document.querySelector("#decimal")
const del = document.querySelector("#del");


let digitCounter = 0;
let leftOperand = "";
let rightOperand = "";
let operator = "";
//leftStatus to know if user is done inputting into the left operand
let leftStatus = false;
// errorStatus in order to stop the calculator from functioning 
let errorStatus = false;
// calcCycle to know if a calculator have finished evaluating, allows to reset when its true.
let calcCycle = false;
// this is to check whether decimal has been inputted into an operand or not
let decimalStatus = false;

function resetCalc() {
    display.innerHTML = "";
    leftStatus = false;
    errorStatus = false;
    leftOperand = "";
    rightOperand = "";
    operator = "";
    decimalStatus = false;
    digitCounter = 0;
}

// del.addEventListener("click", () => {

// });


decimal.addEventListener("click", () => {
    if (decimalStatus || errorStatus) {
        return;
    } else {
        display.innerHTML += ".";
        if (!leftStatus) {
            leftOperand += ".";
            decimalStatus = true;
        } else {
            rightOperand += ".";
            decimalStatus = true;
        }
    }
})


evaluate.addEventListener("click", function() {
    // display syntax error when you do something like 4+= or -32-=, etc
    if (leftOperand === "" || rightOperand === "") {
        display.innerHTML = "Syntax Error";
        errorStatus = true;
        return;
    }
    let evaluatedValue = Math.round(operate(parseFloat(leftOperand), parseFloat(rightOperand), operator) * 10000000) / 10000000;

    // Handle divide by zero. Snarking error message
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
  
    // this part allows the operators to be part of the left operand like -6
    if (display.innerHTML === "" && content === "-") {
        leftOperand += content;
        display.innerHTML += content;
        return;
    }

    //stops when using other functions and disallow inputs when in error statuses
    if (content.length > 1 
            || content === "C" 
            || content === "="
            || (errorStatus)
            || display.innerHTML === ""
            || display.innerHTML === "-"
            ) {
            return;
    }
    
    digitCounter = 0;
    decimalStatus = false;
    // this part allows user to continuously keep doing operations as they keeping pressing the function keys
    // if left operand is inputted, and both operands have values, evaluate them, put result in left operand
    // and reset left operand status. Also free up the operator to allow the current operator in content to be stored in it.
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
    digitCounter++;
    if (calcCycle) {
        resetCalc();
        calcCycle = false;
    }

    //handle event delegation error(clicking outside of buttons) and disallow user to input when SyntaxError or any errorstatuses
    if (content.length > 1 
        || content === "."
        || errorStatus
        || digitCounter > 8) {
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
