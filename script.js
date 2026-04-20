// --- BACKGROUND ANIMATION ---
const canvas = document.getElementById('mathCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Math symbols and numbers
const symbols = "0123456789+-*/=√πΣ∫≠x²y";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawBackground() {
    // Faint black rectangle to create trailing effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffcc22"; // Very faint teal for the symbols
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = symbols.charAt(Math.floor(Math.random() * symbols.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawBackground, 50);

// --- CALCULATOR LOGIC ---
let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let val = e.target.innerHTML;

        if(val == '='){
            try {
                string = eval(string);
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }
        } else if(val == 'AC'){
            string = "";
            input.value = "";
        } else if(val == 'DEL'){
            string = string.toString().slice(0, -1);
            input.value = string;
        } else {
            string += val;
            input.value = string;
        }
    });
});