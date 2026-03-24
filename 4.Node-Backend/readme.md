# Node Backend

Un backend de node (server) se crea con la función createServer()

## Middleware

Es una especie de puente entre 2 estructuras de software para poderlas controlar y hacer comprobaciones, se pueden colocar todos los elementos que queramos para generar todas las etapas que necesitemos.

Por ejemplo, en el caso de [index-final](./src/index-final.ts) tenemos uno para poder cargar los archivos estáticos en el html del backend, si no existen se termina el proceso sin afectar los datos del html.

## Logger

Es muy útil para el terminal del backend, ya que este nos permitirá verificar de una mejor forma las respuestas y peticiones que hace el servidor.

Normalmente utilizamos la librería [debug](https://www.npmjs.com/package/debug) para poder realizar esto, lo instalamos y lo definimos dentro del fichero que queremos controlar.

## Llamadas a la API

POST tiene un body, y GET no

Nosotros buscamos crear una API para poder acceder a sus datos y realizar un CRUD con ellos.

## Express

Es el framework de Node por preferencia para la mayoría de creación de servidores web. Te permite realizar distintos tipos de arquitecturas según lo que se requiera, por eso suele ser algo complejo pero es muy útil a la hora de aprender.
