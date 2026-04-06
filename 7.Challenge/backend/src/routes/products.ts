import debug from 'debug';
import { Router } from 'express';
import { join, resolve } from 'node:path';
import { env } from '../models/env.ts';
import { ProductsRepoJson } from '../services/products-repo-json.ts';
import { ProductController } from '../controllers/products.ts';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:router:products`);

const router = Router();

log('Products router creates');

const __dirname = resolve('.');
const file = join(__dirname, 'src', 'data', 'db.json');
const repo = new ProductsRepoJson(file);

const controller = new ProductController(repo);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.put('/:id', controller.replace);
router.delete('/:id', controller.delete);

export default router;
