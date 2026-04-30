import { env } from '../../config/env.ts';
import debug from 'debug';
import type { GenresRepo } from '../repo/genres.repo.ts';
import type { NextFunction, Request, Response } from 'express';
import type {
  Genre,
  GenreDetail,
  GenreUpdateDTO,
} from '../../zod/film.schema.ts';
import { InternalServerError, NotFoundError } from '../../errors/http-error.ts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

const log = debug(`${env.PROJECT_NAME}:controller:genres`);
log('Loading Genres Controller..');

export class GenresController {
  #repo: GenresRepo;
  constructor(repo: GenresRepo) {
    this.#repo = repo;
  }

  async getAllGenres(_req: Request, res: Response, next: NextFunction) {
    try {
      log('Getting all genres...');
      const genres: Genre[] = await this.#repo.getAllGenres();
      return res.json(genres);
    } catch (error) {
      const finalError = new InternalServerError(
        'Error when fetching all genres',
        { cause: error },
      );
      log('Error when getting all genres: %s', finalError.message);
      return next(finalError);
    }
  }

  async getGenreById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      log('Get Genre: %s', id);
      const genre: GenreDetail = await this.#repo.getGenreById(id);
      return res.json(genre);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Genre Not Found', {
          cause: error,
        });
        log('Error when searching genre by id: %s', notFoundError.message);
        return next(notFoundError);
      }
      const finalError = new InternalServerError(
        'Error when fetching all genres',
        { cause: error },
      );
      log('Error when getting all genres: %s', finalError.message);
      return next(finalError);
    }
  }

  async createGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const genreData = req.body;
      log('Creating genre: %0', genreData);
      const newGenre: Genre = await this.#repo.createGenre(genreData);
      return res.status(201).json(newGenre);
    } catch (error) {
      const finalError = new InternalServerError('Error creating genre', {
        cause: error,
      });
      log('Error creating genre: %s', finalError.message);
      return next(finalError);
    }
  }

  async updateGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Updating genre with ID: %O', id);
      const genreData: GenreUpdateDTO = req.body; // Validate this data in a real application
      const genre: Genre = await this.#repo.updateGenre(id, genreData);
      return res.json(genre);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Genre Not Found', {
          cause: error,
        });
        log('Error updating genre by id: %s', notFoundError.message);
        return next(notFoundError);
      }
      const finalError = new InternalServerError('Error updating genre', {
        cause: error,
      });
      log('Error updating genre: %s', finalError.message);
      return next(finalError);
    }
  }

  async deleteGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Deleting genre with ID: %O', id);
      await this.#repo.deleteGenre(id);
      return res.status(204).end();
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Genre Not Found', {
          cause: error,
        });
        log('Error deleting genre by id: %s', notFoundError.message);
        return next(notFoundError);
      }
      const finalError = new InternalServerError('Error deleting genre', {
        cause: error,
      });
      log('Error deleting genre: %s', finalError.message);
      return next(finalError);
    }
  }
}
