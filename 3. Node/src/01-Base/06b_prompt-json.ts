import { writeFile, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

interface FileData {
  users: string[];
}

const __dirname = resolve('.');
const targetFile = join(__dirname, 'data', 'users.json');

const handleInput = (data: string | Buffer<ArrayBuffer>) => {
  const name = data.toString().trim();
  readFile(targetFile, { encoding: 'utf-8' })
    .then((fileContent) => {
      // String a objeto
      const data = JSON.parse(fileContent) as FileData;
      // Mutar el objeto
      data.users.push(name);
      // Objeto a string
      return JSON.stringify(data);
    })
    .then((fileContent) => writeFile(targetFile, fileContent))
    .then(() => {
      console.log(`Se agrego el usuario ${name} dentro del file`);
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error(err.message);
      process.exit(1);
    });
};

process.stdout.write('Dime, como me llamo?: ');
process.stdin.on('data', handleInput);
