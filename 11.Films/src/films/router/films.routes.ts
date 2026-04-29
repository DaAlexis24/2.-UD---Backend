import { env } from '../../config/env.ts';
import debug from 'debug';
import type { FilmsController } from '../controllers/films.controller.ts';
import { Router } from 'express';
import type { AuthInterceptor } from '../../middleware/auth.interceptor.ts';
import { validateBody, validateId } from '../../middleware/validations.ts';
import { FilmUpdateDTOSchema } from '../../zod/film.schema.ts';

const log = debug(`${env.PROJECT_NAME}:router:films`);
log('Loading films router...');

export class FilmsRouter {
  #controller: FilmsController;
  #router: Router;
  #authInterceptor: AuthInterceptor;
  constructor(controller: FilmsController, authInterceptor: AuthInterceptor) {
    log('Initializing films router...');
    this.#controller = controller;
    this.#router = Router();
    this.#authInterceptor = authInterceptor;

    // Define routes and bind them to controller methods
    this.#router.get('/', this.#controller.getAllFilms.bind(this.#controller));
    this.#router.get(
      '/:id',
      validateId(),
      this.#controller.getFilmById.bind(this.#controller),
    );
    this.#router.post(
      '/',
      this.#authInterceptor.authenticate.bind(this.#authInterceptor),
      this.#authInterceptor.authorize(['EDITOR']).bind(this.#authInterceptor),
      this.#controller.createFilm.bind(this.#controller),
    );
    this.#router.patch(
      '/:id',
      validateId(),
      validateBody(FilmUpdateDTOSchema),
      this.#authInterceptor.authenticate.bind(this.#authInterceptor),
      this.#authInterceptor.authorize(['EDITOR']).bind(this.#authInterceptor),
      this.#controller.updateFilm.bind(this.#controller),
    );
    this.#router.delete(
      '/:id',
      validateId(),
      this.#authInterceptor.authenticate.bind(this.#authInterceptor),
      this.#authInterceptor.isOwnerOrAdmin.bind(this.#authInterceptor),
      this.#controller.deleteFilm.bind(this.#controller),
    );
  }

  get router() {
    return this.#router;
  }
}
