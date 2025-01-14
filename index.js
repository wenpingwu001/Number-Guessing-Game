import readline from 'readline';

let level;
let startTime;
let chances;
let randomNumber;
let attempts;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const levelMap = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard',
};

const chancesMap = {
  1: 10,
  2: 5,
  3: 3,
};

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

async function gameIntro() {
  console.log('Welcome to the Number Guessing Game!');
  console.log("I'm thinking of a number between 1 and 100.");
  console.log('You have 5 chances to guess the correct number.');
  console.log('Please select the difficulty level:');
  console.log('1. Easy 10 (chances)');
  console.log('2. Medium 5 (chances)');
  console.log('3. Hard 3 (chances)');
}

async function tryAgain() {
  const answer = await anotherRound();
  if (answer === true) {
    startTime = Date.now();
    chances = chancesMap[level];
    randomNumber = generateRandomNumber();
    attempts = 0;
    console.clear();
    startGame();
  } else {
    console.log('Thank you for playing!');
  }
}
async function startGame() {
  gameIntro();
  while (true) {
    try {
      level = await getInput();
      break;
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(
    `Great! You have selected the ${levelMap[level]} difficulty level.\nLet's start the game!`
  );
  startTime = Date.now();
  chances = chancesMap[level];
  randomNumber = generateRandomNumber();
  attempts = 0;

  while (chances > 0) {
    let guess = await getRandomNumber();
    attempts++;
    if (guess === randomNumber) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      console.log(
        `Congratulations! You guessed the correct number in ${attempts} attempts.`
      );
      console.log(`Time taken: ${timeTaken / 1000} seconds`);
      await tryAgain();
    } else if (guess < randomNumber) {
      console.log(`Incorrect! You have to guess higher than ${guess}.`);
    } else {
      console.log(`Incorrect! You have to guess lower than ${guess}.`);
    }
    chances--;
    if (chances === 0) {
      await tryAgain();
    }
  }
}

async function getAnswer(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}
async function getInput() {
  let choice = await getAnswer('Enter your choice: ');
  if (levelMap[choice]) {
    return choice;
  }
  throw new Error('not a valid choice!! please choice again!!');
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

await startGame();

rl.close();
