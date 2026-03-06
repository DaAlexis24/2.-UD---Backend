# JS - PRO

## Datos y Tipos

En realidad nos interesa más saber como usar las variables y los objetos independientemente de los datos que usen o no.

Hay 2 maneras para **declararlas**:

- Declaración primero y luego asignación.
- Inicialización

En TS podemos dotar a las variables con un tipado antes de poderles asignar algún dato u objeto, esto es favorable cuando buscas que tus variables no sufran de coerción.

## Prototype

El `__proto__`es una propiedad especial de los objetos que apunta ha otro objeto. Estos acceden a ella de forma transparente.

El proto suele ser el **prototype** de la función constructora del objeto. Esto implica el **patrón prototype** para conseguir una relación entre objetos, esto se parece a las **clases** que existen en otros lenguajes.

## Funciones

Recordemos que todas las funciones son **objetos**

Las IIFE son Expresiones Funcionales que son invocadas de manera inmediata.

```js
(() => {
  console.log("Soy una IIFE");
})();
```

Los closures son las funciones que guardan las variables que solo quieres que se ejecuten dentro de la función principal, así el usuario no podrá acceder a ellas desde fuera.

Los módulos de JS son un ejemplo de ello, ya que solo ejecutan lo que tú deseas sin tener que manipular los datos que usas

## Patrones de ejecución

Cuando uno quiera un método que fije (estático) un **this** se tiene que usar arrow function. Si quieres que este se comporte de manera dinámica se usa el bind.

Esto nos indica que NO podemos crear métodos que contengan this usando una arrow function.

## Patrón Constructor

Puedo elegir cualquier objeto del mundo y crear uno nuevo usando la palabra reservada **new**

Esto funciona como una especie de _plantilla_, para crear nuevos objetos con datos distintos.

Ahora, es recomendable que los métodos sean creados de manera externa, para ahorrar memoria a la hora de desplegar la información

Para ello tenemos que usar el nombre del constructor junto con la palabra reservada `prototype` y para finalizar con el nombre del método, por ejemplo:

```js
User.prototype.greet = function () {
  console.log(`Hola, me llamo ${this.name}`);
};
```

También los constructores pueden tener propiedades o métodos estáticos, para ello solo tenemos que colocar el constructor junto con la propiedad o método que queramos añadir.

```js
// Propiedad Estática
User.countUsers = 0;

// Método estático
User.showUsersNumber = function () {
  console.log(`Vamos ${this.countUsers} usuarios creados`);
};
```

### Modelo Mental de los Objetos y sus Prototipos según el modelo de Dan Abramov

![Modelo Mental de los Objetos y sus Prototipos](/assets/mapa-objetos-prototipos.png)

Las instancias creadas en base a una función Constructora (**Person** en esta imagen) pueden acceder los métodos de su objeto padre mediante el **proto**. Es por ello que _person1_ puede acceder al método **greeting**, a pesar de que este no este definido dentro de él.

Ahora, hay que recalcar que estas instancias **NO** pueden acceder a los métodos y propiedades estáticos de sus objetos padres. Para ello tenemos que usar la siguiente sintaxis.

```js
ObjetoPadre.métodoEstático(instancia);

// Ejm basado en la imagen
Object.freeze(person1);
```

> [!WARNING]
> Podemos reescribir los Objetos padres si queremos modificarlos para que nos enseñen algo distinto en el output. Hay que usar esto con cuidado.

## Herencia

El mundo esta construido mediante jerarquías de abstracciones, en eso consiste la POO usando los constructores, mediante los protos.

Para poder obtener la herencia de otra función constructora es necesario usar el método **call**, y seleccionar las propiedades que queremos tomar de dicho constructor.
