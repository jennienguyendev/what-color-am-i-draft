// < 90
let losePhrases = [
    `You didn't fail. You just found a creative way to get a really low score.`,
    `You have set a new record for low scores. It's like you won the Olympic gold in failing.`,
    `Why did you take a detour to the Land of Failure?`,
    `I'm impressed. That was an epic fail.`,
    `I didn't expect this from you.`,
    `How did you come up with this?`,
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
    `Okay... Did you cheat?`,
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
        pickAPhrase(perfectPhrases);
    }
    else if (score > 95) {
        pickAPhrase(betterPhrases);
    }
    else if (score > 90) {
        pickAPhrase(winPhrases);
    }
    else {
        pickAPhrase(losePhrases);
    }
}