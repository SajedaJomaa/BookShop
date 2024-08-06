const fs = require('node:fs/promises');

async function readData() {
  const data = await fs.readFile('books.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('books.json', JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;