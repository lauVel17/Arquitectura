import { Request, Response } from "express";
import dotenv from 'dotenv';
import UsuarioToken from "../models/usuario-token";
dotenv.config();
/* ------------------- GESTIONAR TOKENS---------------------------- */
/* ----------- CONSULTAR GENERAL DE LOS TOKENS--------------------- */
export const consultartodosTokens = async (req: Request, res: Response) => {
  const usuarios = await UsuarioToken.findAll();

  if (usuarios.length == 0) {
    res.status(400).json({
      msg: "No se encontraron tokens",
    });
  } else {
    res.json(usuarios);
  }
};
/* ------------------- CONSULTAR TOKEN POR USUARIOS ---------------------------- */
export const consultarTokenPorUsuario = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;

  try {
    const usuarios = await UsuarioToken.findAll({
      where: {
        usuarioId,
      },
    });

    if (usuarios.length > 0) {
      res.json(usuarios);
    } else {
      res.status(404).json({
        msg: `No se encontraron tokens para el usuario`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
      error,
    });
  }
};

/* ------------------- CREAR USUARIOTOKEN ---------------------------- */
export const crearToken = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    console.log("Datos recibidos para crear el token:", body);

    const usuarioToken = await UsuarioToken.create({
      idUsuarioToken: body.idUsuarioToken,
      usuarioId: body.usuarioId,
      token: body.token,
    });

    res.status(200).json({
      msg: "El token del usuario ha sido guardado exitosamente",
      usuarioToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
/* ------------------- ACTUALIZAR USUARIOTOKEN ---------------------------- */
export const actualizarToken = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuarioToken = await UsuarioToken.findByPk(id);
    if (!usuarioToken) {
      return res.status(404).json({
        msg: "No se encontro el usuario especificado"
      });
    }
    console.log("Datos recibidos para actualización:", body);

    await usuarioToken.update({
      token: body.token,
    });

    res.status(200).json({
      msg: "El token del usuario se ha actualizado exitosamente",
      usuarioToken,
    });
  } catch (error) {
    console.log("Error al actualizar el usuario:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
// ------------------- ELIMINAR TOKENS DEL USUARIO ----------------------------
export const eliminarTok = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;

  try {
    if (!usuarioId) {
      return res.status(400).json({ message: "Por favor, ingrese el usuario" });
    }
    const tokensEliminados = await UsuarioToken.destroy({
      where: { usuarioId },
    });

    if (tokensEliminados === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron tokens para el usuario." });
    }

    return res
      .status(200)
      .json({ message: "Todos los tokens han sido eliminados exitosamente." });
  } catch (error) {
    console.error("Error al eliminar los tokens:", error);
    return res
      .status(500)
      .json({ message: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.", error });
  }
};
/* ------------------- ELIMINAR TOKEN ---------------------------- */
export const eliminarTokenn = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;


    const usuario = await UsuarioToken.findOne({
      where: { token: token },
    });

    if (!usuario) {
      return res.status(404).json({
        msg: `No existe el token ${token}`,
      });
    }

    await usuario.destroy();

    return res.status(200).json({
      msg: "El token ha sido eliminado exitosamente",
      usuario, 
    });
  } catch (error) {
    console.error("Error al eliminar el token:", error);
    return res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
