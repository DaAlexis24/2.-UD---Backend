import type { PrismaClient } from '../../generated/prisma/client.ts';
import type {
  UserCreateInput,
  UserCreateWithoutProfileInput,
  UserCreateWithoutReviewsInput,
} from '../../generated/prisma/models.ts';
import { env } from '../config/env.ts';
import debug from 'debug';
import { AuthService } from '../services/auth.ts';

const log = debug(`${env.PROJECT_NAME}:repo:users`);
log('Loading Users Repo ...');

export class UsersRepo {
  #prisma: PrismaClient;
  // responsable de la inyección de dependencias,
  constructor(prisma: PrismaClient) {
    this.#prisma = prisma;
  }

  async register(userData: UserCreateInput) {
    userData.password = await AuthService.hash(userData.password);
    const result = await this.#prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        profile: userData.profile,
      },
      include: {
        profile: true,
      },
      omit: {
        password: true,
      },
    });
    return result;
  }

  async login(
    userData: UserCreateWithoutProfileInput & UserCreateWithoutReviewsInput,
  ) {
    const result = await this.#prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (result === null) {
      throw new Error('Invalid Login');
    }

    const isValid = await AuthService.compare(
      userData.password,
      result.password,
    );

    if (!isValid) {
      throw new Error('Invalid Login');
    }

    return {
      id: result.id,
      email: result.email,
    };
  }
}
