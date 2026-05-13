// ================= BACKGROUND ANIMATION =================

const symbols = [
    'π', '∞', 'Σ', '√', '∫',
    '∆', 'x²', 'sin', 'cos',
    'log', '÷', '≠'
];

const colors = [
    '#00f2ff',
    '#00ff9d',
    '#ff00e1',
    '#ffea00',
    '#ff4d4d',
    '#8a2eff'
];

const bgContainer = document.getElementById('mathBg');

function createSymbol() {

    const el = document.createElement('div');

    el.classList.add('math-symbol');

    // Random Symbol
    el.innerText =
    symbols[Math.floor(Math.random() * symbols.length)];

    // Random Color
    el.style.color =
    colors[Math.floor(Math.random() * colors.length)];

    // Random Position
    el.style.left = Math.random() * 100 + 'vw';

    // Random Size
    const size = Math.random() * 2 + 1;
    el.style.fontSize = size + 'rem';

    // Random Duration
    const duration = Math.random() * 4 + 4;
    el.style.animationDuration = duration + 's';

    bgContainer.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, duration * 1000);
}

setInterval(createSymbol, 180);

// ================= CALCULATOR =================

let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay =
document.getElementById('current-operand');

const previousDisplay =
document.getElementById('previous-operand');

function updateDisplay() {

    currentDisplay.innerText = currentInput;

    previousDisplay.innerText =
    operator
    ? `${previousInput} ${operator}`
    : '';
}

// ================= APPEND NUMBER =================

function appendNumber(number) {

    if (
        number === '.'
        && currentInput.includes('.')
    ) return;

    if (
        currentInput === '0'
        && number !== '.'
    ) {

        currentInput = number;

    } else {

        currentInput += number;
    }

    updateDisplay();
}

// ================= OPERATOR =================

function appendOperator(op) {

    if (currentInput === '') return;

    if (previousInput !== '') {
        calculate();
    }

    operator = op;

    previousInput = currentInput;

    currentInput = '0';

    updateDisplay();
}

// ================= CLEAR =================

function clearDisplay() {

    currentInput = '0';

    previousInput = '';

    operator = null;

    updateDisplay();
}

// ================= DELETE =================

function deleteNumber() {

    if (
        currentInput.length === 1
        || currentInput === 'Error'
    ) {

        currentInput = '0';

    } else {

        currentInput =
        currentInput.slice(0, -1);
    }

    updateDisplay();
}

// ================= CALCULATE =================

function calculate() {

    let result;

    const prev = parseFloat(previousInput);

    const current = parseFloat(currentInput);

    if (
        isNaN(prev)
        || isNaN(current)
    ) return;

    switch(operator){

        case '+':
            result = prev + current;
            break;

        case '-':
            result = prev - current;
            break;

        case '*':
            result = prev * current;
            break;

        case '/':
            result =
            current === 0
            ? 'Error'
            : prev / current;
            break;

        default:
            return;
    }

    currentInput = result.toString();

    operator = null;

    previousInput = '';

    updateDisplay();
}

// ================= KEYBOARD SUPPORT =================

document.addEventListener('keydown', (e) => {

    if (!isNaN(e.key)) {
        appendNumber(e.key);
    }

    if (e.key === '.') {
        appendNumber('.');
    }

    if (
        e.key === '+'
        || e.key === '-'
        || e.key === '*'
        || e.key === '/'
    ) {
        appendOperator(e.key);
    }

    if (e.key === 'Enter') {
        calculate();
    }

    if (e.key === 'Backspace') {
        deleteNumber();
    }

    if (e.key === 'Escape') {
        clearDisplay();
    }
});

// ================= THEME TOGGLE =================

const themeToggle =
document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('light-mode');

    if (
        document.body.classList.contains('light-mode')
    ) {

        themeToggle.innerText = '☀️';

    } else {

        themeToggle.innerText = '🌙';
    }
});

// Initial Display
updateDisplay();
