# Backend

Realizado en Express + Node.js

## Objetivo

- Crear server.js
- Crear app.js
- Carpetas
  - public
  - src
    - [models]
    - controllers
    - views
    - routes
    - middlewares
    - errors

## Pasos a seguir

1. Instalar Node: `npm init`
2. Instalamos TypeScript: `npm install typescript --save-dev`
3. Instalamos Eslint: `npm init @eslint/config@latest`
4. Instalamos Express y sus tipos:
   1. Dev: `npm i -D express`
   2. Types: `npm i -D @types/express`
5. Instalamos el fichero tsconfig: `npx tsc --init`
6. Creamos el fichero src para la configuración del archivo tsconfig.
7. También creamos public para guardar las imágenes que recibirá la API.
8. También instalamos los tipos de node: `npm i -D @types/node`
9. Instalamos Zod para la creación de los esquemas: `npm install zod`
10. Instalamos cors y sus tipos para evitar bloqueo de las peticiones: `npm i cors` / `npm i -D @types/cors`
11. Instalamos cross-env para el manejo de las variables de entorno: `npm i cross-env`

### Dependencias adicionales

1. Prettier para el formato: `npm i -D prettier`
2. Morgan como un middleware de formateo de responses, no olvidemos instalar sus tipos: `npm i morgan` / `npm i -D @types/morgan`
3. Instalamos debug si queremos detallar el modulo que se ejecuta cuando ejecutamos el script: `npm i debug` / `npm i -D @types/debug`
