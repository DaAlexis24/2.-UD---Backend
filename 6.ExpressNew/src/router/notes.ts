import debug from 'debug';
import { Router } from 'express';
import { NotesController } from '../controllers/notes.ts';
// import { NotesRepoJson } from '../services/notes-repo-json.ts';
// import { join, resolve } from 'node:path';

const log = debug('NewExpress:router:notes');

const router = (controller: NotesController) => {
  const router = Router();

  log('Notes router create');

  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.patch('/:id', controller.update);
  router.put('/:id', controller.replace);
  router.delete('/:id', controller.delete);
  // router.get('/search', controller.getBySearch);

  return router;
};

export default router;
