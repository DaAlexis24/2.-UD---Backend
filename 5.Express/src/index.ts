import { createServer } from 'node:http';
import debug from 'debug';
import { app } from './app.ts';

const log = debug('Express-App:index');
const port = process.env.PORT || 3000;

const server = createServer(app);
log('Server created');

server.listen(port, () => {
  log(`Example app listening on port ${port}`);
});
