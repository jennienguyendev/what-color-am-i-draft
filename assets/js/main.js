// -- target random color div
let randomColor = document.getElementById('random-color');

// -- generate a random number and * 255
let rRed = Math.floor(Math.random() * 256);
let rGreen = Math.floor(Math.random() * 256);
let rBlue = Math.floor(Math.random() * 256);
let rRGB = `rgb(${rRed}, ${rGreen}, ${rBlue})`;
randomColor.style.background = rRGB;

// call changeColor when slider is used
document.getElementById('range-red').addEventListener('input', changeColor);
document.getElementById('range-green').addEventListener('input', changeColor);
document.getElementById('range-blue').addEventListener('input', changeColor);

// function to change color using vals from slider
function changeColor () {
    // select each slider
    let red = document.getElementById('range-red').value;
    let green = document.getElementById('range-green').value;
    let blue = document.getElementById('range-blue').value;

    // construct rgb() value for bg
    let color = `rgb(${red}, ${green}, ${blue})`;

    // select where to print each color
    let printRed = document.getElementById('print-red');
    let printGreen = document.getElementById('print-green');
    let printBlue = document.getElementById('print-blue');

    // print color value to dom
    printRed.innerHTML = red;
    printGreen.innerHTML = green;
    printBlue.innerHTML = blue;
    
    // update guessed color
    let guessedColor = document.getElementById('guessed-color');
    guessedColor.style.background = color;
}

