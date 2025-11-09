// app.js
const printName = require('./modules/name');
const add = require('./modules/adder');
const calculator = require('./modules/calculator');
const writeData = require('./modules/fileWriter');
const readData = require('./modules/fileReader');
const log = require('./modules/logger');
const countWords = require('./modules/wordCounter');
const { getTodayDate, getCurrentTime } = require('./modules/dateUtil');
const randomNumber = require('./modules/randomNumber');
const fileExists = require('./modules/fileChecker');

// Use all modules

printName();

console.log("Sum (adder module):", add(5, 3));

console.log("Calculator Operations:");
console.log("Add:", calculator.add(10, 5));
console.log("Subtract:", calculator.subtract(10, 5));
console.log("Multiply:", calculator.multiply(10, 5));
console.log("Divide:", calculator.divide(10, 5));

writeData('data.txt', 'Hello from Node.js modules!');
readData('data.txt');

log('Application started');
log('Performed math operations');

const text = "Node.js makes JavaScript powerful on the server!";
console.log(`Word Count: ${countWords(text)}`);

console.log(`Today's Date: ${getTodayDate()}`);
console.log(`Current Time: ${getCurrentTime()}`);

console.log(`Random Number (1–100): ${randomNumber(1, 100)}`);

const filename = 'data.txt';
console.log(`Does ${filename} exist?`, fileExists(filename) ? "Yes" : "No");
