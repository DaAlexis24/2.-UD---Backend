import type { PrismaClient } from '../../../generated/prisma/client.ts';
import { env } from '../../config/env.ts';
import debug from 'debug';
import { AuthService } from '../../services/auth.ts';
import type {
  LoginUserData,
  ProfileDTO,
  RegisterUserData,
  User,
  UserUpdateDTO,
} from '../../zod/user.schema.ts';
import type { LoginResult, TokenPayload } from '../../types/login.ts';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace.ts';
// import { HttpError } from '../errors/http-error.ts';

const log = debug(`${env.PROJECT_NAME}:repo:users`);
log('Loading Users Controller ...');

export class UsersRepo {
  #prisma: PrismaClient;
  // responsable de la inyección de dependencias,
  constructor(prisma: PrismaClient) {
    this.#prisma = prisma;
  }

  async register(userData: RegisterUserData) {
    log('Register user with email %s', userData.email);
    const hashedPassword = await AuthService.hash(userData.password);
    const result = await this.#prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        profile: {
          create: userData.profile,
        },
      },
      include: {
        profile: true,
      },
    });
    return result;
  }

  async login(userData: LoginUserData): Promise<LoginResult> {
    log('Logging in user with email %s', userData.email);
    // const loginError = new HttpError(
    //   401,
    //   'Unauthorized',
    //   'Invalid User or Password',
    // );
    const result = await this.#prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      omit: {
        password: false,
      },
    });

    if (result === null) {
      throw new PrismaClientKnownRequestError('', {
        code: 'P2004',
        clientVersion: 'V1',
      });
    }

    const isValid = await AuthService.compare(
      userData.password, // no hash
      result.password, // hash
    );

    if (!isValid) {
      throw new PrismaClientKnownRequestError('', {
        code: 'P2004',
        clientVersion: 'V1',
      });
    }

    const payload: TokenPayload = {
      id: result.id,
      email: result.email,
      role: result.role,
    };
    const token = AuthService.generateToken(payload);

    return {
      payload,
      token,
    };
  }

  async getAllUsers(): Promise<User[]> {
    log('Getting all users');
    return this.#prisma.user.findMany({
      include: {
        profile: true,
      },
    }) as Promise<User[]>;
  }

  async getUserById(id: number): Promise<User> {
    log('Getting user with id %d', id);
    return this.#prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    }) as Promise<User>;
  }

  async updateUser(id: number, data: UserUpdateDTO): Promise<User> {
    log('Updating user with id %d', id);
    return this.#prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(data.password && {
          password: await AuthService.hash(data.password),
        }),
      },
      include: {
        profile: true,
      },
    }) as Promise<User>;
  }

  async updateUserProfile(
    id: number,
    profileData: Partial<ProfileDTO>,
  ): Promise<User> {
    log('Updating user profile with id %d', id);
    return this.#prisma.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: profileData,
        },
      },
      include: {
        profile: true,
      },
    }) as Promise<User>;
  }

  async deleteUser(id: number): Promise<User> {
    log('Deleting user with id %d', id);
    return this.#prisma.user.delete({
      where: {
        id,
      },
    }) as Promise<User>;
  }
}
