export class Product {
  #sku;
  #name;
  #pricePerUnit;
  constructor(sku, name, pricePerUnit) {
    this.#sku = sku;
    this.#name = name;
    this.#pricePerUnit = pricePerUnit;
  }

  #calculatePrice(items) {
    return items * this.#pricePerUnit;
  }

  renderInvoiceLine(amount) {
    const result = ["", this.#calculatePrice(amount)];
    result[0] = `${this.#name} (${this.#sku}): ${amount} UD a ${this.#pricePerUnit}€ Total............${result[1]}€`;

    return result;
  }
}

// const p1 = new Product("BO1", "Botella", 2);
// const p2 = new Product("BO2", "Vaso", 1);
// console.log(p1.renderInvoiceLine(3));
// console.log(p2.renderInvoiceLine(15));
