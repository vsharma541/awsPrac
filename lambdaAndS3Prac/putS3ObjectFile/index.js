const fs = require('fs');
function generateCardNumbersAndPins(numCards) {
    const cardNumbersAndPins = [];
    for (let i = 0; i < numCards; i++) {
        const cardNumber = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16)).join('');
        const pin = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
        cardNumbersAndPins.push(`${cardNumber},${pin}`);
    }
    return cardNumbersAndPins;
}

function writeToFile(filename, cardNumbersAndPins) {
    fs.writeFileSync(filename, cardNumbersAndPins.join('\n'));
}

const numCards = 100;
const filename = 'C:/Codebases/awsPrac/lambdaAndS3Prac/readS3ObjectFileContents/cardNums.txt';
const cardNumbersAndPins = generateCardNumbersAndPins(numCards);
writeToFile(filename, cardNumbersAndPins);