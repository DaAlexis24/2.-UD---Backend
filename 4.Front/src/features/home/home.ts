import { Counter } from './counter/counter2';

export class Home extends HTMLElement {
  static #selector = 'app-home';
  static render() {
    // Buscamos el main
    const el: HTMLElement | null = document.querySelector('main');
    if (el === null) {
      throw new Error('Main no disponible');
    }
    el.innerHTML = `<${Home.#selector}></${Home.#selector}>`;
    // Registro
    customElements.define(Home.#selector, Home);
    // Render child elements
    Counter.render();
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
            <h2>Uso de componentes y web components</h2>
            <app-counter counterId="1"></app-counter>
            <app-counter counterId="2"></app-counter>
            <app-counter counterId="3"></app-counter>
        </section>
        `;
  }

  #setElement() {
    this.innerHTML = this.#template;
  }
}
