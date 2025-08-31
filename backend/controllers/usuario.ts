import usuario from "../models/usuarios";
import { Request, Response } from "express";

//consultar todos los usuarios
export const consultarAllUser = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuario.findAll({
      /* order: [["idUsuario", "DESC"]], */
    });

    if (usuarios.length === 0) {
      return res.status(400).json({ msg: "No se encontraron usuarios" });
    }

    res.json(usuarios);
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
//Crear usuario
export const createUser = async (req: Request, resp: Response) => {
  const { body } = req;
  try {
    console.log("Datos recibidos ", body);
    const usuarioc = await usuario.create({
      nodocumento: body.nodocumento,
      nombreapellido: body.nombreapellido,
      correo: body.correo,
      telefono: body.telefono,
      estado: body.estado,
      fechaingreso: body.fechaingreso,
      ciudadid: body.ciudad,
    });
    resp.status(200).json({
      msg: "El usuario ha sido creado exitosamente",
      usuarioc,
    });
    }catch(error){
        console.log("Error al crear el usuario",error);
        resp.status(500).json({
            msg:"No se logró completar la creación del usuario",
        });
    }
 }

//Consultar usuario
export const consultUserid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioc = await usuario.findByPk(id);
  if (!usuarioc) {
    res.json(usuarioc);
  } else {
    res.status(400).json({
      msg: "No se encontro usuario especificado",
    });
  }
};

//Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const actus = await usuario.findByPk(id);
    if (!actus) {
      return res.status(404).json({
        msg: "No se encontró el usuario",
      });
    }

    console.log("Datos recibidos para proceder la actualización", body);
    await actus.update({
      // nodocumento: body.nodocumento,
      nombreapellido: body.nombreapellido,
      correo: body.correo,
      telefono: body.telefono,
      estado: body.estado,
      fechaingreso: body.fechaingreso,
      ciudadid: body.ciudad,
    });
    res.status(200).json({
      msg: "El usuario se ha actualizado correctamente",
      actus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo completar la actualización del usuario, intente nuevamente más tarde.",
    });
  }
};

//Eliminar usuario
export const delateusua = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteus = await usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      msg: "No se encontro el usuario",
    });
  }
  await usuario.destroy();
  res.status(200).json({
    msg: "La ciudad ha sido eliminada de forma correcta",
    usuario,
  });
};
