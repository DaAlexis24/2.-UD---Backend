export class AboutPage extends HTMLElement {
  static #selector = 'app-about';
  static render() {
    // Buscamos el main
    const el: HTMLElement | null = document.querySelector('main');
    if (el === null) {
      throw new Error('Main no disponible');
    }
    el.innerHTML = `<${AboutPage.#selector}></${AboutPage.#selector}>`;
    // Registro
    customElements.define(AboutPage.#selector, AboutPage);
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
            <h2>Sobre mí</h2>
            <p>Nuestra información</p>
        </section>
        `;
  }

  #setElement() {
    this.innerHTML = this.#template;
  }
}
