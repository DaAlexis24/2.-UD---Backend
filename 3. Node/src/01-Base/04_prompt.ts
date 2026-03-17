import promptSync from 'prompt-sync';

const prompt = promptSync();
const age = prompt('Dime tu edad: ');
console.log(`Tienes ${age} años`);
console.log('Adios!');
