console.log('Welcome to the Number Guessing Game!');
console.log("I'm thinking of a number between 1 and 100.");
console.log('You have 5 chances to guess the correct number.');

console.log('Please select the difficulty level:');
console.log('1. Easy 10 (chances)');
console.log('2. Medium 5 (chances)');
console.log('3. Hard 3 (chances)');

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let levelMap = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard',
};

let chancesMap = {
  1: 10,
  2: 5,
  3: 3,
};

async function getAnswer(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, resolve);
  });
}
async function getInput() {
  const choice = await getAnswer('Enter your choice: ');
  if (levelMap[choice]) {
    return choice;
  }
  console.log('not a valid choice!! please choice again!!');
}

async function getRandomNumber() {
  const guess = await getAnswer('Enter your guess: ');
  return parseInt(guess);
}

async function anotherRound() {
  const choice = await getAnswer('Do you want to play another round? (y/n): ');
  if (choice === 'y') {
    return true;
  }
  return false;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

let level;
while (true) {
  try {
    level = await getInput();
    break;
  } catch (error) {
    console.log(error);
  }
}

console.log(
  `Great! You have selected the ${levelMap[level]} difficulty level.\nLet's start the game!`
);

let chances = chancesMap[level];
let randomNumber = generateRandomNumber();
let attempts = 0;
while (chances > 0) {
  let guess = await getRandomNumber();
  attempts++;
  if (guess === randomNumber) {
    console.log(
      `Congratulations! You guessed the correct number in ${attempts} attempts.`
    );
    break;
  } else if (guess < randomNumber) {
    console.log(`Incorrect! You have to guess higher than ${guess}.`);
  } else {
    console.log(`Incorrect! You have to guess lower than ${guess}.`);
  }
  chances--;
  if (chances === 0) {
    const answer = await anotherRound();
    if (answer === true) {
      chances = chancesMap[level];
      randomNumber = generateRandomNumber();
      attempts = 0;
    } else {
      console.log('Thank you for playing!');
      break;
    }
  }
}

rl.close();
