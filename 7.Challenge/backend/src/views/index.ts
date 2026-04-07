import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class HomeView {
  private static css: string | null = null;

  private static getCSS(): string {
    if (!this.css) {
      this.css = readFileSync(join(process.cwd(), 'src/views/index.css'), {
        encoding: 'utf-8',
      });
    }
    return this.css;
  }

  static render = () => {
    const css = this.getCSS();
    const template = /*html*/ `
        <!doctype html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>${css}</style>
                <title>DS Products - Panel</title>
            </head>
            <body>
                <p>Hola</p>
            </body>
        </html>
        `;
    return template;
  };
}
