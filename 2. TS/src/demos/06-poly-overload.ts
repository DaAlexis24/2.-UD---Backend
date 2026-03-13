// Overload o sobrecarga de un método

class Foo {
  //   constructor() {}

  foo(a: string): string;
  foo(a: number): number;
  foo(a: string, b: string): string | string;
  foo(a: number, b: number): number | number;

  foo(a: number | string, b?: string | number): string | number {
    if (typeof a === 'string' && typeof b === 'undefined') {
      return a;
    }
    if (typeof a === 'number' && typeof b === 'undefined') {
      return a;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a + b;
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return a * b;
    }
    return '';
  }
}

const foo = new Foo();
foo.foo(22);
foo.foo('2');
