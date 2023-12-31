// generate a color and store result
let randomColor = generateColor();
let currentColor = '0, 0, 0';

// arrays for giphy img urls
let yes = [];
let no = [];

// default yes and no giphy img

const defaultYes = `https://media2.giphy.com/media/xuXzcHMkuwvf2/200w_d.gif?cid=fa20028a4h7vvtxfwlflew3s0s3fxftnu01gtsxxrt76tmla&ep=v1_gifs_search&rid=200w_d.gif&ct=g`;

const defaultNo = `https://media2.giphy.com/media/pq2pU6B2Ht3pu/200w_d.gif?cid=fa20028a4h7vvtxfwlflew3s0s3fxftnu01gtsxxrt76tmla&ep=v1_gifs_search&rid=200w_d.gif&ct=g`;

//  generate random offset number to get new results every time
let randomOffset = Math.floor(Math.random() * 800);

// get 50 results every time (max allowed by giphy)
const numOfResults = 50;

//  display color square after dom loaded
document.addEventListener('DOMContentLoaded', displayColor(randomColor));

// fetch imgs from giphy api
document.addEventListener('DOMContentLoaded', yesRequest());
document.addEventListener('DOMContentLoaded', noRequest());



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
    currentColor = '0, 0, 0';
    let btnSubmit = document.getElementById('submit');
    btnSubmit.disabled = false;
    let rangeRed = document.getElementById('range-red');
    let rangeGreen = document.getElementById('range-green');
    let rangeBlue = document.getElementById('range-blue');
    let guessedBg = document.getElementById('guessed-color');
    rangeRed.disabled = false;
    rangeRed.value = 0;
    rangeGreen.value = 0;
    rangeBlue.value = 0;
    rangeGreen.disabled = false;
    rangeBlue.disabled = false;
    guessedBg.style.background = '#000';
    let displayContainer = document.getElementById('random-result');
    let displayGuessed = document.getElementById('guessed-result');
    let clearGuessedRGB = document.getElementById('guessed-rgb');
    let clearGuessedHex = document.getElementById('guessed-hex');
    clearGuessedHex.innerHTML = '#000000';
    clearGuessedRGB.innerHTML = '(0, 0, 0)';  
    randomColor = generateColor();
    displayColor(randomColor);
    displayContainer.style.display = 'none';
    displayGuessed.style.display = 'block';
    let hideScores = document.getElementById('super-result');
    hideScores.style.visibility = 'hidden';
    document.getElementById('result-heading').style.display = 'none';
    document.getElementById('result-content').style.display = 'none';
    document.getElementById('giphy-img').src = '';
}

// function used to call displayResult
// no parameters, to avoid executing before clicked 
function triggerDisplay () {
    displayResult(randomColor);    
}

// function to display result after submit
function displayResult (color) {
    document.getElementById('range-red').disabled = true;
    document.getElementById('range-green').disabled = true;
    document.getElementById('range-blue').disabled = true;
    let displayContainer = document.getElementById('random-result');
    let displayRandomRGB = document.getElementById('random-rgb');
    let displayRandomHex = document.getElementById('random-hex');
    displayRandomRGB.innerHTML = `(${color})`;
    displayRandomHex.innerHTML = `${rgbToHex(color).toUpperCase()}`;
    // display giphy img container
    document.getElementById('giphy-container').style.display = 'flex';
    displayContainer.style.display = 'block';
    let hideScores = document.getElementById('super-result');
    hideScores.style.visibility = 'visible';
    let score = calc(randomColor, currentColor);
    // pass score in to display a yes or no img
    displayGiphy(Number(score));
    let printPhrase = document.getElementById('phrase');
    let phraseResult = checkScore(Number(score));
    printPhrase.innerHTML = phraseResult;
    percentColor(Number(score));
    let btnSubmit = document.getElementById('submit');
    btnSubmit.disabled = true;
    printPercent(score);
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
    currentColor = `${red}, ${green}, ${blue}`;
    let printColor = document.getElementById('guessed-color');
    printColor.style.background = `rgba(${currentColor})`;
    let guessedRGB = document.getElementById('guessed-rgb');
    let guessedHex = document.getElementById('guessed-hex');
    guessedRGB.innerHTML = `(${currentColor})`;
    guessedHex.innerHTML = `${rgbToHex(currentColor).toUpperCase()}`;
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

// function to calculate score
function calc (random, guessed) {
    let rResult = random.split(', ');
    let gResult = guessed.split(', ');
    let rDiff = Math.abs(rResult[0] - gResult[0]);
    let gDiff = Math.abs(rResult[1] - gResult[1]);
    let bDiff = Math.abs(rResult[2] - gResult[2]);

    let percentage = 100 - (((rDiff / 255) + (gDiff / 255) + (bDiff / 255)) / 3 * 100);
    return (percentage.toFixed(2));
}

// RESULTS //

// function to print percent to screen
function printPercent (percent) {
    let printPercentResult = document.getElementById('percent');
    printPercentResult.innerHTML = `${percent}%`;
}

// < 79.99
let badPhrases = [
    `You didn't fail. You just found a creative way to get a really low score.`,
    `You've set a new record for low scores. It's like you won the Olympic gold in failing.`,
    `I'm impressed. That was an epic fail.`,
    `This is madness. Totally madness.`,
    `Why did you take a detour to the Land of Failure?`,
    
];
// 80 - 90
let losePhrases = [
    `I didn't expect this from you...`,
    `How did you come up with this answer?`,
    `You "oops"-ed again...`,
    `Wow! You fumbled fabulously!`,
    `And the crowd goes "uh-oh!"`,
    `Nailed it! On second thought... not really.`,
    `It could've gone better...`,
    `There's room for improvement here.`,
];
// 90 - 94.99 
let winPhrases = [
    `You deserve a pat on the back!`,
    `You're on fire!`,
    `Umm... Was that a lucky guess? Good job though.`,
    `Well done! I can't wait to see what you accomplish next.`,
    `Way to go!`,
];

// 95 - 99.99
let betterPhrases = [
    `All hail the Champ!`,
    `Way to go, superstar!`,
    `Good job, genius!`,
    `You deserve a standing ovation!`,
    `Congratulations. Now get back to work!`,
    `Take a bow, you deserve it!`,
    `You definitely get a gold star for this one!`,
    `Are you trying to make everyone jealous? If so, it's working!`,
];
// 100
let perfectPhrases = [
    `Alright... Did you cheat?`,
];

// function to choose a random phrase
function pickAPhrase (arr) {
    let length = arr.length;
    let theChosenOne = Math.floor(Math.random() * length);
    return arr[theChosenOne];
}

// pass in score, print fail/pass phrase
function checkScore (score) {
    if (score === 100) {
        return pickAPhrase(perfectPhrases);
    }
    else if (score >= 95) {
        return pickAPhrase(betterPhrases);
    }
    else if (score >= 90) {
        return pickAPhrase(winPhrases);
    }
    else if (score >= 80) {
        return pickAPhrase(losePhrases);
    }
    return pickAPhrase(badPhrases);
}

// function to choose font color for percent
function percentColor (score) {
    let percentField = document.getElementById('percent');
    let chosenColor = '';
    if (score < 90) {
        chosenColor = `--clr-failed`;
    }
    else {
        chosenColor = `--clr-passed`;
    }
    percentField.style.color = `var(${chosenColor})`;
}

// function to display a giphy img
function displayGiphy (score) {
    // generate a random num between 0 and 49
    let imgNum = Math.floor(Math.random() * 50);
    let giphyImg = document.getElementById('giphy-img');


    document.getElementById('result-heading').style.display = 'block';
    document.getElementById('result-content').style.display = 'block';
    if (score < 90) {
        giphyImg.src = no[imgNum] || defaultNo;
    }
    else {
        giphyImg.src = yes[imgNum] || defaultYes;
    }
}

// function to hide broken img
function hideImg() {
    document.getElementById('giphy-container').style.display = 'none';
}

// ---- fetch img from giphy api ---- //

// request for 50 yes results
async function yesRequest() {
    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=H9AAVynLMVd1sQ7ZR5FrUrDkJI0DY8P1&q=amazed&limit=${numOfResults}&offset=${randomOffset}&rating=g&lang=en&bundle=low_bandwidth`);
        const data = await res.json();
        // loop through json and store urls in yes arr
        for (let i = 0; i < numOfResults; i++) {
            yes[i] = data.data[i].images.fixed_width_downsampled.url;
      }
    }
    catch(error) {
        console.log(error);
    }
}
// request for 50 no results
async function noRequest() {
    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=H9AAVynLMVd1sQ7ZR5FrUrDkJI0DY8P1&q=disappointed&limit=${numOfResults}&offset=${randomOffset}&rating=g&lang=en&bundle=low_bandwidth`);
        const data = await res.json();            
        // loop through json and store urls in no arr
        for (let i = 0; i < numOfResults; i++) {
            no[i] = data.data[i].images.fixed_width_downsampled.url;
        }
    }
    catch(error) {
        console.log(error);
    }

}