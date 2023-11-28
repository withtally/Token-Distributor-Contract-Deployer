import csv from 'csv-parser';
import fs from 'fs';

async function readCSV(filepath: string): Promise<any[]> {

  const results: any[] = [];

  return new Promise((resolve, reject) => {

    fs.createReadStream(filepath)
      .pipe(csv({ headers: false })) // Specify headers as false, reading rows
      .on('data', (data: any) => {
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


export {
  readCSV 
};
