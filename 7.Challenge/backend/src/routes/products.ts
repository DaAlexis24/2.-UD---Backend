import debug from 'debug';
import { Router } from 'express';
import { env } from '../models/env.ts';
import { ProductController } from '../controllers/products.ts';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:router:products`);

const router = (controller: ProductController) => {
  const router = Router();

  log('Products router creates');

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.patch('/:id', controller.update);
  router.put('/:id', controller.replace);
  router.delete('/:id', controller.delete);

  return router;
};

export default router;
