import fs from 'fs/promises';

// Sync version
// const contents = fs.readFileSync('./data.json', 'utf8');
// console.log(contents);

// Callback version
// fs.readFile('./data.json', 'utf8', (err, data) => {
//     if(err) {
//         console.error(err);
//         process.exit(1);
//     }
//     console.log(data);
// });

// Async version
try {
  const data = await fs.readFile('./src/data.json', 'utf8');
  console.log(data);
} catch (error) {
  console.log(error);
  process.exit(1);
}
