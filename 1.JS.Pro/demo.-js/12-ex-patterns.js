// Patrones de ejecución

const foo = function () {
  console.log("Soy foo");
  console.log("this:", this);
};

const fooArrow = () => {
  console.log("Soy fooArrow");
  console.log("this:", this);
};

// Function pattern

foo();
fooArrow();
//console.log(globalThis);

// Method pattern

const obj1 = {
  title: "Soy obj1",
  foo: foo,
  fooArrow: fooArrow,
};

obj1.foo();
obj1.fooArrow();

// Constructor pattern

const nObj = new foo();
console.log(nObj);

// error new fooArrow();

const obj2 = {
  greet() {
    console.log("Soy obj2", this);
  },
  greetArrow: () => {
    console.log("Soy obj2", this);
  },
};

// foo.apply(obj2);
// fooArrow.apply(obj2);

obj2.greet();
obj2.greetArrow();

// Apply pattern

const obj3 = {
  title: "Soy obj3",
};

foo.apply(obj3);
fooArrow.apply(obj3);
