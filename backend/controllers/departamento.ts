import { Request, Response } from "express";
import departamento from "../models/departamento";
import pais from "../models/pais";

//consultar departamento
export const consultarDepart = async (req: Request, res: Response) => {
  try {
    const departC = await departamento.findAll({
      attributes: ["nombre"] 
    });

    if (departC.length === 0) {
      return res.status(400).json({ msg: "No se encontró el departamento" });
    }

    res.json(departC);
  } catch (error) {
    console.error("Error al consultar el departamento:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
//Crear departamento

export const createDepart = async (req: Request, resp: Response) => {
  const { body } = req;

  try {
    console.log("Datos recibidos ", body);

    const paisEncontrado = await pais.findOne({
      where: { nombre: body.nombrePais }, 
      attributes: ["idpais"], 
    });

    if (!paisEncontrado) {
      return resp.status(404).json({
        msg: `No se encontró un país con el nombre: ${body.nombrePais}`,
      });
    }

    const depcreate = await departamento.create({
      idpais: paisEncontrado!.idpais,
      nombre: body.nombre,
    });

    resp.status(200).json({
      msg: "El departamento ha sido creado exitosamente",
      depcreate,
    });
  } catch (error) {
    console.error("Error al crear el departamento", error);
    resp.status(500).json({
      msg: "No se logró completar la creación del departamento",
    });
  }
};


//Consultar departamento
export const consultDepart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const departcons = await departamento.findByPk(id);
  if (departcons) {
    res.json(departcons);
  } else {
    res.status(400).json({
      msg: "No se encontró el departamento especificado",
    });
  }
};

//Actualizar departamento
export const updateDepart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updateDep= await departamento.findByPk(id);
    if (!updateDep) {
      return res.status(404).json({
        msg: "No se encontró el departamento",
      });
    }

    console.log("Datos recibidos para proceder la actualización", body);
    await updateDep.update({
    /*     iddepartamento:body.iddepartamento,
        idpais: body.idpais, */
        nombre: body.nombre, 
    });
    res.status(200).json({
      msg: "El departamento se ha actualizado correctamente",
      updateDep,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo completar la actualización del departamento, intente nuevamente más tarde.",
    });
  }
};

//Eliminar departamento
export const delateDepart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const departdelate = await departamento.findByPk(id);
  if (!departdelate) {
    return res.status(404).json({
      msg: "No se encontró el departamento",
    });
  }
  await departdelate.destroy();
  res.status(200).json({
    msg: "El departamento  ha sido eliminado de forma correcta",
    departamento,
  });
};

// consultar depto por nombre
export const consultarDepartamentoPorNombre = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;

    const departamentoEncontrado = await departamento.findOne({
      where: { nombre: nombre },
      attributes:["nombre"]
    });

    if (departamentoEncontrado) {
      res.json(departamentoEncontrado);
    } else {
      res.status(400).json({
        msg: "No se encontro el departamento especificado",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar el departamento" });
  }
};
