# Films - Lógica del negocio

API de películas, géneros, reviews y usuarios (perfil)

## Organización de Relaciones

- Películas -- n:n --> géneros
- [Películas -- n:n --> usuarios]
- Películas -- 1:n --> reviews
- Usuarios -- 1:n --> reviews
- Perfil -- 1:1 --> Usuarios

## Endpoints y Grados de Protección

- [GET] /api/peliculas
- [GET] /api/peliculas/:id
- [POST] /api/peliculas (Admin/Editor)
- [PATCH] /api/peliculas/:id (Admin/Editor)
- [DELETE] /api/peliculas/:id (Admin/Editor)

- [POST] /api/auth/registro
- [POST] /api/auth/login

- [GET] /api/user/:id (Owner or Anyone)
- [PATCH] /api/user/:id (Owner)
- [DELETE] /api/user/:id (Owner/Admin)

- [GET] /api/reviews (User)
- [GET] /api/reviews/:id (User)
- [POST] /api/reviews (User)
- [PATCH] /api/reviews/:id (Owner)
- [DELETE] /api/reviews/:id (Owner/Admin)

## Stack

Prisma
