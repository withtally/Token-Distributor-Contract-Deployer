const csv = require('csv-parser');
const fs = require('fs');

async function readCSV(filepath) {

  const results = [];

  return new Promise((resolve, reject) => {

    fs.createReadStream(filepath)
      .pipe(csv({ headers: false })) // Specify headers as false, reading rows
      .on('data', (data) => {
        // debug
        // console.log(data[0], data[1])

        // push results
        results.push({
          address: data[0],
          amount: data[1],
        });
      })
      .on('end', () => {
        resolve(results);
      });

  });

}


module.exports = {
  readCSV 
}