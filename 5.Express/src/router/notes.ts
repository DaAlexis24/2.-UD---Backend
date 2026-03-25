import debug from 'debug';
import { Router } from 'express';
import { NotesRepoJson } from '../services/notes-repo-json.ts';
import { join, resolve } from 'node:path';

const log = debug('Express-App:router:notes');

const router = Router();

// Ubicamos el archivo que queremos manipular
const __dirname = resolve('.');
const file = join(__dirname, 'src', 'data', 'db.json');

const repo = new NotesRepoJson(file);

log('Notes router create');

router.get('/', async (_req, res) => {
  const notes = await repo.read();
  res.json(notes);
  return;
});

router.get('/search', (req, res) => {
  // Útil a la hora de realizar búsquedas complejas con varios parameters
  const query = req.query;
  res.json(query);
  return;
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const note = await repo.readById(id);
  res.json(note);
  return;
});

router.post('/', (req, res) => {
  res.statusCode = 201;
  const result = {
    ...req.body,
    id: crypto.randomUUID(),
  };
  res.json(result);
  return;
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const result = {
    ...req.body,
    id,
  };
  log(id);
  res.json(result);
  return;
});

router.put('/:id', (req, res) => {
  res.statusCode = 405;
  res.statusMessage = 'Method Not Allowed';
  //   const { id } = req.params;
  //   const result = {
  //     ...req.body,
  //     id,
  //   };
  //   log(id);
  //   res.json(result);
  res.end(res.statusMessage);
  return;
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  log(id);
  res.statusCode = 204;
  res.statusMessage = 'No Content';
  res.end();
  return;
});

export default router;
