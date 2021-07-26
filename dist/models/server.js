"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.paths = {
            usuario: '/api/usuario'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        // Conexion a la base...
        this.dbConnect();
        // Middlewares...
        this.middlewares();
        // Defino rutas...
        this.routes();
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos up...');
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    middlewares() {
        // CORS...
        this.app.use(cors_1.default());
        // Lectura del body...
        this.app.use(express_1.default.json());
        // Carpeta publica...
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.paths.usuario, usuario_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: [${this.port}]`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map