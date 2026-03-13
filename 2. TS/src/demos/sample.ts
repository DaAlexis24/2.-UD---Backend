/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

// Inferencia de tipos
// Chequeo de tipos

// Declaración const / let
let x = 22;
// @ts-expect-error El tipo 'string' no se puede asignar al tipo 'number'
x = 'Pepe';

// Tipo inferido es any
let z;
z = 22;
z = 'Pepe';

// Tipos fuertes (strong) => no hay coerción
{
  let x = 22;
  let y = '22';

  const r = x / Number(y);
  console.log({ r });
}

// let v. const: const y tipos literales
{
  const x = 'Pepe';
  // x = 'Juan'; ERROR DE JS
}

// let y tipos literales as const

{
  let x: 'Pepe' = 'Pepe';
  // x = 'Juan'; // Error de TS
  console.log(x);

  let state: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  state = 'loading';

  let id: string | number = 12;
  id = '12';
}

// conversión / casting / aserción de tipos

{
  function foo() {
    const z1 = document.querySelector('#button1') as HTMLButtonElement;
    const z2 = document.querySelector('h1') as unknown as number;

    z1.addEventListener('click', (event) => {
      const element = event.target as HTMLButtonElement;
      element.disabled = false;
    });
  }
}

// Anotación de tipo --> : tipo
{
  let z: number;
  z = 22;
  // z = 'Pepe'; Error de TS
}

// Declaración const / let NO SE ANOTA
{
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  let x: number = 22; // SOBRA number
}

// Anotamos los parámetros

function add(a: number, b = 0) {
  const r = a + b;
  return r;
}

const s = (a: number, b: number): number => a - b;

add(2);

// Objetos Arrays y Tuplas

const user1 = {
  name: 'Pepe',
  age: 23,
};

const user: {
  readonly name: string;
  age: number;
  job?: string;
} = {
  name: 'Pepe',
  age: 23,
};

user.age = 24;
user.job = 'Developer';
delete user.job;

// Objeto inmutable
// const: Una variable que no se puede reasignar
{
  const config = {
    API_URL: 'http://sdfdsfd.es/api',
    API_KEY: '39io67420AS',
  } as const;
  Object.freeze(config);

  // config.API_KEY = '67';
  // config.API_URL = 'faah';

  const user: {
    readonly id: string;
    name: string;
    age: number;
  } = {
    id: 'A13232',
    name: 'Pepe',
    age: 23,
  };
}

// Propiedades opcionales
{
  user.job = 'developer';
  delete user.job;

  if (user.job) {
    console.log(`Trabajo de ${user.job}`);
  } else {
    console.log(`Ahora no trabajo`);
  }

  // Parámetros opcionales
  // Narrowing: restricción del tipo
  const foo = (a?: string): string => {
    if (!a) return 'Todo bien';
    const r = a.toLocaleLowerCase();
    console.log(r);
    return r;

    // if (a) {
    //     console.log(a.toLocaleLowerCase());
    // }
  };

  foo();
}

// Arrays
{
  const data = [1, 2, 3];
  data.push(23);
  // data.push('Pepa') //Error de tipo

  const foo = (data: number[]) => {
    data.map((item): number => item * item);
  };

  // No se usa
  // const foo2 = (data: Array<number>) => {
  //     data.map((item) => item * item);
  // };
}
{
  const numbers: number[] = [];
  numbers.push(12);
}

{
  const t: (number | string)[] = [1, 2];
  t.push('Luis');
}
// Tupla
{
  const t1: [string, number] = ['Pepe', 2];
  const t2: readonly [string, number] = ['Juan', 4];

  t1[1] = 5;

  t1.push('Pepe');
  console.log(t1.length);
}
// Firmas de indice
{
  // const user: {
  //     name: string;
  //     age: number;
  // } = {
  //     name: 'Pepe',
  //     age: 23,
  // };
  // user.age = 24;
  // for (const key in user) {
  //     const element = user[key];
  // }
  // as { [key: string]: string | number }
}
{
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const user: { [key: string]: string | number | boolean } = {
    name: 'Pepe',
    age: 23,
    hasJob: true,
  };

  user.algo = '';

  const p = 'score';
  console.log(user[p]);

  for (const key in user) {
    const element = user[key];
  }
}
// Union de tipos
{
  let id: string | number;
  id = 12;
  id = 'KO923';

  const fooString = (a: string) => {};
  const fooNumber = (a: number) => {};

  let x: string | number = 0;
  // Error fooString(x)
  // Error fooNumber(x)

  const foo = (a: string | number) => {
    if (typeof a === 'string') {
      a.slice();
    } else {
      a.toPrecision();
    }
  };

  foo(x);
}
// Union de tipos literales
{
  let state: 'Idle' | 'Success' | 'Error';
  state = 'Success';
  state = 'Error';
}

// Uniones discriminadas
{
  type Success = { status: 'success'; data: string[] };
  type Fail = { status: 'error'; error: Error };

  const foo = (a: Success | Fail) => {
    if (a.status === 'success') {
      a.data.length;
    } else if (a.status === 'error') {
      a.error.message;
    } else {
      console.log('No se como estoy aquí');
    }
  };
}

// Tipos intersection
{
  let c: (1 | 2 | 3) & (2 | 4 | 6);
  c = 2;
}
{
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/no-explicit-any
  let x: { [key: string]: any };
  x = { a: 12 };
  x.b = null;
  x.c = [];
}
{
  let c: { id: number } & { name: string };
  c = { id: 12, name: 'Pepe' };
}
// Tipos propios
// Alias v. Interface
