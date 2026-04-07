import { ProductSchemaDTO } from '../models/product.ts';
import { HttpError } from '../errors/http-errors.ts';
import { env } from '../models/env.ts';
import type { NextFunction, Request, Response } from 'express';
import type { Product } from '../models/product.ts';
import type { Repository } from '../types/repo.ts';
import type { ProductsRepoJson } from '../services/products-repo-json.ts';
import debug from 'debug';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:controller:products`);

export class ProductController {
  repo: Repository<Product>;

  constructor(repo: ProductsRepoJson) {
    this.repo = repo;
    // Create instance into router
    log('Instance create');
  }

  // CRUD Methods
  getAll = async (_req: Request, res: Response) => {
    const products = await this.repo.read();
    res.json(products);
    return;
  };

  // getBySearch

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await this.repo.readById(id as string);
      res.json(product);
      return;
    } catch (error) {
      const finalError = new HttpError(
        404,
        'Not Found',
        (error as Error).message,
      );
      finalError.cause = error;
      throw finalError;
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = ProductSchemaDTO.parse(req.body);
      const result = await this.repo.create(data);
      res.statusCode = 201;
      res.json(result);
      return;
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = this.repo.updateById(id as string, data);
      res.json(result);
      return;
    } catch (error) {
      const finalError = new HttpError(
        404,
        'Not Found',
        (error as Error).message,
      );
      finalError.cause = error;
      next(finalError);
    }
  };

  replace = (_req: Request, res: Response) => {
    res.statusCode = 405;
    res.statusMessage = 'Method Not Allowed';
    res.end(res.statusMessage);
    return;
  };

  delete = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      this.repo.deleteById(id as string);
      log(id);
      res.statusCode = 204;
      res.statusMessage = 'No Content';
      res.end();
      return;
    } catch (error) {
      const finalError = new HttpError(
        404,
        'Not Found',
        (error as Error).message,
      );
      finalError.cause = error;
      next(finalError);
    }
  };
}
