import dotenv from 'dotenv';
// Inicializo las variables de entorno...
dotenv.config();

import Server from './models/server';

const server = new Server();
server.listen();
