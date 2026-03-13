// Polimorfismo por herencia
abstract class Vehicle {
  #speed = 0;

  stop(): void {
    // Implementación: Es usar tus propiedades para ser modificadas o enseñar tus datos.
    this.#speed = 0;
    console.log(this.#speed);
  }

  increaseSpeed(value: number) {
    if (value < 0) return;
    this.#speed += value;
  }

  abstract move(): void;
}

class Car extends Vehicle {
  move(): void {
    // Cosas de coche
    this.increaseSpeed(10);
  }
}

class Moto extends Vehicle {
  override move(): void {
    this.increaseSpeed(20);
  }
}

const obj = new Moto();
const car = new Car();

// Polimorfos
obj.move();
car.move();

obj.stop();
car.stop();
