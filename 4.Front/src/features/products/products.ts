export class ProductsPage extends HTMLElement {
  static #selector = 'app-products';
  static render() {
    // Buscamos el main
    const el: HTMLElement | null = document.querySelector('main');
    if (el === null) {
      throw new Error('Main no disponible');
    }
    el.innerHTML = `<${ProductsPage.#selector}></${ProductsPage.#selector}>`;
    // Registro
    customElements.define(ProductsPage.#selector, ProductsPage);
  }

  #template!: string;

  constructor() {
    super();
    this.#setTemplate();
    this.#setElement();
  }

  #setTemplate() {
    this.#template = /*html*/ `
        <section>
            <h2>Productos</h2>
            <p>Estamos en la página de productos</p>
        </section>
        `;
  }

  #setElement() {
    this.innerHTML = this.#template;
  }
}
