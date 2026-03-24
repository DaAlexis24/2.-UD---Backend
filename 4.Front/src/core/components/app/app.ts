export class AppComponent {
  static #selector = 'app-root';
  static render() {
    const el = document.querySelector(this.#selector) as HTMLElement;
    // GUARDA DE TIPOS: if (el === null) throw new Error('Invalid Selector');
    console.dir(el);
    const newElement = new AppComponent();
    el.replaceWith(newElement.#element);
  }

  #template!: string;
  #element!: HTMLElement;

  constructor() {
    this.#setTemplate();
    this.#setElement();
  }

  #setElement() {
    this.#element = document.createElement('app-root');
    console.log(this.#element);
    this.#element.innerHTML = this.#template;
  }

  #setTemplate() {
    this.#template = `<div>Prueba</div>`;
  }
}
