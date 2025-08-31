import { Request, Response } from "express";
import proyecto from "../models/proyecto";
//consultar departamento
export const consultarProy = async (req: Request, res: Response) => {
  try {
    const constproy = await proyecto.findAll({
      /* order: [["idproyecto", "DESC"]], */
    });

    if (constproy.length === 0) {
      return res.status(400).json({ msg: "No se encontró el proyecto" });
    }

    res.json(constproy);
  } catch (error) {
    console.error("Error al consultar el proyecto:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
//Crear proyecto
export const createProyecto = async (req: Request, resp: Response) => {
  const { body } = req;
  try {
    console.log("Datos recibidos ", body);
    const proyCreate = await proyecto.create({
    idproyecto: body.idproyecto,
    nombre: body.nombre,
    descripcion: body.descripcion,
    ciudadid: body.ciudadid,
    fechainicio: body.fechainicio,
    fechafin: body.fechafin,
    });
    resp.status(200).json({
      msg: "El proyecto ha sido creado exitosamente",
      proyCreate,
    });
    }catch(error){
        console.log("Error al crear el proyecto ",error);
        resp.status(500).json({
            msg:"No se logró completar la creación del proyecto ",
        });
    }
 }

//Consultar proyecto
export const consultProyecto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ProyectCons = await proyecto.findByPk(id);
  if (!ProyectCons) {
    res.json(ProyectCons);
  } else {
    res.status(400).json({
      msg: "No se encontró el proyecto especificado",
    });
  }
};

//Actualizar proyecto
export const updateProyecto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const proyectUpdate= await proyecto.findByPk(id);
    if (!proyectUpdate) {
      return res.status(404).json({
        msg: "No se encontró el proyecto",
      });
    }

    console.log("Datos recibidos para proceder la actualización", body);
    await proyectUpdate.update({
        idproyecto: body.idproyecto,
        nombre: body.nombre,
        descripcion: body.descripcion,
        ciudadid: body.ciudadid,
        fechainicio: body.fechainicio,
        fechafin: body.fechafin,
    });
    res.status(200).json({
      msg: "E   l proyecto se ha actualizado correctamente",
      proyectUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo completar la actualización del departamento, intente nuevamente más tarde.",
    });
  }
};

//Eliminar proyecto
export const delateProyecto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proyectdelate = await proyecto.findByPk(id);
  if (!proyectdelate) {
    return res.status(404).json({
      msg: "No se encontró el proyecto",
    });
  }
  await proyectdelate.destroy();
  res.status(200).json({
    msg: "El proyecto  ha sido eliminado de forma correcta",
    proyecto,
  });
};