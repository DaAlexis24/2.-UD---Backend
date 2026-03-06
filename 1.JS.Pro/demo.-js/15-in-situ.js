function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hola, soy ${this.name} y tengo ${this.age} años`);
};

// Son persones
const person1 = new Person("Martin", 23);
const person2 = new Person("Rebeca", 33);

function User(name, age, role) {
  this.role = role;
  Person.call(this, name, age);
  User.countUsers();
}
