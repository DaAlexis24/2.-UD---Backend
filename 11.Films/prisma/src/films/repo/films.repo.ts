import { env } from '../../config/env';
import debug from 'debug';
import type { AppPrismaClient } from '../../config/db-config';
import type { Film, FilmCreateDTO } from '../../zod/film.schema';

const log = debug(`${env.PROJECT_NAME}:repo:films`);
log('Loading Films Repo');

export class FilmsRepo {
  #prisma: AppPrismaClient;
  constructor(prisma: AppPrismaClient) {
    this.#prisma = prisma;
  }

  // selecciono todas las películas
  async getAllFilms(): Promise<Film[]> {
    log('Getting all films!');
    return this.#prisma.film.findMany({
      include: {
        genres: {
          omit: {
            id: true,
          },
        },
        reviews: {
          omit: {
            filmID: true,
            userID: true,
          },
        },
      },
    }) as Promise<Film[]>;
  }

  async getFilmById(id: number): Promise<Film> {
    log('Getting film with id %d', id);
    return this.#prisma.film.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        genres: {
          omit: {
            id: true,
          },
        },
      },
    }) as unknown as Promise<Film>;
  }

  async createFilm(film: FilmCreateDTO): Promise<Film> {
    log(`Creating new film with title: ${film.title}`),
    return this.#prisma.film.create({
        include: {

        }
    }) as Promise<Film>
  }
}
