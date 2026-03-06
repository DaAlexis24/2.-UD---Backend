export class Product {
  #sku: string;
  #name: string;
  #pricePerUnit: number;
  constructor(sku: string, name: string, pricePerUnit: number) {
    this.#sku = sku;
    this.#name = name;
    this.#pricePerUnit = pricePerUnit;
  }

  #calculatePrice(items: number) {
    return items * this.#pricePerUnit;
  }

  renderInvoiceLine(amount: number) {
    const result: [string, number] = ['', this.#calculatePrice(amount)];
    result[0] = `${this.#name} (${this.#sku}): ${amount} UD a ${this.#pricePerUnit}€ Total............${result[1]}€`;

    return result;
  }
}

// const p1 = new Product("BO1", "Botella", 2);
// const p2 = new Product("BO2", "Vaso", 1);
// console.log(p1.renderInvoiceLine(3));
// console.log(p2.renderInvoiceLine(15));
