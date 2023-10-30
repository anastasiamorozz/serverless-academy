const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput() {
  rl.question('Enter a few words or numbers: ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Exit');
      rl.close();
    } else {
      showMenu(input);
    }
  });
}

function showMenu(input) {
  console.log('Menu');
  console.log('1. Sort words alphabetically');
  console.log('2. Show numbers from lesser to greater');
  console.log('3. Show numbers from bigger to smaller');
  console.log('4. Display words in ascending order by number of letters in the word');
  console.log('5. Show only unique words');

  rl.question('Select (1-5) and press ENTER: ', (choice) => {
    switch (choice) {
      case '1':
        console.log(alphabeticallySort(input));
        getUserInput();
        break;
      case '2':
        console.log(fromLesserToGreater(input));
        getUserInput();
        break;
      case '3':
        console.log(fromBiggerToSmaller(input));
        getUserInput();
        break;
      case '4':
        console.log(sortByLetters(input));
        getUserInput();
        break;
      case '5':
        console.log(findUniqueWords(input));
        getUserInput();
        break;
      case 'exit':
        console.log('Exit');
        rl.close();
        break;
      default:
        console.log('Invalid choose. Try again!');
        showMenu();
        break;
    }
  });
}

function wordOrNumber(input){
  const words = input.split(' ');
  const numbers = [];
  const nonNumbers = [];

  words.forEach((word) => {
    if (!isNaN(word)) {
      numbers.push(word);
    } else {
      nonNumbers.push(word);
    }
  });
  return { nonNumbers: nonNumbers, numbers: numbers };
}

function alphabeticallySort(input) {
  let nonNumbers = wordOrNumber(input).nonNumbers;
  //Bubble sort
  for (let i = 0; i < nonNumbers.length - 1; i++) {
    for (let j = 0; j < nonNumbers.length - i - 1; j++) {
      if (nonNumbers[j] > nonNumbers[j + 1]) {
        const temp = nonNumbers[j];
        nonNumbers[j] = nonNumbers[j + 1];
        nonNumbers[j + 1] = temp;
      }
    }
  }
  return nonNumbers;
}

function fromLesserToGreater(input){
  let numbers = wordOrNumber(input).numbers;
  for(let i = 0; i<numbers.length - 1; i++){
    for(let j=0; j<numbers.length - i - 1; j++){
      if(numbers[j]>numbers[j+1]){
        const temp = numbers[j];
        numbers[j] = numbers[j+1];
        numbers[j+1] = temp;
      }
    }
  }
  return numbers;
}

function fromBiggerToSmaller(input){
  let numbers = wordOrNumber(input).numbers;
  for(let i = 0; i<numbers.length - 1; i++){
    for(let j=0; j<numbers.length - i - 1; j++){
      if(numbers[j]<numbers[j+1]){
        const temp = numbers[j];
        numbers[j] = numbers[j+1];
        numbers[j+1] = temp;
      }
    }
  }
  return numbers;
}

function sortByLetters(input){
  let nonNumbers = wordOrNumber(input).nonNumbers;
  for (let i = 0; i < nonNumbers.length - 1; i++) {
    for (let j = 0; j < nonNumbers.length - i - 1; j++) {
      if (nonNumbers[j].length > nonNumbers[j + 1].length) {
        const temp = nonNumbers[j];
        nonNumbers[j] = nonNumbers[j + 1];
        nonNumbers[j + 1] = temp;
      }
    }
  }
  return nonNumbers;
}

function findUniqueWords(input) {
  const nonNumbers = wordOrNumber(input).nonNumbers;
  const uniqueWords = new Set();

  nonNumbers.forEach((word) => {
    uniqueWords.add(word);
  });

  const uniqueWordsArray = [...uniqueWords];
  return uniqueWordsArray;
}

getUserInput();
