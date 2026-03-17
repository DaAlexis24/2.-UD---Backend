// Canales de comunicación con process
// stdout: Salida
// stderr: Errores
// stdin: Entrada

// console.log('Soy salida');
// console.error('Error!');

process.stdout.write('Estándar salida\n');
process.stderr.write('Estándar error\n');

// const handelInput =

process.stdout.write('Dime, como me llamo?: ');
process.stdin.on('data', (data) => {
  const name = data.toString().trim();
  process.stdout.write(`Correcto, soy ${name}`);
  process.exit(0);
});
console.log('Fin del programa');
