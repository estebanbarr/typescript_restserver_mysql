import { Request, Response } from "express";

import Usuario from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response) => {
    // Levanto los parametros del GET...
    let { limit=5, page=1 } = req.query;

    // Convierto los parametros del GET a entero...
    limit  = Number(limit);
    page   = Number(page) - 1;

    const { rows: usuarios, count: total} = await Usuario.findAndCountAll({
        where: {
            estado: 'A'
        },
        limit: limit,
        offset: (page*limit)
    });

    res.json({
        total,
        page: (page + 1),
        pages: Math.ceil(total / limit),
        limit,
        usuarios
    });
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario || usuario.get('estado') !== 'A') {
        return res.status(404).json({
            msg: `No existe usuario con id [${ id }]`
        });
    }

    res.json({
        usuario
    });
}

export const postUsuario = async (req: Request, res: Response) => {
    const { nombre, email } = req.body;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: [${ email }]`
            });
        }

        const usuario = Usuario.build({ nombre, email });
        await usuario.save();

        res.json({ usuario });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error interno. Hable con el administrador'
        });
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id   } = req.params;
    const { body } = req;

    const { nombre, email } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe usuario con el id: [${ id }]`
            });
        }

        // Si modifico el email, valido que el email este disponible...
        if (email != usuario.get('email')) {
            const existeEmail = await Usuario.findOne({
                where: {
                    email
                }
            });
            if (existeEmail) {
                return res.status(400).json({
                    msg: `Email: [${ email }] no disponible`
                });
            }
        }

        // Hago el update...
        await usuario.update({ nombre, email });

        res.json({ usuario });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error interno. Hable con el administrador'
        });
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id   } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe usuario con el id: [${ id }]`
            });
        }

        // Hago la baja logica...
        await usuario.update({ estado: 'B' });

        res.json({ usuario });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error interno. Hable con el administrador'
        });
    }
}
