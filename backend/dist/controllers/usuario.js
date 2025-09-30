"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarContrasena = exports.actualizarEstadoUsuario = exports.consultarIden = exports.iniciarSesion = exports.delateusua = exports.updateUser = exports.consultUserid = exports.createUser = exports.consultarAllUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_1 = __importDefault(require("../models/usuarios"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
//consultar todas los usuarios
const consultarAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarios_1.default.findAll({
        /* order: [["idUsuario", "DESC"]], */
        });
        if (usuarios.length === 0) {
            return res.status(400).json({ msg: "No se encontraron usuarios" });
        }
        res.json(usuarios);
    }
    catch (error) {
        console.error("Error al consultar usuarios:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.consultarAllUser = consultarAllUser;
//Crear usuario
const createUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
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
        const encriptar = (0, md5_1.default)(contrasena).toString();
        const usuarioc = yield usuarios_1.default.create({
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
    }
    catch (error) {
        console.log("Error al crear el usuario", error);
        resp.status(500).json({
            msg: "No se logró completar la creación del usuario",
        });
    }
});
exports.createUser = createUser;
//Consultar usuario
const consultUserid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Usuario = yield usuarios_1.default.findByPk(id);
    if (Usuario) {
        res.json(Usuario);
    }
    else {
        res.status(404).json({
            msg: `No se encontro el usuario especificado`,
        });
    }
});
exports.consultUserid = consultUserid;
//Actualizar usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const actus = yield usuarios_1.default.findByPk(id);
        if (!actus) {
            return res.status(404).json({
                msg: "No se encontro el usuario ",
            });
        }
        console.log("Datos recibidos para proceder la actualización", body);
        let contrasenaEncriptada;
        if (body.contrasena) {
            contrasenaEncriptada = (0, md5_1.default)(body.contrasena).toString();
        }
        yield actus.update({
            // nodocumento: body.nodocumento,
            nombreapellido: body.nombreapellido,
            correo: body.correo,
            telefono: body.telefono,
            estado: body.estado,
            fechaingreso: body.fechaingreso,
            ciudadid: body.ciudadid,
            contrasena: contrasenaEncriptada,
        });
        res.status(200).json({
            msg: "El usuario se ha actualizado correctamente",
            actus,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo completar la actualización del usuario, intente nuevamente más tarde.",
        });
    }
});
exports.updateUser = updateUser;
//Eliminar usuario
const delateusua = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteus = yield usuarios_1.default.findByPk(id);
    if (!deleteus) {
        return res.status(404).json({
            msg: "No se encontro el usuario",
        });
    }
    yield deleteus.destroy();
    res.status(200).json({
        msg: "El usuario ha sido eliminado de forma correcta",
        usuario: usuarios_1.default,
    });
});
exports.delateusua = delateusua;
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nodocumento, contrasena } = req.body;
    try {
        const usuarioI = yield usuarios_1.default.findOne({
            where: { nodocumento },
        });
        if (!usuarioI) {
            return res.status(401).json({
                msg: "No existe un usuario con ese número de identificación",
            });
        }
        const contrasenaValida = (0, md5_1.default)(contrasena) === usuarioI.contrasena;
        console.log("contraseña enviada:", contrasena);
        console.log("md5 frontend:", (0, md5_1.default)(contrasena));
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
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "8h" });
        return res.status(200).json({
            token,
            msg: "Bienvenido",
            nodocumento: usuarioI.nodocumento,
            nombreapellido: usuarioI.nombreapellido,
            correo: usuarioI.correo,
            estado: usuarioI.estado,
        });
    }
    catch (error) {
        console.error("Error de autenticación", error);
        return res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.iniciarSesion = iniciarSesion;
const consultarIden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nodocumento } = req.params;
    try {
        if (!nodocumento) {
            return res
                .status(400)
                .json({ msg: "Por favor, ingrese un No. de identificación" });
        }
        const existeIden = yield usuarios_1.default.findOne({ where: { nodocumento } });
        if (existeIden) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el No. de identificación: ${nodocumento}.`,
                existeIden: true,
            });
        }
        return res
            .status(200)
            .json({ msg: "La identificaciónestá disponible", existeIden: false });
    }
    catch (error) {
        console.error("Error al consultar el NIT:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.consultarIden = consultarIden;
const actualizarEstadoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nodocumento } = req.params;
    const { estado } = req.body;
    try {
        const usuarioEncontrado = yield usuarios_1.default.findByPk(nodocumento);
        if (!usuarioEncontrado) {
            return res.status(404).json({
                msg: "No se encontró el usuario especificado",
            });
        }
        console.log("Estado recibido para actualización:", estado);
        yield usuarioEncontrado.update({ estado });
        return res.status(200).json({
            msg: `El estado del usuario ${usuarioEncontrado.nombreapellido} ha sido cambiado a ${estado}`,
            usuario: usuarioEncontrado,
        });
    }
    catch (error) {
        console.error("Error al actualizar el estado del usuario:", error);
        return res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.actualizarEstadoUsuario = actualizarEstadoUsuario;
const actualizarContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nodocumento = parseInt(req.params.nodocumento, 10);
    const { contrasena } = req.body;
    try {
        const usuarioEncontrado = yield usuarios_1.default.findByPk(nodocumento);
        if (!usuarioEncontrado) {
            return res.status(404).json({
                msg: "No se encontró el usuario especificado",
            });
        }
        const contrasenaActual = usuarioEncontrado.getDataValue("contrasena");
        const contrasenaEncriptada = (0, md5_1.default)(contrasena);
        if (contrasenaEncriptada === contrasenaActual) {
            return res.status(400).json({
                msg: "La nueva contraseña no puede ser igual a la contraseña actual.",
            });
        }
        yield usuarioEncontrado.update({
            contrasena: contrasenaEncriptada,
        });
        res.status(200).json({
            msg: "La contraseña ha sido actualizada exitosamente",
        });
    }
    catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacta al administrador.",
        });
    }
});
exports.actualizarContrasena = actualizarContrasena;
//# sourceMappingURL=usuario.js.map