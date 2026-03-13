# TypeScript

En este módulo vamos a aprender como trabajar con Typescript en un proyecto backend.

Normalmente los proyectos cuentan con múltiples **dependencias** cuentan con 3 ficheros principales:

- Node_Modules: Contiene la información de todas las dependencias
- Código fuente: Donde está todo el código de la aplicación. Suele estar en una carpeta **src**
- Código final: Es donde esta el proyecto comprimido para poderlo lanzar a producción. Suele estar en una carpeta llamada **dist**, **build**, etc.

También contamos con distintos archivos de configuración según el proyecto que queramos realizar

## Diferencias entre las dependencias

Las dependencias finales solo se usan para que el proyecto funcione, en cambio las dependencias de desarrollo solo se usan a la hora de programar y que no se necesitan en compilación. Por ejemplo los frameworks suelen ser dependencias finales y las librerías suelen ser dependencias de desarrollo.

## Narrowing

Es cuando inferimos los tipos de cada variable que usamos en TS

## Guards

Sirven para restringir datos y pueden ser de distintos tipos. También se pueden cambiar esos tipos según la condición que le demos.

## Firma de una función

Es importante saber que podemos darle tipado a las **funciones**. Esto funciona como un tipo de "contrato", y si no lo "cumplimos" la función no funcionará correctamente, esto es super útil a la hora de validar y fortalecer nuestras funciones, así nos cercioramos que nos devuelven el tipo de dato que queremos.

```ts
type StringUtility = (a: string) => string;

const truncate: StringUtility = (a) => {
  const z = a.length;
  let r = a;
  if (z > 10) {
    r = a.substring(1, 10) + '...';
  }
  return r;
};
```

## Implementación de una Interfaz

Las clases se "suscriben" al contrato de una interfaz, esto nos ayuda a la hora de construir objetos potentes y que tengan todo lo que necesitamos según el caso.

```ts
interface User {
  account: string;
  createAccount: () => string;
}

class Admin implements User {
  account: string;

  constructor(account: string) {
    this.account = account;
  }

  createAccount() {
    return '';
  }
}
```

> Esto también funciona con Type...

### Clases abstractas

Tienen mucho que ver con los tipado. Puede guardar métodos y firmas de métodos, no se pueden implementar y de esa manera no guardar instancias.

## Polimorfismo por herencia

Los métodos abstractos que heredan 2 o más clases y tienen una implementación distinta se les conoce como polimorfos.

> Es una mala práctica definir tus propiedades como protected. Lo mejor es crear funciones que usen tus propiedades privadas.

## Polimorfismo por Implementación

Se da cuando se heredan métodos desde una interfaz. La clase que herede métodos de una interfaz, sí o sí la tiene que implementar.

> Esta prohibido colocar propiedades privadas en una interfaz, por convenio se hacen en las clases.

### Múltiple Herencia

Recordemos de que una clase, en TS, solo puede heredar los métodos e interfaces de una sola clase. Para este tipo de "herencia múltiple" se tienen que usar **interfaces**. A esto se le conoce como **segregación de interfaces**

## Polimorfismo por Overload

Se da cuando le damos distintas definiciones a un mismo método.
