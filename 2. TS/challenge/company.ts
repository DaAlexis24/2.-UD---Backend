export class Company {
  #name: string;
  #address: string;
  #phone: string;
  #nif: string;

  // Setters y Getters

  get name() {
    return this.#name;
  }

  get address() {
    return this.#address;
  }

  get phone() {
    return this.#phone;
  }

  get nif() {
    return this.#nif.toUpperCase();
  }

  constructor(name: string, nif: string, address = '', phone = '') {
    this.#name = name;
    this.#nif = nif;
    this.#address = address;
    this.#phone = phone;
  }
}

new Company('Pepa', 'EteSech');
