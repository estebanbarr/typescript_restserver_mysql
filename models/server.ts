import express, { Application } from 'express';
import cors                     from 'cors';

import usuarioRouter from '../routes/usuario';
import db            from '../db/connection';

class Server {
    private app : Application;
    private port: string;

    private paths = {
        usuario: '/api/usuario'
    };

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        // Conexion a la base...
        this.dbConnect();

        // Middlewares...
        this.middlewares();

        // Defino rutas...
        this.routes();
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos up...');
        } catch (err) {
            throw new Error(err);
        }
    }

    middlewares() {
        // CORS...
        this.app.use(cors());

        // Lectura del body...
        this.app.use(express.json());

        // Carpeta publica...
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.usuario, usuarioRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: [${ this.port }]`);
        });
    }
}

export default Server;
