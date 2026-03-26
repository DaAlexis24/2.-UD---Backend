# Documentación: MVC (Modelo - Vista - Controlador)

Es una arquitectura de software que separa una aplicación en 3 componentes interconectados para organizar el código.

Modelo: Datos y lógica del negocio
Vista: Interfaz de Usuario
Controlador: Intermediario que gestiona las acciones del usuario y flujos

Es muy útil a la hora de realizar la programación orientada a objetos.

## Repositorio

Es alguien que realiza las operaciones CRUD de una API

## Controladores

Suelen ser clases. Llama los métodos un repositorio y dispone de ellos como venga mejor.

## Inyección de dependencias

## Inversión de dependencias

Es un principio fundamental del desarrollo del software (SOLID). Establece que los módulos de nivel superior no depende de los niveles inferiores. En nuestro caso, los servicios no dependen de los controladores

## Capas de Nuestro Proyecto

1. Server: Infraestructura de red. Escucha en la red
2. App: Responsable de los módulos de la aplicación. Recibe validaciones. Controla
3. Router: Discriminación de rutas/endpoints.
4. Controladores: Crea y envía las respuestas. Es la última capa donde llega el response.
5. Repositorio (Servicio/Modelo): Recibe las indicaciones del controlador. Gestiona los datos
6. Data (JSON, en nuestro caso)
