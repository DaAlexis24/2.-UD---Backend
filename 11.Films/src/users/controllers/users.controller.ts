import { env } from '../../config/env.ts';
import debug from 'debug';
import type { UsersRepo } from '../repo/users.repo.ts';
import type { Request, Response, NextFunction } from 'express';
import type { RegisterUserData } from '../../zod/user.schema.ts';
import { HttpError } from '../../errors/http-error.ts';
import type { LoginResult } from '../../types/login.ts';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace.ts';

const log = debug(`${env.PROJECT_NAME}:controller:users`);
log('Loading users controller...');

export class UsersController {
  #repo: UsersRepo;

  constructor(repo: UsersRepo) {
    this.#repo = repo;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: RegisterUserData = req.body;
      const user = await this.#repo.register(userData);
      res.status(201).json(user);
    } catch (error) {
      log('Error registering user-, %O', error);
      const finalError = new HttpError(
        500,
        'Internal Server Error',
        'Failed to register user',
        {
          cause: error,
        },
      );
      next(finalError);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginData = req.body;
      const loginResult: LoginResult = await this.#repo.login(loginData);
      res.json(loginResult);
    } catch (error) {
      log('Error logging in user: %O', error);
      if (error instanceof PrismaClientKnownRequestError) {
        const finalError = new HttpError(
          401,
          'Unauthorized',
          'Invalid email or password',
        );
        next(finalError);
      }
      const finalError = new HttpError(
        500,
        'Internal Server Error',
        'Failed to login user',
        {
          cause: error,
        },
      );
      next(finalError);
    }
  }
}
