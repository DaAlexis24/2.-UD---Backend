# Apuntes

## Enum vs Model

En algunas ocasiones podemos preferir construir un enunciado en vez de un modelo en nuestro esquema, pero existen ciertas diferencias que debemos conocer.

Lo bueno de los enunciados es que podemos ahorrarnos definir una tabla que no tenga tanta relevancia dentro de nuestra base de datos, puede ser por el tipo de información que nos otorga o la cantidad, eso depende de tu diseño y si son valores que no quieres modificar en tiempo de uso. Un ejemplo podrían ser los géneros de una persona, no sería lógico permitirle al cliente modificar ese dato, si no que ya venga por defecto.

En cambio, los modelos son útiles cuando queremos obtener datos en tiempo de uso, por ejemplo, si la empresa añade una nueva sede sería útil permitir que la tabla **sedes** pueda obtener nueva información.

## Primeros Pasos - Schema Prisma

Creamos los modelos para generar la base de datos que vamos a utilizar. Esto lo realizamos usando la palabra reservada **model** dentro de nuestro esquema.

> Herramienta para obtener esquemas de Zod: [Prisma to Zod Converter](https://rapidtoolset.com/en/tool/prisma-to-zod-converter)

## Obtenemos

Un cliente que nos ayudará con el desarrollo y una migración para nuestra base de datos.

## Secuencia de implementación

- Entidades
- Repositorios
- Controladores
- Routers
- Integración en la App, esta instancia las demás partes anteriores.

## Guía

### Autenticaciones

En este caso empezaremos por la tabla **users**, vamos a crear su repositorio correspondiente, ya que las entidades ya han sido creadas por Prisma. El repositorio es una clase, en este caso le añadiremos los métodos login y register.

> Como hemos generado el Client de Prisma, este tendrá múltiples tipos que nos ayudarán a la hora de tipar las variables que utilizaremos en el repositorio

Hay que recordar no devolver datos sensibles, como las contraseñas. En este caso Prisma nos permite **omitir** el retorno de los datos que queramos, esto con la palabra registrada _omit_.

#### Hash Password

Esto es crucial para la seguridad del manejo de los datos, ya que encriptamos los datos sensibles para evitar robos de data o reducir su impacto.

Para ello vamos a utilizar la librería [Bcryptjs](https://www.npmjs.com/package/bcryptjs) que nos permitirá codificar nuestras contraseñas.

### Services

Será el folder donde vamos a guardar todas las funciones y/o clases que nos permitirán autenticar y proteger nuestros datos.

Acá vamos a crear el fichero de autenticación, donde vamos a hashear mediante promesas un texto, que dará vueltas la mayor cantidad de veces posible. Esto lo usaremos en el repositorio para proteger la contraseña que nos da el usuario en el método **register**.

También crearemos un método para comparar las contraseñas que nos llegarán desde el lado del cliente con las que están encriptadas en la base de datos.
