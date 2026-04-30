import { env } from '../../config/env.ts';
import debug from 'debug';
import type { FilmsRepo } from '../repo/films.repo.ts';
import type { Request, Response, NextFunction } from 'express';
import type { Film, FilmUpdateDTO } from '../../zod/film.schema.ts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { INTERNAL_ERROR, NOT_FOUND_ERROR } from '../../errors/basic-errors.ts';

const log = debug(`${env.PROJECT_NAME}:controller:films`);
log('Loading Films Controller...');

// Creamos una copia del objeto original para poderlo mutar. Buena práctica en JS
const internalError = { ...INTERNAL_ERROR };
const notFoundError = { ...NOT_FOUND_ERROR };

export class FilmsController {
  #repo: FilmsRepo;
  constructor(repo: FilmsRepo) {
    this.#repo = repo;
  }

  async getAllFilms(_req: Request, res: Response, next: NextFunction) {
    try {
      log('Getting all films...');
      const films: Film[] = await this.#repo.getAllFilms();
      return res.json(films);
    } catch (error) {
      internalError.cause = error;
      log('Error when getting all films: %O', error);
      return next(internalError);
    }
  }

  async getFilmById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Get Film: %O', id);
      const film: Film = await this.#repo.getFilmById(id);
      return res.json(film);
    } catch (error) {
      log('Error getting film by id: %O', error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        notFoundError.cause = error;
        notFoundError.message = 'Film Not Found';
        return next(notFoundError);
      }
      internalError.cause = error;
      return next(internalError);
    }
  }

  async createFilm(req: Request, res: Response, next: NextFunction) {
    try {
      const filmData = req.body;
      log('Creating film: %0', filmData);
      const newFilm: Film = await this.#repo.createFilm(filmData);
      return res.status(201).json(newFilm);
    } catch (error) {
      log('Error creating film: %O', error);
      internalError.cause = error;
      return next(internalError);
    }
  }

  async updateFilm(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Updating film with ID: %O', id);
      const filmData: FilmUpdateDTO = req.body; // Validate this data in a real application
      const film: Film = await this.#repo.updateFilm(id, filmData);
      return res.json(film);
    } catch (error) {
      log('Error getting film by id: %O', error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        notFoundError.cause = error;
        notFoundError.message = 'Film Not Found';
        return next(notFoundError);
      }
      internalError.cause = error;
      return next(internalError);
    }
  }

  async deleteFilm(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Deleting film with ID: %O', id);
      await this.#repo.deleteFilm(id);
      return res.status(204).end();
    } catch (error) {
      log('Error getting film by id: %O', error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        notFoundError.cause = error;
        notFoundError.message = 'Film Not Found';
        return next(notFoundError);
      }
      internalError.cause = error;
      return next(internalError);
    }
  }
}
