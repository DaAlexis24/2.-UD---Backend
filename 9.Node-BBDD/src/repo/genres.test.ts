import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { connectDB } from '../config/db-connection.ts';
import { RepoGenres } from './genres.ts';

describe('Genres repo', async () => {
  const pool = await connectDB();
  const repo = new RepoGenres(pool);
  beforeEach(() => {
    const createTable = `CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW());`;
    pool.query(createTable);
  });
  it('Should read all generes', async () => {
    const g = await repo.readAllGenres();
    assert(Array.isArray(g), 'Expected array');
    assert.strictEqual(g.length, 12);
  });
  it('Should read a genre by id', async () => {
    const g = await repo.readGenresById(1);
    assert(g);
    assert.strictEqual(g.id, 1, 'Expected genre id to be 1');
  });
  it('Should throw an error if genre not found', async () => {
    try {
      await repo.readGenresById(999);
      assert.fail('Expected an error to be thrown');
    } catch (error) {
      assert.strictEqual(
        (error as Error).message,
        'Genre with id 999 not found',
      );
    }
  });
});
