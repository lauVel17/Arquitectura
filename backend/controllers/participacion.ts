import { Request, Response } from "express";
import participacion from "../models/participaciones";
import usuario from "../models/usuarios";
import proyecto from "../models/proyecto";

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

export const createPart = async (req: Request, resp: Response) => {
  const { body } = req;

  try {
    console.log("Datos recibidos ", body);

    const proyectoEncontrado = await proyecto.findOne({
      where: { nombre: body.nombreProyecto },
      attributes: ["idproyecto"],
    });

    if (!proyectoEncontrado) {
      return resp.status(404).json({
        msg: `No se encontró un proyecto con el nombre: ${body.nombreProyecto}`,
      });
    }

    const partCreate = await participacion.create({
      proyectoid: proyectoEncontrado.idproyecto,

      usuarioid: body.usuarioid,
    });

    resp.status(200).json({
      msg: "La participación del usuario al proyecto ha sido creada exitosamente",
    });
  } catch (error) {
    console.error("Error al crear la participación ", error);
    resp.status(500).json({
      msg: "No se logró completar la creación de la participación",
    });
  }
};

//Consultar participación
export const consultPart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const partcons = await participacion.findByPk(id);
  if (partcons) {
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
    const partupdate = await participacion.findByPk(id);
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
export const consultarParticipaciones = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;

    const usuarioEncontrado = await usuario.findOne({
      where: { nombreapellido: nombre },
    });

    if (!usuarioEncontrado) {
      return res.status(404).json({
        mensaje: `No se encontró el usuario con nombre ${nombre}`,
      });
    }

    const participaciones = await participacion.findAll({
      where: { usuarioid: usuarioEncontrado.nodocumento },
      include: [
        {
          model: proyecto,
          as: "proyecto",
        },
      ],
    });

    res.json({
      mensaje: `El usuario ${nombre} ha participado en ${participaciones.length} proyectos y estos son:`,
      proyectos: participaciones.map((p: any) => ({
        idProyecto: p.proyecto?.idProyecto,
        nombre: p.proyecto?.nombre,
        descripcion: p.proyecto?.descripcion,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar las participaciones" });
  }
};
