import { readFile, writeFile } from 'node:fs/promises';
import type { Product, ProductDTO } from '../models/product.ts';
import type { Repository } from '../types/repo.ts';

export class ProductsRepoJson implements Repository<Product> {
  #product: Product[] = [];
  #file: string;
  #collection: string;

  constructor(file: string, collection = 'products') {
    this.#file = file;
    this.#collection = collection;
  }

  private async load() {
    const fileContent = await readFile(this.#file, { encoding: 'utf8' });
    this.#product = JSON.parse(fileContent)[this.#collection];
  }

  private async save() {
    const fileContent = await readFile(this.#file, { encoding: 'utf8' });
    const data = JSON.parse(fileContent);
    data[this.#collection] = this.#product;
    const content = JSON.stringify(data, null, 4);
    await writeFile(this.#file, content, { encoding: 'utf8' });
  }

  async read(): Promise<Product[]> {
    await this.load();
    return [...this.#product];
  }

  async readById(id: string): Promise<Product> {
    await this.load();
    const product = this.#product.find((n) => n.id === id);
    if (!product) throw new Error(`Product with id ${id} not found`);
    return product;
  }

  async create(productData: ProductDTO): Promise<Product> {
    await this.load();
    // Crear una nota
    const product: Product = { ...productData, id: crypto.randomUUID() };
    this.#product.push(product);
    // Añadirla al fichero
    await this.save();
    // Devolverla
    return product;
  }

  async updateById(
    id: string,
    data: Omit<Partial<Product>, 'id'>,
  ): Promise<Product> {
    const product = await this.readById(id);
    Object.assign(product, data);
    // Añadirla al fichero
    await this.save();
    // Devolverla
    return product;
  }

  async deleteById(id: string): Promise<Product> {
    await this.load();
    const index = this.#product.findIndex((n) => n.id === id);
    if (index === -1) throw new Error(`Product with id ${id} not found`);
    const deletedProduct = this.#product.splice(index, 1)[0] as Product;
    // Añadirla al fichero
    await this.save();
    // Devolverla
    return deletedProduct;
  }
}
