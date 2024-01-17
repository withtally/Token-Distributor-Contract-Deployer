const fs = require('fs');
const csv = require('csv-parser');
const { EOL } = require('os');

// CSV file paths
const inputCsv = '/Users/afa/Downloads/final_odg_airdrop.csv';
const outputCsv = '/Users/afa/Downloads/final_odg_airdrop2.csv';

let writeStream = fs.createWriteStream(outputCsv);

fs.createReadStream(inputCsv)
  .pipe(csv({
    headers: false // Tell csv-parser there are no headers
  }))
  .on('data', (row) => {
    // row is now an array, access columns by indices
    let address = row[0]; // assuming the address is in the first column
    let amount = row[1]; // assuming the amount to multiply is in the second column

    // Check if amount is a valid number
    if(amount && !isNaN(amount)) {
      let modifiedValue = BigInt(Math.round(parseFloat(amount) * Math.pow(10, 18)));
      // Write the address and modified amount to the file separated by a comma
      writeStream.write(`${address},${modifiedValue.toString()}${EOL}`);
    }
  })
  .on('end', () => {
    writeStream.end();
    console.log('The CSV file was written successfully');
  })
  .on('error', (err) => {
    console.error('Error writing CSV file:', err);
  });
