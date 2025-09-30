import { Request, Response } from "express";
import proyecto from "../models/proyecto";
import usuario from "../models/usuarios";
import participacion from "../models/participaciones";
import ciudad from "../models/ciudad";
import departamento from "../models/departamento";
import pais from "../models/pais";
import { Op } from "sequelize";
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

   
    const ciudadEncontrada = await ciudad.findOne({
      where: { nombre: body.ciudadNombre },
    });

    if (!ciudadEncontrada) {
      return resp.status(400).json({
        msg: `No se encontró la ciudad con nombre: ${body.ciudadNombre}`,
      });
    }
    const proyCreate = await proyecto.create({
      nombre: body.nombre,
      descripcion: body.descripcion,
      ciudadid: ciudadEncontrada.idciudad, 
      fechainicio: body.fechainicio,
      fechafin: body.fechafin,
    });

    resp.status(200).json({
      msg: "El proyecto ha sido creado exitosamente",
      proyCreate,
    });
  } catch (error) {
    console.log("Error al crear el proyecto ", error);
    resp.status(500).json({
      msg: "No se logró completar la creación del proyecto",
    });
  }
};


//Consultar proyecto
export const consultProyecto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ProyectCons = await proyecto.findByPk(id);
  if (ProyectCons) {
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
    const proyectUpdate = await proyecto.findByPk(id);
    if (!proyectUpdate) {
      return res.status(404).json({
        msg: "No se encontró el proyecto",
      });
    }

    console.log("Datos recibidos para proceder la actualización", body);
    await proyectUpdate.update({
   /*    idproyecto: body.idproyecto, */
      nombre: body.nombre,
      descripcion: body.descripcion,
      ciudadid: body.ciudadid,
      fechainicio: body.fechainicio,
      fechafin: body.fechafin,
    });
    res.status(200).json({
      msg: "El proyecto se ha actualizado correctamente",
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


export const consultarProyectoPorNombre = async (
  req: Request,
  res: Response
) => {
  try {
    const { nombre } = req.params;

    const proyectoEncontrado = await proyecto.findOne({
      where: { nombre: nombre },
    });

    if (proyectoEncontrado) {
      res.json(proyectoEncontrado);
    } else {
      res.status(400).json({
        msg: "No se encontro el proyecto especificado",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar el proyecto" });
  }
};

export const consultarProyectoPorCiudad = async (
  req: Request,
  res: Response
) => {
  try {
    const { nombre } = req.params;
    console.log('nombre recibido', nombre)

    const ciudadEncontrada = await ciudad.findOne({
      where: { nombre: nombre },
    });

    if (!ciudadEncontrada) {
      return res.status(404).json({
        mensaje: `No se encontró la ciudad con el nombre ${nombre}`,
      });
    }

    const proyectos = await proyecto.findAll({
      where: { ciudadid: ciudadEncontrada.idciudad },
    });

    res.json({
      mensaje: `Los proyectos que se encuentran en la ciudad ${nombre} son:`,
      proyectos: proyectos.map((p: any) => ({
        idProyecto: p.idProyecto,
        nombre: p.nombre,
        descripcion: p.descripcion,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar los proyectos" });
  }
};

export const consultarProyectoPorDepartamento = async (
  req: Request,
  res: Response
) => {
  try {
    const { nombreDepto } = req.params;

    const departamentoEncontrado = await departamento.findOne({
      where: { nombre: nombreDepto },
    });

    if (!departamentoEncontrado) {
      return res.status(404).json({
        mensaje: `No se encontró el departamento con el nombre ${nombreDepto}`,
      });
    }

    const ciudades = await ciudad.findAll({
      where: { iddepartamento: departamentoEncontrado.iddepartamento },
    });

    if (!ciudades.length) {
      return res.json({
        mensaje: `No se encontraron ciudades en el departamento ${nombreDepto}`,
        proyectos: [],
      });
    }

    const ciudadesIds = ciudades.map((c) => c.idciudad);

    const proyectosEncontrados = await proyecto.findAll({
      where: { ciudadid: ciudadesIds },
    });

    res.json({
      mensaje: `Los proyectos que se encuentran en el departamento ${nombreDepto} son:`,
      proyectos: proyectosEncontrados.map((p) => ({
        idProyecto: p.idproyecto,
        nombre: p.nombre,
        descripcion: p.descripcion,
      })),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al consultar los proyectos por departamento" });
  }
};

export const consultarProyectoPorPaís = async (req: Request, res: Response) => {
  try {
    const { nombrePais } = req.params;

 
    const paisEncontrado = await pais.findOne({
      where: { nombre: nombrePais },
    });

    if (!paisEncontrado) {
      return res.status(404).json({
        mensaje: `No se encontró el país con el nombre ${nombrePais}`,
      });
    }

    const departamentos = await departamento.findAll({
      where: { idpais: paisEncontrado.idpais },
    });

    if (!departamentos.length) {
      return res.json({
        mensaje: `No se encontraron departamentos en el país ${nombrePais}`,
        proyectos: [],
      });
    }


    const departamentosIds = departamentos.map((d) => d.iddepartamento);
    const ciudades = await ciudad.findAll({
      where: { iddepartamento: departamentosIds },
    });

    if (!ciudades.length) {
      return res.json({
        mensaje: `No se encontraron ciudades en el país ${nombrePais}`,
        proyectos: [],
      });
    }
    const ciudadesIds = ciudades.map((c) => c.idciudad);
    const proyectosEncontrados = await proyecto.findAll({
      where: { ciudadid: ciudadesIds },
    });

    res.json({
      mensaje: `Los proyectos que se encuentran en el país ${nombrePais} son:`,
      proyectos: proyectosEncontrados.map((p) => ({
        idProyecto: p.idproyecto,
        nombre: p.nombre,
        descripcion: p.descripcion,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar los proyectos por país" });
  }
};
export const postular = async (req: Request, res: Response) => {
  try {
    const { nodocumento, proyectoid } = req.params;

    const user = await usuario.findOne({ where: { nodocumento: nodocumento } });
    if (!user) {
      return res.status(404).json({ msg: `No se encontró el usuario con documento ${nodocumento}` });
    }

    const proj = await proyecto.findByPk(proyectoid);
    if (!proj) {
      return res.status(404).json({ msg: `No se encontró el proyecto con id ${proyectoid}` });
    }
    const yaExiste = await participacion.findOne({
      where: { usuarioid: nodocumento, proyectoid: proyectoid },
    });

    if (yaExiste) {
      return res.status(409).json({ msg: "El usuario ya está postulado en este proyecto" });
    }

 
    const hoy = new Date();
    const participacionesActivas = await participacion.findAll({
      where: { usuarioid: nodocumento},
      include: [
        {
          model: proyecto,
          as: "proyecto",
          where: { fecha_fin: { [Op.gte]: hoy } },
        },
      ],
    });

    if (participacionesActivas.length >= 2) {
      return res.status(400).json({
        msg: "El usuario ya participa en 2 o más proyectos activos y no puede postularse a otro",
        proyectosActivos: participacionesActivas.map((p: any) => ({
          id: p.proyecto?.idproyecto,
          nombre: p.proyecto?.nombre,
          fechaFin: p.proyecto?.fechafin,
        })),
      });
    }

   
    const nueva = await participacion.create({
      usuarioid: +nodocumento,
      proyectoid:+proyectoid,
    });

    res.status(201).json({
      msg: "Postulación realizada con éxito",
      participacion: nueva,
    });
  } catch (error) {
    console.error("Error al postularse:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
