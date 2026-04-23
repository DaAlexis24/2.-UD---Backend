import { compare, hash } from 'bcryptjs';
import { env } from '../config/env.ts';
import debug from 'debug';

const log = debug(`${env.PROJECT_NAME}:service:auth`);
log('Loading Auth Service ...');

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthService {
  static hash(text: string): Promise<string> {
    return hash(text, 12);
  }

  static compare(pswd: string, hash: string): Promise<boolean> {
    return compare(pswd, hash);
  }
}
