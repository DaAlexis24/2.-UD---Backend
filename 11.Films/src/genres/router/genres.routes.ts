import { env } from '../../config/env.ts';
import debug from 'debug';
import { Router } from 'express';
import type { GenresController } from '../controllers/genres.controller.ts';
import { validateBody, validateId } from '../../middleware/validations.ts';
import type { AuthInterceptor } from '../../middleware/auth.interceptor.ts';
import {
  GenreCreateDTOSchema,
  GenreUpdateDTOSchema,
} from '../../zod/film.schema.ts';

const log = debug(`${env.PROJECT_NAME}:router:genres`);
log('Loading Genres Router...');

export class GenresRouter {
  #controller: GenresController;
  #router: Router;
  #authInterceptor: AuthInterceptor;

  constructor(controller: GenresController, authInterceptor: AuthInterceptor) {
    log('Initializing genres router...');
    this.#controller = controller;
    this.#router = Router();
    this.#authInterceptor = authInterceptor;

    this.#router.get('/', this.#controller.getAllGenres.bind(this.#controller));
    this.#router.get(
      '/:id',
      validateId(),
      this.#controller.getGenreById.bind(this.#controller),
    );
    this.#router.post(
      '/',
      validateBody(GenreCreateDTOSchema),
      this.#authInterceptor.authenticate.bind(this.#authInterceptor),
      this.#authInterceptor.authorize(['EDITOR']).bind(this.#authInterceptor),
      this.#controller.createGenre.bind(this.#controller),
    );
    this.#router.put(
      '/:id',
      validateId(),
      validateBody(GenreUpdateDTOSchema),
      this.#authInterceptor.authenticate.bind(this.#authInterceptor),
      this.#authInterceptor.authorize(['EDITOR']).bind(this.#authInterceptor),
      this.#controller.updateGenre.bind(this.#controller),
    );
    this.#router.delete(
      '/:id',
      validateId(),
      this.#authInterceptor.authenticate.bind(this.#authInterceptor),
      this.#authInterceptor.authorize(['EDITOR']).bind(this.#authInterceptor),
      this.#controller.deleteGenre.bind(this.#controller),
    );
  }

  get router() {
    return this.#router;
  }
}
