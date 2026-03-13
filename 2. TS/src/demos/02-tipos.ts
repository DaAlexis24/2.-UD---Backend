/*eslint-disable*/

type Id = string | number;

type Role = 'admin' | 'user' | 'editor';

{
  // Tipos
  type User = {
    readonly id: Id;
    readonly name: string;
    age: number;
    job?: string;
    role: Role;
  };

  const user1: User = {
    id: 1,
    name: 'Pepe',
    age: 24,
    role: 'admin',
  };
}

{
  interface User {
    readonly id: Id;
    readonly name: string;
    age: number;
    job?: string;
    role: Role;
  }

  interface Project {
    owner: User;
  }

  const user1: User = {
    id: 1,
    name: 'Luna',
    age: 24,
    role: 'editor',
  };
}

// Uniones e Intersecciones
{
  type User = {
    readonly name: string;
    age: number;
    job?: string;
  };

  type PetOwner = {
    pet: string[];
  };

  type UserWithPet = User & PetOwner;

  const user1: UserWithPet = {
    name: 'Pepe',
    age: 22,
    pet: ['Firulais'],
  };
}

{
  interface User {
    readonly name: string;
    age: number;
    job?: string;
  }

  interface PetOwner {
    pet: string[];
  }

  interface UserWithPet extends User, PetOwner {}
}

// Interfaces y clases
{
  class User {
    name: string;
    age: number;
    pets?: string[];
    constructor(name: string, age: number, pets: string[] = []) {
      this.name = name;
      this.age = age;
      this.pets = pets;
    }
  }

  let user1: User;

  user1 = new User('Pepe', 22);
  const user2 = new User('Ramiro', 23);

  let user3: User;
  //   Duck typing
  user3 = { name: 'Juan', age: 32 };
  const user4 = { name: 'Lobato', age: 33 };

  console.log(user1, user2);
  console.log(user1 instanceof User);
  console.log(user3 instanceof User);
}

