import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const __dirname = resolve('.');
const file = join(__dirname, 'data', 'sample.txt');

try {
  const info = await readFile(file, { encoding: 'utf-8' });
  console.log(info);
} catch (err) {
  console.error((err as NodeJS.ErrnoException).message);
}

console.log('Adios!');
