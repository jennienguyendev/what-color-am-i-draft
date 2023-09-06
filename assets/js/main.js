// generate a color and store result
let randomColor = generateColor();
let currentColor = '';

//  display color square after dom loaded
document.addEventListener('DOMContentLoaded', displayColor(randomColor));

// add eventListener to sliders
document.getElementById('range-red').addEventListener('input', changeColor);
document.getElementById('range-green').addEventListener('input', changeColor);
document.getElementById('range-blue').addEventListener('input', changeColor);

// call triggerDisplay when button is clicked
let button = document.getElementById('submit');
button.addEventListener('click', triggerDisplay);

// generate new color when play again
let newGame = document.getElementById('reset');
newGame.addEventListener('click', clearResult);

// function to hide result when play again
function clearResult () {
    let displayContainer = document.getElementById('random-result');
    let displayGuessed = document.getElementById('guessed-result');
    let clearGuessedRGB = document.getElementById('guessed-rgb');
    let clearGuessedHex = document.getElementById('guessed-hex');
    clearGuessedHex.innerHTML = '';
    clearGuessedRGB.innerHTML = '';  
    randomColor = generateColor();
    displayColor(randomColor);
    displayContainer.style.display = 'none';
    displayGuessed.style.display = 'block';
}

// function used to call displayResult
// no parameters, to avoid executing before clicked 
function triggerDisplay () {
    displayResult(randomColor);    
}

// function to display result after submit
function displayResult (color) {
    let displayContainer = document.getElementById('random-result');
    let displayRandomRGB = document.getElementById('random-rgb');
    let displayRandomHex = document.getElementById('random-hex');
    displayRandomRGB.innerHTML = `(${color})`;
    displayRandomHex.innerHTML = `${rgbToHex(color).toUpperCase()}`;
    displayContainer.style.display = 'block';
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

// function to change slider color
function changeColor () {
    let red = document.getElementById('range-red').value;
    let green = document.getElementById('range-green').value;
    let blue = document.getElementById('range-blue').value;
    let color = `${red}, ${green}, ${blue}`;
    let printColor = document.getElementById('guessed-color');
    printColor.style.background = `rgba(${color})`;
    let guessedRGB = document.getElementById('guessed-rgb');
    let guessedHex = document.getElementById('guessed-hex');
    guessedRGB.innerHTML = `(${color})`;
    guessedHex.innerHTML = `${rgbToHex(color).toUpperCase()}`;
}




// function to convert from num to hex
function toHex (val) {
    const hex = Number(val).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

// function to convert all 3 vals to hex
function rgbToHex (color) {
    let str = color.split(', ');
    return `#${toHex(str[0])}${toHex(str[1])}${toHex(str[2])}`;
}