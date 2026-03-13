// Encapsula los objetos que crearemos en la clase
import { Square, Rectangle, Triangle, Circle } from './shape.ts';

const square = new Square(10);
const rectangle = new Rectangle(5, 9);
const triangle = new Triangle(10, 8, [12, 13]);
const circle = new Circle(7);

console.log(square.area());
console.log(rectangle.perimeter());
console.log(triangle.perimeter());
console.log(circle.area());
