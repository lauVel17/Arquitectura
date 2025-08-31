import { Request, Response } from "express";
import pais from "../models/pais";

//consultar pais
export const consultarPais = async (req: Request, res: Response) => {
  try {
    const paisc = await pais.findAll({
      /* order: [["idpais", "DESC"]], */
    });

    if (paisc.length === 0) {
      return res.status(400).json({ msg: "No se encontró el pais" });
    }

    res.json(paisc);
  } catch (error) {
    console.error("Error al consultar el pais:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
//Crear pais
export const createPais = async (req: Request, resp: Response) => {
  const { body } = req;
  try {
    console.log("Datos recibidos ", body);
    const paiscreate = await pais.create({
     idpais: body.idpais,
     nombre: body.nombre,
    });
    resp.status(200).json({
      msg: "El pais ha sido creado exitosamente",
      paiscreate,
    });
    }catch(error){
        console.log("Error al crear el pais",error);
        resp.status(500).json({
            msg:"No se logró completar la creación del pais",
        });
    }
 }

//Consultar pais
export const consultPais = async (req: Request, res: Response) => {
  const { id } = req.params;
  const Paiscons = await pais.findByPk(id);
  if (!Paiscons) {
    res.json(Paiscons);
  } else {
    res.status(400).json({
      msg: "No se encontró el pais especificado",
    });
  }
};

//Actualizar pais
export const updatePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const actPais= await pais.findByPk(id);
    if (!actPais) {
      return res.status(404).json({
        msg: "No se encontró el pais",
      });
    }

    console.log("Datos recibidos para proceder la actualización", body);
    await actPais.update({
      idpais: body.idpais,
      nombre: body.nombre,

      
    });
    res.status(200).json({
      msg: "El pais se ha actualizado correctamente",
      actPais,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo completar la actualización del pais, intente nuevamente más tarde.",
    });
  }
};

//Eliminar pais
export const delatePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  const delatePais = await pais.findByPk(id);
  if (!delatePais) {
    return res.status(404).json({
      msg: "No se encontró el pais",
    });
  }
  await delatePais.destroy();
  res.status(200).json({
    msg: "El pais  ha sido eliminada de forma correcta",
    pais,
  });
};
