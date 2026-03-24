import { app } from './app.ts';
import { createServer } from 'node:http';
import debug from 'debug';

const log = debug('Express-App:index');
const port = process.env.PORT || 3000;

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
  if (process.env.NODE_ENV !== 'dev') {
    console.log(`Server listening on ${bind}`);
  } else {
    log(`Server listening on ${bind}`);
  }
};

const server = createServer(app);
log('Server created');

server.listen(port, listenManager);
