interface Movible {
  move(): void;
  stop(): void;
}

class Car implements Movible {
  #speed = 0;
  move(): void {
    // Cosas de coche
  }
  stop(): void {
    this.#speed = 0;
    console.log(this.#speed);
  }
}

class Dog implements Movible {
  #speed = 0;
  move(): void {
    //
  }
  stop(): void {
    this.#speed = 0;
    console.log(this.#speed);
  }
}

const obj = new Dog();
const car = new Car();

// Polimorfos
obj.move();
car.move();
