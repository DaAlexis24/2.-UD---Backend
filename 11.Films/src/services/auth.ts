import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.ts';
import debug from 'debug';
import type { TokenPayload } from '../types/login.ts';

const log = debug(`${env.PROJECT_NAME}:service:auth`);
log('Loading Auth Service ...');

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthService {
  static saltRounds = env.SALT_ROUNDS;

  static hash(text: string): Promise<string> {
    return hash(text, this.saltRounds as number);
  }

  static compare(pswd: string, hash: string): Promise<boolean> {
    return compare(pswd, hash);
  }

  static generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET);
  }

  static verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    } catch (error) {
      log('Invalid token:', error);
      return null;
    }
  }
}
