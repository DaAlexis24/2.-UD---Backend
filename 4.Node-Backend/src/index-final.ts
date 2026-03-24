import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { json } from 'node:stream/consumers';
import serveStatic from 'serve-static';
import debugCreator from 'debug';

const debug = debugCreator('back:index');

const PORT = Number(process.env.PORT) || 3000;

const notes = [
  {
    id: '1',
    content: 'Primera nota',
  },
  {
    id: '2',
    content: 'Segunda nota',
  },
  {
    content: 'Nota creada',
    id: 'df10700f-18ae-41ea-9e8e-16583023b8db',
    owner: 'Pepe',
  },
];

const staticServer = serveStatic('public', {});

const app = async (request: IncomingMessage, response: ServerResponse) => {
  const appLog = debug('back:app');
  try {
    // console.log(request.url, request.method);
    // console.log(request.headers);

    debug(appLog);
    debug(`[${request.method}] ${request.url}`);

    if (request.method === 'PUT') {
      response.statusCode = 405;
      response.end();
      return;
    }

    if (request.method === 'POST') {
      response.statusCode = 201;
      const body = (await json(request)) as Record<string, unknown>;
      body.id = crypto.randomUUID;
      response.end(JSON.stringify(body));
      return;
    }

    switch (request.url) {
      case '/api':
        response.setHeader('Content-type', 'text/html; charset=utf-8');
        response.end('<p>API REST</p>');
        break;
      case '/api/notes':
        response.setHeader('Content-type', 'application/json');
        response.write(JSON.stringify(notes));
        response.end();
        break;
      default:
        response.statusCode = 200;
        // eslint-disable-next-line no-case-declarations
        const html = await readFile('./public/index.html', {
          encoding: 'utf-8',
        });
        response.end(html);
        break;
    }

    return;
  } catch (error) {
    console.error((error as Error).message);
  }
};

const middleware = (request: IncomingMessage, response: ServerResponse) => {
  staticServer(request, response, () => {
    app(request, response);
  });
};

const server = createServer(middleware);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
