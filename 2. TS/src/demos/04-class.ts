/*eslint-disable*/
class User {
  static usersNumber = 0;
  static countUsers() {
    User.usersNumber++;
  }
  static {
    console.log('Load class USER');
  }

  #name: string;
  private _age: number;
  pets?: string[];

  constructor(name: string, age: number, pets: string[] = []) {
    this.#name = name;
    this._age = age;
    this.pets = pets;
    User.countUsers();
  }

  get name() {
    return this.#name;
  }
}

{
  // Firma de una función

  let fu: (a: string) => string;

  fu = (a: string) => {
    const z = a.length;
    let r = a;
    if (z > 10) {
      r = a.substring(1, 10) + '...';
    }
    return r;
  };

  type StringUtility = (a: string) => string;

  const truncate: StringUtility = (a) => {
    const z = a.length;
    let r = a;
    if (z > 10) {
      r = a.substring(1, 10) + '...';
    }
    return r;
  };
}

{
  interface User {
    account: string;
    createAccount: () => string;
  }

  const u: User = {
    account: '',
    createAccount: function () {
      return '';
    },
  };

  class Admin implements User {
    account: string;

    constructor(account: string) {
      this.account = account;
    }

    createAccount() {
      return '';
    }
  }

  abstract class Person {
    constructor(
      public name: string,
      public age: number,
    ) {}

    abstract greet(): string;
    eat() {
      return 'Estoy comiendo';
    }
  }

  class Employee extends Person implements User {
    account: string = '';
    constructor(
      name: string,
      age: number,
      public salary: number,
    ) {
      super(name, age);
    }

    createAccount(): string {
      return '';
    }

    greet() {
      return `Hola, soy ${this.name} y tengo ${this.age} años y cobro ${this.salary}€`;
    }

    override eat(): string {
      return super.eat() + ' ......';
    }
  }

  const e1 = new Employee('Pepe', 34, 40_000);
  console.log(e1.eat());
  console.log(e1.greet());
}
