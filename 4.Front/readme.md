# Frontend

## Creación de clases para la creación de componentes

```typescript
export class App {
  static #selector = 'app-root';
  static render() {
    const el = document.querySelector(App.#selector) as HTMLElement;
  }

  #element!: HTMLElement;

  constructor() {
    this.#setElement();
  }

  #setElement() {
    this.#element = document.createElement('app-root');
    console.log(this.#element);
  }
}
```

Existen 2 maneras para asegurarnos de que un elemento sea lo que deseemos, mediante una **aserción de tipos** haciendo un _narrowing_ (en este caso es la sentencia _as HTMLElement_) o realizamos una **guarda de tipos** solo si el espectro de tipos que tiene que ser tu elemento es demasiado amplio, por eso en este caso es mejor usar la aserción

## Custom Elements

Es una API que nos permite crear componentes obteniendo los selectores.
