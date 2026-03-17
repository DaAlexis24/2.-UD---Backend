# Node - Info

Node es un **entorno de ejecución** que utiliza el motor V8 de JavaScript y nos brinda un modelo de entrada y salida no bloqueante.

## Su funcionalidad

Nos permite tener un ambiente donde podemos programar e instalar dependencias de manera local.

## Características

- Es una plataforma de desarrollo
- JS en el lado del servidor
- Multiplataforma y asíncrono, ya que responde a eventos.

## ¿Para qué lo podemos usar?

- Páginas web
- Servidores
- Herramientas de desarrollo, testing y análisis

## Gestor de Versiones de Node (nvm)

Nos ayuda a la hora de poder gestionar y descargar las versiones de node que deseemos dentro de nuestro entorno de usuario. Esto es super útil a la hora de usas máquinas compartidas y tener múltiples instalaciones en la misma máquina.

### Comandos útiles

- nvm list: Nos enseña las versiones de Node que tenemos en la máquina
- nvm install <"version"> [arch]: Nos permite instalar la versión de Node que queramos. Para descargar la última versión usamos **latest** y si queremos la última que tenga soporte usamos **lts**
- nvm use: Nos permite cambiar de versión. Cuando se haga esto, se perderán las dependencias globales que se han instalado en tu versión local. Si no te deja con la terminal normal, usa administrador.

## Creación de un proyecto Node

1. Creas un directorio
2. Abres la terminal del directorio y ejecutas el siguiente comando: npm install

## CLI - Demo

En este módulo vamos a crear servidores webs, para ello debemos de conocer que Node cuenta con librerías y métodos nativos que nos ayudan a ello.

## Entornos globales

En el navegador, el entorno de mayor nivel se encuentra usando la palabra reservada **window**, es un objeto enorme, ya que nos da todas las opciones a la vez.

En el entorno local, el entorno de mayor nivel es **global**, que también es un objeto de JavaScript. Este entorno funciona como un módulo de ECMA Script, así podemos obtener los parámetros que necesitemos.

### .env.sample

Como bien sabemos, las variables de entorno que hemos definido en .env **NUNCA** suben a producción, así que para no olvidarnos de las que usamos, creamos este archivo y escribimos las variables que usamos, más no sus datos.

## ¿Qué partes tiene un programa?

- Procesos: Cosas que se ejecutan. Por ejemplo, al abrir la consola/terminal y ejecutamos un fichero usando node o algún script que tengamos en _package.json_. La palabra reservada **process** nos permite "hablar" con el proceso, y para eso nos da métodos tan útiles como _argv_ que nos devuelve lo que escribimos en la terminal.
- Fichero: Lugares donde guardamos la información

## Canales de comunicación con process

- stdout: Estándar de salida
- stderr: Estándar de errores
- stdin: Estándar de entradas

Lamentablemente, no existe un **input** en la consola de node, así que para obtener los datos de la consola realizamos algo como esto.

```javascript
process.stdout.write('Dime, como me llamo?: ');
process.stdin.on('data', (data) => {
  const name = data.toString().trim();
  process.stdout.write(`Correcto, soy ${name}`);
  process.exit(0);
});
```

Si nos damos cuenta, a la hora de obtener el dato y hacer con el lo que deseemos tenemos que iniciar un método que funciona como un **listener**, en otras palabras, estamos invocando un **evento** mediante un callback.

Este sencillo ejemplo nos enseña otra de las características principales de Node: Ser un **manejador de eventos**

### Strings en Node

Son muy útiles a la hora de recibir datos en forma de stream, da un buen efecto visual al usuario, ya que la información se va desplegando poco a poco y el usuario no tiene que esperar a que cargue la información completa

## ¿Por qué decimos que node es un entorno no bloqueante?

Ya que a la hora de tener abierto un evento, si le colocamos información después de haber declarado ese evento está se va a mostrar en consola, ignorando el la duración del evento.
Esto es útil a la hora de construir servidores webs, ya que varios usuarios pueden estar realizando peticiones en el servidor al mismo tiempo, y si estamos bloqueando las peticiones hasta que se terminen eso terminaría afectando a los demás usuarios. Así que toda la información que queramos enseñar, tiene que ser dentro del callback.

## Node Event Loop

Esto inspiro a Ryan Dahl a crear Node, ya que este concepto existe en JS desde sus orígenes.

## Qué eventos pueden bloquear los hilos de Node

Los procesos sincrónicos. Estos hacen que se lea todo el fichero hasta el final, haciendo que el usuario espere. Esto lo vemos en el ejercicio de [files](./src/05_files.ts) que usa el método **readFileSync** de la librería de Node **fs**.

Por eso lo más recomendable es usar métodos asíncronos y usarlos mediante promesas, para que este callback vaya a la cola y vuelva con los datos ya leídos.

Para ello, usamos 2 parámetros en el callback: que son error y data. Es más, gestionamos los errores primero, ya que priorizamos la programación defensiva.

El problema de esto es que se pueden generar callbacks demasiado grandes, ya que todo dato que se va a enseñar por consola tiene que estar dentro de ellos, así que se crearon las...

### Promesas

Estos están en la librería de **fs/promises**. Recordemos que es un objeto que toma determinado valor según cierto tiempo, puede ser **resolve** (obtenemos los datos) o **reject** (enseñamos el error)

Las promesas usan then y catch. De cara al servidor, nos interesa que todos los procesos sean asíncronos.

Es importante recordar que no se deben anidar promesas dentro de promesas, si no que se encadenan usando el **then()**

Un ejemplo se da en este programa para crear un fichero y añadirle datos mediante consola usando una librería adicional (promptSync)

```javascript
import promptSync from 'prompt-sync';
import { writeFile, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const __dirname = resolve('.');
const targetFile = join(__dirname, 'data', 'users.txt');

const prompt = promptSync();
const name = prompt('Dime tu nombre: ');

writeFile(targetFile, name)
  .then(() => {
    return readFile(targetFile, { encoding: 'utf-8' });
  })
  .then((data) => {
    console.log(`Se agrego el usuario ${data}`);
  })
  .catch((err: Error) => {
    console.error(err);
  });

console.log('Adios!');

```

## App para guardar datos en un archivo JSON

Ahora, en los servidores se usan archivos JSON, así que vamos a modificar este fichero para añadir datos a un fichero JSON SIN borrar el documento.

Las claves son:

1. Crear una interfaz que refleje el tipo de los objetos que tendrá el archivo JSON
2. Leer primero el archivo para guardar toda su información, así no se pierde.

## CLI con Commander para realizar un CRUD

Vamos a realizar un cli para guardar notas en un servicios, para ello tenemos que crear un modelo de datos que se acomode a lo que queramos hacer.

Esto lo vamos a guardar en una carpeta llamada **types**, ya que lo que vamos a guardar es un MODELO DE DATOS, en este caso, para notas, lo guardaremos creando un fichero llamado **_note.ts_**, ya que es una entidad.

Los datos de las notas se guardarán dentro del archivo JSON **notes.json**

### ODM

Yo lo que quiero hacer es poder manejar mis notas de manera general, en este caso, un CRUD (Create, Read, Update and Delete). Para ello tenemos que entender lo siguiente.

Esto lo podemos guardar en una interfaz llena de funciones, esta interfaz tiene que leer los datos de cierto elemento, y las funciones tienen que leer cierto elemento también.

```javascript
interface CRUD<T extends { id: unknown }> {
  readAll: () => T[];
  readById: (id: T['id']) => T;
  create: (data: Omit<T, 'id'>) => T;
  update: (id: T['id'], data: Partial<T>) => T;
  delete: (id: T['id']) => void;
}
```
