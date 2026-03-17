import { userInfo } from 'node:os';

const user = process.argv[2] ?? 'Desconocido';
const env = process.env.NODE_ENV ?? 'dev';
const API_KEY = process.env.API_KEY ?? 'API_KEY not include';

console.log(`Hola ${user}, saludos de ${userInfo().username}`);
console.log(env);
console.log(API_KEY);
