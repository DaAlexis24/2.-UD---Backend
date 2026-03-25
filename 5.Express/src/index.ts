import { app } from './app.ts';
import { createServer, ServerResponse } from 'node:http';
import debug from 'debug';
import { HttpError } from './errors/http-errors.ts';
import { env } from '../environment.ts';

const log = debug('Express-App:index');
const port = env.PORT || 3000;

const listenManager = () => {
  const addr = server.address();
  if (addr === null) return;
  let bind;
  if (typeof addr === 'string') {
    bind = 'pipe' + addr;
  } else {
    bind =
      addr.address === '::'
        ? `http://localhost:${addr.port}`
        : `${addr.address}:${addr.port}`;
  }
  if (env.NODE_ENV !== 'dev') {
    console.log(`Server listening on ${bind}`);
  } else {
    log(`Server listening on ${bind}`);
  }
};

const errorManager = (error: HttpError, response: ServerResponse) => {
  if (!('statusCode' in error)) {
    error = {
      ...new Error('Internal Server Error'),
      status: 500,
      statusMessage: 'Internal Server Error',
    };
  }

  const errorInfo = `Error ${error.status}: ${error.statusMessage}`;
  response.statusCode = error.status;
  response.statusMessage = error.statusMessage;
  log(errorInfo, error.message);
  response.end(errorInfo);
};

const server = createServer(app);
log('Server created');

server.on('listening', listenManager);
server.on('error', errorManager);
server.listen(port);
