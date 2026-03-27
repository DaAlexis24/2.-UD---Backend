# Documentación: MVC (Modelo - Vista - Controlador)

Es una arquitectura de software que separa una aplicación en 3 componentes interconectados para organizar el código.

Modelo: Datos y lógica del negocio
Vista: Interfaz de Usuario
Controlador: Intermediario que gestiona las acciones del usuario y flujos

Es muy útil a la hora de realizar la programación orientada a objetos.

## Capas de Nuestro Proyecto

1. Server: Infraestructura de red. Escucha en la red
2. App: Responsable de los módulos de la aplicación. Recibe validaciones. Controla
3. Router: Discriminación de rutas/endpoints.
4. Controladores: Crea y envía las respuestas. Es la última capa donde llega el response.
5. Repositorio (Servicio/Modelo): Recibe las indicaciones del controlador. Gestiona los datos
6. Data (JSON, en nuestro caso)

## Repositorio

Es alguien que realiza las operaciones CRUD de una API

## Controladores

Suelen ser clases. Llama los métodos un repositorio y dispone de ellos como venga mejor.

## Inyección de dependencias

## Inversión de dependencias

Es un principio fundamental del desarrollo del software (SOLID). Establece que los módulos de nivel superior no depende de los niveles inferiores. En nuestro caso, los servicios no dependen de los controladores

## La importancia de la funciones

Cuando tenemos algo que hace muchas cosas a la vez, lo recomendable es envolverlo en una función.

Ahora, podemos realizar inyección de dependencias en la función. Así llevamos el controller al nivel superior (app), ya que esta es la que debe de CONTROLAR el funcionamiento de todo.

Nuestra [app](./src/app.ts) quedaría con los siguientes imports:

```ts
import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join, resolve } from 'node:path';
import { errorHandler } from './middleware/error-handler.ts';
import { customHeaders } from './middleware/customs.ts';
import notesRouter from './router/notes.ts';
import { NotesRepoJson } from './services/notes-repo-json.ts';
import { NotesController } from './controllers/notes.ts';
```

Pero acá esta el detalle que en app detallamos donde esta el fichero que recibirá la información, cuando esto podría ser una conexión o configuración del servidor

## Config / connection folder

Este folder va a gestionar el fichero que va a recibir y enseñar los datos. Es más, este dato lo podemos dar directamente al repositorio en el constructor, así la instancia que creamos en App lo hereda.

## API y Sitio Web

### Static Site Generation (SSG)

Son las páginas web estáticas hechas en HTML, CSS y JS. Se mantienen estáticos en un servidor.

Existen frameworks que te permiten hacer esto en tiempo de desarrollo, facilitando la creación de componentes y layouts, Astro es un ejemplo de ello.

### Server Side Rendering (SSR)

En respuesta a la petición de un usuario, se genera un bloque de código para ser renderizado. En este caso se cuelga del servidor. PHP fue el pionero de esta tecnología. De hecho, Node + Express también se especializa en ello.

### Client Side Rendering (CSR)

En este caso las peticiones se realizan en el lado del cliente, como podría ser una búsqueda en Google, ya que este genera el resultado de la búsqueda en base a una plantilla u otras cosas.

React, Angular, Vue son ejemplos de ello, ya que aplican los Web Components.
