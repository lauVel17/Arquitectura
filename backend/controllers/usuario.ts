import ciudad from "../models/ciudad";
import { Request, Response } from "express";
import dotenv from "dotenv";
import md5 from "md5";
import jwt from "jsonwebtoken";
import usuario from "../models/usuarios";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
//consultar todas los usuarios
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

    // Usamos la contraseña que viene del frontend
    const contrasena = body.nodocumento;
    if (!contrasena) {
      return resp.status(400).json({
        msg: "La contraseña no puede ser vacía",
      });
    }

    // Encriptamos con MD5
    const encriptar = md5(contrasena).toString();


    const usuarioc = await usuario.create({
      nodocumento: body.nodocumento,
      nombreapellido: body.nombreapellido,
      correo: body.correo,
      telefono: body.telefono,
      estado: body.estado,
      fechaingreso: body.fechaingreso,
      ciudadid: body.idciudad,
      contrasena: encriptar, // ahora se guarda el hash correcto
    });

    resp.status(200).json({
      msg: "El usuario ha sido creado exitosamente",
      usuarioc,
    });
  } catch (error) {
    console.log("Error al crear el usuario", error);
    resp.status(500).json({
      msg: "No se logró completar la creación del usuario",
    });
  }
};


//Consultar usuario
export const consultUserid = async (req: Request, res: Response) => {
   const { id } = req.params;
  const Usuario = await usuario.findByPk(id);

  if (Usuario) {
    res.json(Usuario);
  } else {
    res.status(404).json({
      msg: `No se encontro el usuario especificado`,
    });
  }
}

//Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const actus = await usuario.findByPk(id);
    if (!actus) {
      return res.status(404).json({
        msg: "No se encontro el usuario ",
      });
    }
    console.log("Datos recibidos para proceder la actualización", body);
    let contrasenaEncriptada: string | undefined;
    if (body.contrasena) {
      contrasenaEncriptada = md5(body.contrasena).toString();
    }

    await actus.update({
      // nodocumento: body.nodocumento,
      nombreapellido: body.nombreapellido,
      correo: body.correo,
      telefono: body.telefono,
      estado: body.estado,
      fechaingreso: body.fechaingreso,
      ciudadid: body.ciudad,
      contrasena: contrasenaEncriptada,
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
  if (!deleteus) {
    return res.status(404).json({
      msg: "No se encontro el usuario",
    });
  }
  await deleteus.destroy();
  res.status(200).json({
    msg: "El usuario ha sido eliminado de forma correcta",
    usuario,
  });
};
export const iniciarSesion = async (req: Request, res: Response) => {
  const { nodocumento, contrasena } = req.body;

  try {
    const usuarioI = await usuario.findOne({
      where: { nodocumento },
    });

    if (!usuarioI) {
      return res.status(401).json({
        msg: "No existe un usuario con ese número de identificación",
      });
    }

    const contrasenaValida = md5(contrasena) === usuarioI.contrasena;
    console.log("contraseña enviada:", contrasena);
console.log("md5 frontend:", md5(contrasena));
console.log("hash bd:", usuarioI.contrasena);


    if (!contrasenaValida) {
      return res.status(401).json({
        msg: "Contraseña incorrecta",
      });
    }

    // Verificar el estado del usuario
    if (usuarioI.estado === "Inactivo") {
      return res.status(403).json({
        msg: "El usuario está inactivo. Contactese con el administrador.",
      });
    }

    const payload = {
      nodocumento: usuarioI.nodocumento,
      nombreapellido: usuarioI.nombreapellido,
      correo: usuarioI.correo,
      estado: usuarioI.estado,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

    return res.status(200).json({
      token,
      msg: "Bienvenido",
      nodocumento: usuarioI.nodocumento,
      nombreapellido: usuarioI.nombreapellido,
      correo: usuarioI.correo,
      estado: usuarioI.estado,
    });
  } catch (error) {
    console.error("Error de autenticación", error);
    return res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
export const consultarIden = async (req: Request, res: Response) => {
  const { nodocumento } = req.params;
  try {
    if (!nodocumento) {
      return res
        .status(400)
        .json({ msg: "Por favor, ingrese un No. de identificación" });
    }

    const existeIden = await usuario.findOne({ where: { nodocumento } });

    if (existeIden) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el No. de identificación: ${nodocumento}.`,
        existeIden: true,
      });
    }

    return res
      .status(200)
      .json({ msg: "La identificaciónestá disponible", existeIden: false });
  } catch (error) {
    console.error("Error al consultar el NIT:", error);
    res.status(500).json({
      msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
    });
  }
};
