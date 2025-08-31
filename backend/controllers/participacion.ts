import { Request, Response } from "express";
import participacion from "../models/participaciones";

//consultar departamento
export const consultarPart = async (req: Request, res: Response) => {
  try {
    const partCons = await participacion.findAll({
      /* order: [["idparticipaciones", "DESC"]], */
    });

    if (partCons.length === 0) {
      return res.status(400).json({ msg: "No se encontró el departamento" });
    }

    res.json(partCons);
  } catch (error) {
    console.error("Error al consultar el participaciones:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
//Crear participación
export const createPart = async (req: Request, resp: Response) => {
  const { body } = req;
  try {
    console.log("Datos recibidos ", body);
    const partCreate = await participacion.create({
    idparticipaciones: body.idparticipaciones,
    proyectoid: body.proyectoid,
    usuarioid: body.usuarioid,
    });
    resp.status(200).json({
      msg: "La participación ha sido creado exitosamente",
      partCreate,
    });
    }catch(error){
        console.log("Error al crear la participación ",error);
        resp.status(500).json({
            msg:"No se logró completar la creación de la participación ",
        });
    }
 }

//Consultar participación
export const consultPart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const partcons = await participacion.findByPk(id);
  if (!partcons) {
    res.json(partcons);
  } else {
    res.status(400).json({
      msg: "No se encontró la participación especificada",
    });
  }
};

//Actualizar participación
export const updatePart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const partupdate= await participacion.findByPk(id);
    if (!partupdate) {
      return res.status(404).json({
        msg: "No se encontró la participación",
      });
    }

    console.log("Datos recibidos para proceder la actualización", body);
    await partupdate.update({
        idparticipaciones: body.idparticipaciones,
        proyectoid: body.proyectoid,
        usuarioid: body.usuarioid,
    });
    res.status(200).json({
      msg: "La participación  se ha actualizado correctamente",
      partupdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo completar la actualización del departamento, intente nuevamente más tarde.",
    });
  }
};

//Eliminar participación
export const delatePart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const partdelate = await participacion.findByPk(id);
  if (!partdelate) {
    return res.status(404).json({
      msg: "No se encontró la  participación",
    });
  }
  await partdelate.destroy();
  res.status(200).json({
    msg: "La participación  ha sido eliminada de forma correcta",
    participacion,
  });
};