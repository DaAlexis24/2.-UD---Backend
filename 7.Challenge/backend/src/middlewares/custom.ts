import type { Request, Response, NextFunction } from 'express';
import debug from 'debug';
import { env } from '../models/env.ts';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:middleware`);

log('Custom loaded');

export const customLogger = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    log(`[${req.method}] ${req.url}`);
    next();
  };
};

export const customHeaders = (brand: string) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Owner', brand);
    next();
    return;
  };
};
