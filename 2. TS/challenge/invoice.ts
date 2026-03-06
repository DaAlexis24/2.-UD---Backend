import { Company } from './company.js';
import { Product } from './products.js';

export class Invoice {
  // Métodos estáticos porque siempre serán gestionados por la Compañia
  static #brand = new Company(
    'La Palmerita de Morata',
    'C/ Abtao 8, Madrid',
    '667788991',
    'Y8906521M',
  );
  static #lastID = 0;
  static #getID() {
    const year = new Date().getFullYear();
    const id = String(year) + '/' + String(++this.#lastID);
    return id;
  }

  // Propiedades privadas
  #id = Invoice.#getID();
  #client: Company;
  #items: { product: Product; amount: number }[];
  #iva: number;
  #total = 0;

  constructor(client: Company, product: Product, amount: number, iva = 1.21) {
    this.#items = [
      {
        product: product,
        amount: amount,
      },
    ];
    this.#iva = iva;
    this.#client = client;
  }

  get client() {
    return this.#client;
  }

  addProduct(product: Product, amount: number) {
    this.#items.push({ product, amount });
  }

  #calculatePrice(price: number) {
    this.#total += price * this.#iva;
  }

  printInvoice() {
    const invoice = `
    ==============================
    ${Invoice.#brand.name}
    NIF: ${Invoice.#brand.nif}

    Datos del Cliente:
    Nombre: ${this.#client.name}
    NIF: ${this.#client.nif}

    Factura ${this.#id}

    ${this.#items
      .map((item) => {
        const result = item.product.renderInvoiceLine(item.amount);
        this.#calculatePrice(result[1]);
        return result[0];
      })
      .join('\n')}
    ----------------------------------------------
        Total + IVA ........... ${this.#total}
    ========================================================
    `;
    return console.log(invoice);
  }
}
