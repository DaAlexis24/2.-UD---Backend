const user1 = {
  userName: "Jhon",
  age: "30",
  job: "Developer",
  greet() {
    return console.log(`Hola, soy ${this.userName}`);
  },
};

const user2 = {
  userName: "Jaime",
  age: "32",
  job: "Designer",
};

const user3 = {
  userName: "Jack",
  age: "22",
  job: "Admin",
};

// Factory

function createUser(name, age, job) {
  return { name, age, job };
}

const user4 = createUser("Hugo", 27, "Data Analyst");

// Constructor

function User(name, age, job) {
  this.id = ++User.countUsers;
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayAgeBad = function () {
    console.log(`Tengo ${this.age} años`);
  };
}

User.countUsers = 0;
User.showUsersNumber = function () {
  console.log(`Vamos ${this.countUsers} usuarios creados`);
};

User.prototype.greet = function () {
  console.log(`Hola, me llamo ${this.name}`);
};

const user5 = new User("Tulio", 43, "Lawyer");
const user6 = new User("Tamara", 22, "Arquitecta");
const user7 = new User("Pamela", 23, "Backend Dev");

console.log(user1, user2, user3, user4, user5);

console.log(user7);
user5.greet();
user5.sayAgeBad();
user6.greet();

User.showUsersNumber();

const fu = function (arg) {
  if (!Array.isArray(arg)) return;
  return arg.map((item) => (isNaN(item) ? item : item * 2));
};

console.log(fu([1, "Pepe", 3]));
console.log(fu(null));
