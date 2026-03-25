# Documentación: Express

Es el framework de Node por preferencia para la mayoría de creación de servidores web. Te permite realizar distintos tipos de arquitecturas según lo que se requiera, por eso suele ser algo complejo pero es muy útil a la hora de aprender.

## Objetivos

- Construir una arquitectura con capas
- Usar MVC de manera correcta.

## Propiedades de Express

- Nos permite discriminar respuestas al servidor, esto mediante sus variables nativas como **app**
- Es declarativo, ya que express cuenta con los métodos de CRUD ya definidos, y con ello las respuestas son más sencillas de entender

## La importancia de Debug

Nos permite verificar cuando un archivo carga de una manera más visual, esto es importante en una arquitectura en capas.

## Separación de capas en Express

Podemos usar Node para gestionar las comunicaciones con los host, y Express, de esta manera separamos el trabajo y lo podemos gestionar de una mejor manera. Para ello usaremos la función **createServer** de Node para el servidor y creamos dos ficheros: App para Express y Server con Node.

Esto es para asemejarnos a la arquitectura que siempre ha hecho la web.

## Métodos CRUD en Express

Lo bueno de Express es que nos brinda las 5 operaciones CRUD como métodos nativos.

```ts
app.get('ruta', función);
app.post('ruta', función);
app.put('ruta', función);
app.patch('ruta', función);
app.delete('ruta', función);
```

### app.use()

Nos permite usar una función o un handler que se puede cargar en una ruta concreta, aunque nos sirve más para los middlewares.

## Middlewares en Express

Es una función que colocamos para comprobar y realizar validaciones antes de ejecutar las rutas que queramos analizar.

Cuenta con 3 parámetros: Request, Response y Next. Si no pasa las validaciones de response y request, no se ejecuta el parámetro Next, y por ende el servidor se queda colgado.

Next suele estar vacío ya que nos permite saltar al siguiente middleware, pero si le colocamos un parámetro (por ejemplo 'Error') saltará al siguiente que cumpla con este parámetro.

Los middlewares se leen según el orden que le des en tu fichero. Ya que la aplicación para cuando la petición hace _match_ con el método que vamos a utilizar

Son High Order Function que se retornan por si mismos, ya que así les podemos pasar parámetros y lo podemos modificar mejor en el app.use

> En general, son considerados como una capa de software que esta entre la petición y la respuesta

### Errores

Cuando el middleware acepta 4 parámetros, suele ser un manejador de errores. Por convenio, siempre se tiene que declarar los errores al inicio, ya que es una metodología que impulsa Node **errors first**, para así no olvidarnos de ellos y gestionarlos de manera adecuada.

```ts
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  res.statusCode = 500;
  res.send(error.message);
};
```

### Loggers en Express

- [Morgan](https://www.npmjs.com/package/morgan)
- [Winston](https://www.npmjs.com/package/winston)
- [Pino](https://www.npmjs.com/package/pino)

### Seguridad en el Servidor

- [Helmet](https://www.npmjs.com/package/helmet)

### Middlewares Nativos de Express

- JSON: Nos devuelve un JSON parseado.
- Urlencoded: Esto sirve para codificar las URL y las query params. Tiene varias condiciones
- Static: Cada vez que el servidor haga una petición, va a jalar los ficheros que estén en la carpeta public, generalmente.

## CORS

Cross Origin Resource Sharing. Si yo he realizado un servidor exclusivo sin contemplar CORS y un frontend externo intenta conectarse a él dará como resultado un **CORS Error**. Si queremos crear una API pública, este concepto es vital.

Para evitar ello tenemos librerías como [CORS](https://www.npmjs.com/package/cors) para usarlas como una dependencia final.

Al ser un middleware, le podemos dar parámetros para configurar los requerimientos que necesita una ruta para acceder a nuestro backend.

## Gestión de Errores en un servidor Express

Creamos una carpeta llamada **errors** para poder crear ficheros que nos permita gestionar nuestros errores. Estas suelen ser clases que heredan de la clase nativa Error.

Tenemos que conocer correctamente todos los errores de la web, para así poder elegir el correcto en cada caso

## Eventos del servidor

Levantamos un servidor en Node usando la función **createServer** del módulo nativo de Node **node:http**. Este tiene dos propiedades importantes:

- listen: Oye los puertos para levantar el servidor.
- on: Permite levantar el servidor en una dirección y también recibe handlers.

## Routes de Express

Es una función nativa de Express que nos devuelve un objeto con muchas propiedades para enrutar y controlar los endpoints de la API que estamos creando.

## Validación

Nos sirve para poder determinar que los datos y o entidades que recibo sean los correctos.

Contamos con múltiples librerías, pero vamos a decantarnos por [Zod](https://www.npmjs.com/package/zod). Al ser hecho en TS, no necesitamos instalarle tipos aparte.

### Zod

Librería super útil con la cual definimos esquemas para poder controlar los datos que nos ingresan. Se hacer de la siguiente manera:

```ts
import * as z from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  DEBUG: z.string(),
});
```

Para realizar validaciones usamos el método **parse** para realizar un try/catch, y de esa manera manejamos los errores.

```ts
// Objeto a validar
const x = {};

try {
  const r = EnvSchema.parse(x); // throw Error
  console.log(r);
} catch (error) {
  console.log(error as ZodError);
}
```

> También contamos con el método **safeParse**, la diferencia es que no dispara errores, si no que si el objeto a analizar no se adecúa al esquema, lo convierte en undefined: `EnvSchema.safeParse(x);`

Podemos generar tipos desde Zod usando el método infer, de esta manera agilizamos la codificación si requerimos crear un tipo en base de nuestra validación

```ts
export type Env = z.infer<typeof EnvSchema>;
```

## Mejoras en la App

Nuevas carpetas:

- Data: Donde guardamos el o los ficheros que recogerá u otorgará la información a la aplicación
- Types: Tipos orientados a la programación de la aplicación
- Schemas/Models/Entities: Tipos orientados a la lógica empresarial
- Services: Procesos orientados a ejecutar la lógica empresarial

### Services