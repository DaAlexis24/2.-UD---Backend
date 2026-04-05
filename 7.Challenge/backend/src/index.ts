import { server, listenManager, PORT } from './server.ts';

server.on('listening', listenManager);
server.listen(PORT);
