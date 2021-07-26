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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Levanto los parametros del GET...
    let { limit = 5, page = 1 } = req.query;
    // Convierto los parametros del GET a entero...
    limit = Number(limit);
    page = Number(page) - 1;
    const { rows: usuarios, count: total } = yield usuario_1.default.findAndCountAll({
        where: {
            estado: 'A'
        },
        limit: limit,
        offset: (page * limit)
    });
    res.json({
        total,
        page: (page + 1),
        pages: Math.ceil(total / limit),
        limit,
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario || usuario.get('estado') !== 'A') {
        return res.status(404).json({
            msg: `No existe usuario con id [${id}]`
        });
    }
    res.json({
        usuario
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email } = req.body;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: [${email}]`
            });
        }
        const usuario = usuario_1.default.build({ nombre, email });
        yield usuario.save();
        res.json({ usuario });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error interno. Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { nombre, email } = req.body;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe usuario con el id: [${id}]`
            });
        }
        // Si modifico el email, valido que el email este disponible...
        if (email != usuario.get('email')) {
            const existeEmail = yield usuario_1.default.findOne({
                where: {
                    email
                }
            });
            if (existeEmail) {
                return res.status(400).json({
                    msg: `Email: [${email}] no disponible`
                });
            }
        }
        // Hago el update...
        yield usuario.update({ nombre, email });
        res.json({ usuario });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error interno. Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe usuario con el id: [${id}]`
            });
        }
        // Hago la baja logica...
        yield usuario.update({ estado: 'B' });
        res.json({ usuario });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error interno. Hable con el administrador'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map