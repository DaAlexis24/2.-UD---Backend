// 1. Paradigma OOP
// 2. Crear 2 ficheros. Un fichero para cada clase.

// Cuadrado, Rectángulo, Círculo, Triángulo

interface OperationsShapes {
  area(): number;
  perimeter(): number;
}

export class Square implements OperationsShapes {
  #a: number;
  constructor(a: number) {
    this.#a = a;
  }
  area(): number {
    return Math.pow(this.#a, 2);
  }
  perimeter(): number {
    return this.#a * 4;
  }
}

export class Rectangle implements OperationsShapes {
  #height: number;
  #base: number;
  constructor(a: number, b: number) {
    this.#height = a;
    this.#base = b;
  }
  area(): number {
    return this.#height * this.#base;
  }

  perimeter(): number {
    return this.#height * 2 + this.#base * 2;
  }
}

export class Triangle implements OperationsShapes {
  #base: number;
  #height: number;
  #sides: [number, number];

  constructor(base: number, height: number, sides: [number, number]) {
    this.#base = base;
    this.#height = height;
    this.#sides = sides;
  }

  area(): number {
    return (this.#base * this.#height) / 2;
  }

  perimeter(): number {
    return this.#sides[0] + this.#sides[1] + this.#base;
  }
}

export class Circle implements OperationsShapes {
  #radio: number;
  PI = 3.14;
  constructor(radio: number) {
    this.#radio = radio;
  }

  area(): number {
    return this.#radio * this.PI;
  }

  perimeter(): number {
    return this.#radio * 2 * this.PI;
  }
}
