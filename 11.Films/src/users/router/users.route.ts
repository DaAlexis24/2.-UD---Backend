import { env } from '../../config/env.ts';
import debug from 'debug';
import type { UsersController } from '../controllers/users.controller.ts';
import { Router } from 'express';
import { validateBody, validateId } from '../../middleware/validations.ts';
import { UpdateUserDTOSchema } from '../../zod/user.schema.ts';

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
    this.#router.get('/', this.#controller.getAllUsers.bind(this.#controller));
    this.#router.get(
      '/:id',
      validateId(),
      this.#controller.getUserById.bind(this.#controller),
    );
    this.#router.patch(
      '/:id',
      validateId(),
      validateBody(UpdateUserDTOSchema),
      this.#controller.updateUser.bind(this.#controller),
    );
    this.#router.delete(
      '/:id',
      validateId(),
      this.#controller.deleteUser.bind(this.#controller),
    );
  }

  get router() {
    return this.#router;
  }
}
