export const render = (name: string) => {
  const template = /*html*/ `
        <div>
            <p>${name}</p>
        </div>
    `;

  return template;
};

// Alternativa

// const html = (template: string, ...values) => template;
const html = String.raw;

export const render2 = (name: string) => {
  const template = html`
    <div>
      <p>${name}</p>
    </div>
  `;

  return template;
};
