// import './footer.css'

export class Counter {
    // Propiedades y métodos estáticos
    static selector = 'app-counter';
    static render() {
        document.querySelectorAll(Counter.selector).forEach((el) => {
            const f = new Counter();
            el.appendChild(f.element);
        });
    }

    // Propiedades y métodos de instancia
    template!: string;
    element!: HTMLElement;
    counter = 0;

    constructor() {
        this.setTemplate();
        this.setElement();
        console.log('loading counter');
    }

    setTemplate(): void {
        // Devolver siempre un solo elemento
        this.template = /*html*/ `
         <div class="counter">
             <h3>Counter</h3>
             <button>Click: ${this.counter}</button>
         </div>
         `;
    }

    setElement(): void {
        // Convertimos el template en elemento
        const parentElement = document.createElement('parent');
        console.log(typeof this.template, this.template);
        parentElement.innerHTML = this.template;
        if (parentElement.children.length > 1) {
            throw new Error('Componente incorrecto...');
        }
        this.element = parentElement.firstElementChild as HTMLElement;

        this.element.querySelector('button')?.addEventListener('click', () => {
            const parent = this.element.parentElement as HTMLElement;
            this.counter++;
            this.setTemplate();
            this.setElement();
            parent.replaceChild(
                this.element,
                parent.firstElementChild as HTMLElement,
            );
        });
    }
}
