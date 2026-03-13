/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Unión de tipos

// Uniones Discriminadas
{
  interface Success {
    status: 'success';
    data: string[];
  }
  interface Fail {
    status: 'fail';
    error: Error;
  }

  interface Load {
    status: 'loading';
    url: string;
  }

  const foo = (a: Success | Fail | Load): void => {
    if (a.status === 'success') {
      const l = a.data.length;
      console.log(l);
    } else if (a.status === 'fail') {
      const m = a.error.message;
      console.log(m);
    } else if (a.status === 'loading') {
      //
    } else {
      const never: never = a;
      console.log('Saquenme de aquí');
    }
  };
}

// Tipos Intersección
{
  let c: (1 | 2 | 3) & (4 | 5 | 2);
  // eslint-disable-next-line prefer-const
  c = 2;
}

// Objeto de propiedades desconocidas -> Record o index signature
// Esto sirve para añadir campos en objetos que tienen propiedades que son desconocidas para nosotros
{
    const o: { [key: string]: string | number | boolean } = {};
//   const o: Record<string, string | number | boolean> = {};
  o.x = 22;
}

