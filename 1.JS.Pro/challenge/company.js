export class Company {
  #nif; //string;
  #name; // string;
  #address; // string
  #phone; // string

  // setters & getters
  get nif() {
    return this.#nif.toUpperCase();
  }
  get name() {
    return this.#name;
  }
  get address() {
    return this.#address;
  }
  get phone() {
    return this.#phone;
  }

  constructor(name, nif, address = "", phone = "") {
    this.#nif = nif;
    this.#name = name;
    this.#address = address;
    this.#phone = phone;
  }
}

// const c1 = new Company(
//   "Tesla",
//   "C/ Shabbat Shalom 55",
//   "676767676",
//   "Z8819392H",
// );

// const c2 = new Company(
//   "Mayoral",
//   "C/ Passeig de Gracia 99",
//   "678908675",
//   "Y9006684N",
// );

// console.log(c1.name);
// // c1.name = "Otro Nombre";
// console.log(c1.returnInfo());
// console.log(c2.returnInfo());
