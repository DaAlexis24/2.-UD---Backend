import debug from 'debug';
import { Router } from 'express';
import { NotesController } from '../controllers/notes.ts';
import { NotesRepoJson } from '../services/notes-repo-json.ts';
import { join, resolve } from 'node:path';

const log = debug('NewExpress:router:notes');

const router = Router();

log('Notes router create');

const __dirname = resolve('.');
const file = join(__dirname, 'src', 'data', 'db.json');
const repo = new NotesRepoJson(file);

const controller = new NotesController(repo);

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.put('/:id', controller.replace);
router.delete('/:id', controller.delete);
// router.get('/search', controller.getBySearch);

export default router;
