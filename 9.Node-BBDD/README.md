# Node + Bases de Datos

Vamos a crear un proyecto donde vamos a conectarnos a una base de datos hecha con PostgreSQL, utilizando la librería **pg** y así conocemos una nueva forma para crear y organizar un servidor.

- [PG Documentación](https://node-postgres.com/)

## Organización del proyecto inicial

```blocked
├── data/
│   ├── movies.pg.sql       # Mock Database
├── src/                    # Directorio principal
│   ├── config/             # Archivos configuración
│   │   ├── db-connection.ts
│   │   ├── env.ts
│   ├── errors/             # Objetos Error
│   │   ├── sql-errors.ts
│   ├── entities/           # Interfaces de las tablas de la DB
│   │   ├── genre.ts
│   ├── repo/               # Ficheros que manejaran el CRUD
│   └── index.ts            # Fichero ejecutable
├── .env                    # Variables de entorno
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

### Sentencias preparadas

Se sustituyen las llamadas a variables por un placeholder, para evitar las SQL Injection, para ello saneamos el parámetro comparándolo con lo que debería recibir la query con unos $.

```ts
const id = 1;
const limit = 10;
const { rows } = await pool.query<Genre>(
  'SELECT genre_id as id, name FROM GENRES WHERE genre_id = $1 LIMIT $2;',
  [id, limit],
);

// En este caso, el $1 se va a reemplazar con el primer parámetro que le damos (id) y el $2 con el segundo parámetro (limit)
```

> [!IMPORTANT]
>
> Es crucial recordar que no se deben utilizar template strings a la hora de realizar queries, para evitar la tan peligrosa SQL Injection

## Repository Genres

Para manejar las operaciones CRUD de una mejor manera creamos una nueva capa en el proyecto, en este caso sera Repo

Acá crearemos los archivos correspondientes según la tabla en donde queramos realizar las pruebas.

Es más las pruebas las podemos realizar dentro de la misma capa, usando archivos `.test`
