const calculator = {
    displayValue: '0',
    firts0perand: null,
    waitingForSecond0perand: false,
    operator: null,
};
function inputDigit(digit) {
    const {displayValue, waitingForSecond0perand} = calculator;
    if (waitingForSecond0perand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecond0perand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}
function inputDecimal(dot) {
    if (calculator.waitingForSecond0perand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecond0perand = false;
        return
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}
function handleOperator(nextOperator) {
     const {firts0perand, displayValue, operator} = calculator
     const inputValue = parseFloat(displayValue);
     if (operator && calculator.waitingForSecond0perand) {
         calculator.operator = nextOperator;
         return;
     }
     if (firts0perand == null && !isNaN(inputValue)) {
         calculator.firts0perand = inputValue;
     } else if (operator) {
         const result = calculate(firts0perand, inputValue, operator);
         calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
         calculator.firts0perand = result;
     }
     calculator.waitingForSecond0perand = true;
     calculator.operator = nextOperator;
}
function calculate(firts0perand, second0perand, operator) {
    if (operator === '+') {
        return firts0perand + second0perand;
    } else if (operator === '-') {
        return firts0perand - second0perand;
    } else if (operator === '*') {
        return firts0perand * second0perand;
    } else if (operator === '/') {
        return firts0perand / second0perand;
    }
    return second0perand;
}
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firts0perand = null;
    calculator.second0perand = false;
    calculator.operator = null;
}
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
updateDisplay();
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
        handleOperator(value);
        break;
        case '.':
        inputDecimal(value);
        break;
        case 'all-clear':
        resetCalculator();
        break;
        default:
        if (Number.isInteger(parseFloat(value))) {
            inputDigit(value);
        }
    }
    updateDisplay();
});