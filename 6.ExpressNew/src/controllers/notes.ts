import type { NextFunction, Request, Response } from 'express';
import { NoteSchemaDTO, type Note } from '../schemas/note.ts';
import debug from 'debug';
import type { Repository } from '../types/repo.ts';
import type { NotesRepoJson } from '../services/notes-repo-json.ts';
import { HttpError } from '../errors/http-errors.ts';

const log = debug('NewExpress:controller:notes');

export class NotesController {
  repo: Repository<Note>;

  // constructor(repo: Repository<Note>) {
  // Lo anterior si o si se tiene que usar en lenguajes como Java, Js, PhP
  // Pero TS hace duck typing, asi que no es necesario
  constructor(repo: NotesRepoJson) {
    this.repo = repo;
    log('Instance create');
  }

  async getAll(_req: Request, res: Response) {
    const notes = await this.repo.read();
    res.json(notes);
    return;
  }

  async getBySearch(req: Request, res: Response) {
    const query = await req.query;
    res.json(query);
    return;
  }

  // Método con Arrow Function, no requiere que se realize un bind en el router que obtendrá los controladores
  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const note = await this.repo.readById(id as string);
      res.json(note);
      return;
    } catch (error) {
      const finalError = new HttpError(
        404,
        'Not Found',
        (error as Error).message,
      );
      finalError.cause = error;
      throw finalError;
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = NoteSchemaDTO.parse(req.body);
      const result = await this.repo.create(data);
      res.statusCode = 201;
      res.json(result);
      return;
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const data = req.body;
      const result = await this.repo.updateById(id as string, data);
      log(id);
      res.json(result);
      return;
    } catch (error) {
      const finalError = new HttpError(
        404,
        'Not Found',
        (error as Error).message,
      );
      finalError.cause = error;
      next(finalError);
    }
  };

  replace = (req: Request, res: Response) => {
    res.statusCode = 405;
    res.statusMessage = 'Method Not Allowed';
    res.end(res.statusMessage);
    return;
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.repo.deleteById(id as string);
    log(id);
    res.statusCode = 204;
    res.statusMessage = 'No Content';
    res.end();
    return;
  };
}
