import { env } from '../../config/env.ts';
import debug from 'debug';
import type { UsersController } from '../controllers/users.controller.ts';
import { Router } from 'express';

const log = debug(`${env.PROJECT_NAME}:router:users`);
log('Loading Users Router ...');

export class UsersRouter {
  #controller: UsersController;
  #router: Router;

  constructor(controller: UsersController) {
    this.#controller = controller;
    this.#router = Router();

    // Rutas
    this.#router.post('/register', this.#controller.register);
    this.#router.post('/login', this.#controller.login);
  }

  public get router() {
    return this.#router;
  }
}
