import type { AppPrismaClient } from '../../config/db-config.ts';
import { env } from '../../config/env.ts';
import debug from 'debug';
import type {
  ReviewCreateDTO,
  ReviewParamsDTO,
  ReviewUpdateDTO,
} from '../../zod/film.schema.ts';

const log = debug(`${env.PROJECT_NAME}:repo:reviews`);
log('Loading Reviews Repo');

export class ReviewsRepo {
  #prisma: AppPrismaClient;
  constructor(prisma: AppPrismaClient) {
    this.#prisma = prisma;
  }

  // Obtenemos todos los reviews de una película
  async getAllFilmReviews(filmID: number) {
    log('Getting all reviews by film with id: %d', filmID);
    return await this.#prisma.review.findMany({
      where: {
        filmID,
      },
      omit: {
        filmID: true,
        userID: true,
      },
      include: {
        user: {
          select: {
            profile: {
              select: {
                firstName: true,
                surname: true,
              },
            },
          },
        },
        film: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  // Obtenemos todos los reviews de un Usuario
  async getAllUserReviews(userID: number) {
    log('Getting all reviews by user with id: %d', userID);
    return await this.#prisma.review.findMany({
      where: {
        userID,
      },
      omit: {
        userID: true,
        filmID: true,
      },
      include: {
        film: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  // Creamos un Review
  async createReview(data: ReviewCreateDTO) {
    log('Creating review for film %s by user %s', data.filmID, data.userID);
    return await this.#prisma.review.create({
      data: {
        review: data.review,
        rate: data.rate,
        date: new Date(),
        filmID: data.filmID,
        userID: data.userID,
      },
    });
  }

  // [PATCH] /api/reviews/:filmId/ (Owner) => Token: userId
  async updateReview(id: ReviewParamsDTO, data: ReviewUpdateDTO) {
    log('Updating review for film %s by user %d', id.filmID, id.userID);
    return await this.#prisma.review.update({});
  }
}
