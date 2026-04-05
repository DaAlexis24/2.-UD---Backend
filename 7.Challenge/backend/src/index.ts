import { server, listenManager, PORT } from './server.ts';
import debug from 'debug';
import { env } from './models/env.ts';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:index`);

server.on('listening', listenManager);
server.listen(PORT);
log('App running');
