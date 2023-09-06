let randomColor = generateColor();

document.addEventListener('DOMContentLoaded', displayColor(randomColor));

let button = document.getElementById('submit');
button.addEventListener('click', triggerDisplay);

function triggerDisplay () {
    let resultRGB = document.getElementById('random-rgb');
    displayResult(randomColor);
    resultRGB.innerHTML = randomColor;
    
}

// function to display result after submit
function displayResult (color) {
    let displayRandomRGB = document.getElementById('random-rgb');
    let displayRandomHex = document.getElementById('random-hex');
    displayRandomRGB.innerHTML = `(${color})`;
    displayRandomHex = 'something';
}

// function to generate random number
function generateColor () {
    let rRed = Math.floor(Math.random() * 256);
    let rGreen = Math.floor(Math.random() * 256);
    let rBlue = Math.floor(Math.random() * 256);
    let rColor = `${rRed}, ${rGreen}, ${rBlue}`; 
    return rColor;
}

// function to display generated color to dom
function displayColor (color) {
    let displayRandomColor = document.getElementById('random-color');
    displayRandomColor.style.background = `rgb(${color})`;
}