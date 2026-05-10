const display = document.getElementById("display");
const buttons = document.getElementById("buttons");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let isSecond = false;

// ==========================
// EVENT CLICK BUTTON
// ==========================
buttons.addEventListener("click", function (e) {
  const value = e.target.dataset.value;

  if (!value) return;

  handleInput(value);
});

// ==========================
// HANDLE INPUT
// ==========================
function handleInput(value) {
  // CLEAR
  if (value === "C") {
    clearCalculator();
    return;
  }

  // HITUNG
  if (value === "=") {
    calculate();
    return;
  }

  // OPERATOR
  if (["+", "-", "*", "/"].includes(value)) {
    if (firstNumber === "") return;

    operator = value;
    isSecond = true;

    display.value += value;

    return;
  }

  // INPUT ANGKA
  if (!isSecond) {
    firstNumber += value;
  } else {
    secondNumber += value;
  }

  display.value += value;
}

// ==========================
// FUNCTION HITUNG
// ==========================
function calculate() {
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  let result = 0;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;

    case "-":
      result = num1 - num2;
      break;

    case "*":
      result = num1 * num2;
      break;

    case "/":
      result = num1 / num2;
      break;
  }

  display.value = result;

  firstNumber = result.toString();
  secondNumber = "";
  operator = "";
  isSecond = false;
}

// ==========================
// CLEAR
// ==========================
function clearCalculator() {
  display.value = "";

  firstNumber = "";
  secondNumber = "";
  operator = "";
  isSecond = false;
}

// ==========================
// KEYBOARD SUPPORT
// ==========================
document.addEventListener("keydown", function (e) {
  const key = e.key;

  // ANGKA & OPERATOR
  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    handleInput(key);
  }

  // ENTER
  if (key === "Enter") {
    calculate();
  }

  // ESC
  if (key === "Escape") {
    clearCalculator();
  }
});
