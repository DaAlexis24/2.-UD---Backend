import debug from 'debug';
import { env } from './config/env.ts';
import { connectDB } from './config/db-connection.ts';
import { RepoGenres } from './repo/genres.ts';

const log = debug(`${env.PROJECT_NAME}:index`);
log('Starting app...');
// Top level await only in index
const pool = await connectDB();
const repo = new RepoGenres(pool);

const g = await repo.readAllGenres();
log('Genres:', g);

try {
  const g2 = await repo.readGenresById(100);
  log('Genres whit Id 100:', g2);
} catch (error) {
  log((error as Error).message);
}
