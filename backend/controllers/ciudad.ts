import { Request, Response } from "express";
import ciudad from "../models/ciudad";
import departamento from "../models/departamento";

//consultar todas las ciudades
export const consultarciudad = async (req: Request, res: Response) => {
  try {
    const ciudades = await ciudad.findAll({
      attributes: ["idciudad","nombre"],
    });

    if (ciudades.length === 0) {
      return res.status(400).json({ msg: "No se encontraron las  ciudades" });
    }

    res.json(ciudades);
  } catch (error) {
    console.error("Error al consultar las ciudades:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
//Crear ciudad
export const createCiudad = async (req: Request, resp: Response) => {
  const { body } = req;

  try {
    console.log("Datos recibidos ", body);

    const departamentoEncontrado = await departamento.findOne({
      where: { nombre: body.nombreDepartamento },
      attributes: ["iddepartamento"],
    });

    if (!departamentoEncontrado) {
      return resp.status(404).json({
        msg: `No se encontró un departamento con el nombre: ${body.nombreDepartamento}`,
      });
    }

    const ciudadC = await ciudad.create({
      iddepartamento:departamentoEncontrado!.iddepartamento,
      nombre: body.nombre,
    });

    resp.status(200).json({
      msg: "La ciudad ha sido creada exitosamente",
      ciudadC,
    });
  } catch (error) {
    console.error("Error al crear la ciudad", error);
    resp.status(500).json({
      msg: "No se logró completar la creación de la ciudad",
    });
  }
};

//Consultar ciudad
export const consultCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ciudadCons = await ciudad.findByPk(id);
  if (ciudadCons) {
    res.json(ciudadCons);
  } else {
    res.status(400).json({
      msg: "No se encontro ciudad especificada",
    });
  }
};

//Actualizar Ciudad
export const updateCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const actC = await ciudad.findByPk(id);
    if (!actC) {
      return res.status(404).json({
        msg: "No se encontró la ciudad",
      });
    }

    console.log("Datos recibidos para proceder la actualización", body);
    await actC.update({
      //idciudad: body.idciudad,
      /*   iddepartamento: body.iddepartamento, */
      nombre: body.nombre,
    });
    res.status(200).json({
      msg: "La ciudad se ha actualizado correctamente",
      actC,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo completar la actualización de la ciudad, intente nuevamente más tarde.",
    });
  }
};

//Eliminar ciudad
export const delateCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteciud = await ciudad.findByPk(id);
  if (!deleteciud) {
    return res.status(404).json({
      msg: "No se encontro la ciudad",
    });
  }
  await deleteciud.destroy();
  res.status(200).json({
    msg: "La ciudad ha sido eliminada de forma correcta",
    ciudad,
  });
};
export const consultarCiudadPorNombre = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;

    const ciudadEncontrada = await ciudad.findOne({
      where: { nombre: nombre },
      attributes: ["nombre"],
    });

    if (ciudadEncontrada) {
      res.json(ciudadEncontrada);
    } else {
      res.status(400).json({
        msg: "No se encontro la ciudad especificada",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar la ciudad" });
  }
};
export const consultartodosciudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ciudades = await ciudad.findAll({
    where: {
      iddepartamento: id,
    },
  });

  if (ciudades.length == 0) {
    res.status(400).json({
      msg: "No se encontraron ciudades",
    });
  } else {
    return res.json(ciudades);
  }
};