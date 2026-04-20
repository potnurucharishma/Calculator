// --- BACKGROUND ANIMATION ---
const symbols = ['π', '∞', 'Σ', '√', '∫', '∆', 'x²', 'sin', 'cos', 'log', '÷', '≠'];
const colors = ['#00f2ff', '#00ff9d', '#ff00e1', '#ffea00', '#ff4d4d', '#7000ff'];
const bgContainer = document.getElementById('mathBg');

function createSymbol() {
    const el = document.createElement('div');
    el.classList.add('math-symbol');
    
    // Pick random symbol and color
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random position and size
    el.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * (2.2 - 1) + 1;
    el.style.fontSize = `${size}rem`;
    
    // Random duration for movement
    const duration = Math.random() * 3 + 4; 
    el.style.animationDuration = `${duration}s`;
    
    bgContainer.appendChild(el);

    // Remove from DOM after animation finishes
    setTimeout(() => { el.remove(); }, duration * 1000);
}

// Spawn speed (lower = more symbols)
setInterval(createSymbol, 200);

// --- CALCULATOR LOGIC ---
let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = operator ? `${previousInput} ${operator}` : '';
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current === 0 ? "Error" : prev / current; break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}