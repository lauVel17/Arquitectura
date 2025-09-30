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
exports.consultarUsuariosPorProyecto = exports.consultarProyectosPorUsuario = exports.consultarParticipaciones = exports.delatePart = exports.updatePart = exports.consultPart = exports.createPart = exports.consultarPart = void 0;
const participaciones_1 = __importDefault(require("../models/participaciones"));
const usuarios_1 = __importDefault(require("../models/usuarios"));
const proyecto_1 = __importDefault(require("../models/proyecto"));
//consultar departamento
const consultarPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partCons = yield participaciones_1.default.findAll({
        /* order: [["idparticipaciones", "DESC"]], */
        });
        if (partCons.length === 0) {
            return res.status(400).json({ msg: "No se encontró el departamento" });
        }
        res.json(partCons);
    }
    catch (error) {
        console.error("Error al consultar el participaciones:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.consultarPart = consultarPart;
const createPart = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log("Datos recibidos ", body);
        const proyectoEncontrado = yield proyecto_1.default.findOne({
            where: { nombre: body.nombreProyecto },
            attributes: ["idproyecto"],
        });
        if (!proyectoEncontrado) {
            return resp.status(404).json({
                msg: `No se encontró un proyecto con el nombre: ${body.nombreProyecto}`,
            });
        }
        const partCreate = yield participaciones_1.default.create({
            proyectoid: proyectoEncontrado.idproyecto,
            usuarioid: body.usuarioid,
        });
        resp.status(200).json({
            msg: "La participación del usuario al proyecto ha sido creada exitosamente",
        });
    }
    catch (error) {
        console.error("Error al crear la participación ", error);
        resp.status(500).json({
            msg: "No se logró completar la creación de la participación",
        });
    }
});
exports.createPart = createPart;
//Consultar participación
const consultPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const partcons = yield participaciones_1.default.findByPk(id);
    if (partcons) {
        res.json(partcons);
    }
    else {
        res.status(400).json({
            msg: "No se encontró la participación especificada",
        });
    }
});
exports.consultPart = consultPart;
//Actualizar participación
const updatePart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const partupdate = yield participaciones_1.default.findByPk(id);
        if (!partupdate) {
            return res.status(404).json({
                msg: "No se encontró la participación",
            });
        }
        console.log("Datos recibidos para proceder la actualización", body);
        yield partupdate.update({
            idparticipaciones: body.idparticipaciones,
            proyectoid: body.proyectoid,
            usuarioid: body.usuarioid,
        });
        res.status(200).json({
            msg: "La participación  se ha actualizado correctamente",
            partupdate,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo completar la actualización del departamento, intente nuevamente más tarde.",
        });
    }
});
exports.updatePart = updatePart;
//Eliminar participación
const delatePart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const partdelate = yield participaciones_1.default.findByPk(id);
    if (!partdelate) {
        return res.status(404).json({
            msg: "No se encontró la  participación",
        });
    }
    yield partdelate.destroy();
    res.status(200).json({
        msg: "La participación  ha sido eliminada de forma correcta",
        participacion: participaciones_1.default,
    });
});
exports.delatePart = delatePart;
const consultarParticipaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const usuarioEncontrado = yield usuarios_1.default.findOne({
            where: { nombreapellido: nombre },
        });
        if (!usuarioEncontrado) {
            return res.status(404).json({
                mensaje: `No se encontró el usuario con nombre ${nombre}`,
            });
        }
        const participaciones = yield participaciones_1.default.findAll({
            where: { usuarioid: usuarioEncontrado.nodocumento },
            include: [
                {
                    model: proyecto_1.default,
                    as: "proyecto",
                },
            ],
        });
        res.json({
            mensaje: `El usuario ${nombre} ha participado en ${participaciones.length} proyectos y estos son:`,
            proyectos: participaciones.map((p) => {
                var _a, _b, _c;
                return ({
                    idProyecto: (_a = p.proyecto) === null || _a === void 0 ? void 0 : _a.idProyecto,
                    nombre: (_b = p.proyecto) === null || _b === void 0 ? void 0 : _b.nombre,
                    descripcion: (_c = p.proyecto) === null || _c === void 0 ? void 0 : _c.descripcion,
                });
            }),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar las participaciones" });
    }
});
exports.consultarParticipaciones = consultarParticipaciones;
// Consultar todos los proyectos de un usuario por su número de documento
const consultarProyectosPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nodocumento } = req.params;
        const usuarioEncontrado = yield usuarios_1.default.findOne({
            where: { nodocumento: Number(nodocumento) },
        });
        if (!usuarioEncontrado) {
            return res.status(404).json({
                msg: `No se encontró un usuario con número de documento ${nodocumento}`,
            });
        }
        const participaciones = yield participaciones_1.default.findAll({
            where: { usuarioid: Number(nodocumento) },
            include: [
                {
                    model: proyecto_1.default,
                    as: "proyecto",
                    attributes: ["idproyecto", "nombre", "descripcion", "fechainicio", "fechafin"],
                },
            ],
        });
        if (participaciones.length === 0) {
            return res.status(200).json({
                msg: `El usuario con documento ${nodocumento} no tiene proyectos registrados.`,
                proyectos: [],
            });
        }
        res.status(200).json({
            msg: `El usuario con documento ${nodocumento} participa en ${participaciones.length} proyecto(s):`,
            proyectos: participaciones.map((p) => {
                var _a, _b, _c, _d, _e;
                return ({
                    idproyecto: (_a = p.proyecto) === null || _a === void 0 ? void 0 : _a.idproyecto,
                    nombre: (_b = p.proyecto) === null || _b === void 0 ? void 0 : _b.nombre,
                    descripcion: (_c = p.proyecto) === null || _c === void 0 ? void 0 : _c.descripcion,
                    fechainicio: (_d = p.proyecto) === null || _d === void 0 ? void 0 : _d.fechainicio,
                    fechafin: (_e = p.proyecto) === null || _e === void 0 ? void 0 : _e.fechafin,
                });
            }),
        });
    }
    catch (error) {
        console.error("Error al consultar proyectos por usuario:", error);
        res.status(500).json({
            msg: "Error en el servidor al consultar proyectos por usuario",
        });
    }
});
exports.consultarProyectosPorUsuario = consultarProyectosPorUsuario;
const consultarUsuariosPorProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idproyecto } = req.params;
        // Verificar si existe el proyecto
        const proyectoEncontrado = yield proyecto_1.default.findOne({
            where: { idproyecto: Number(idproyecto) },
        });
        if (!proyectoEncontrado) {
            return res.status(404).json({
                msg: `No se encontró un proyecto con id ${idproyecto}`,
            });
        }
        // Buscar todas las participaciones del proyecto e incluir usuarios
        const participaciones = yield participaciones_1.default.findAll({
            where: { proyectoid: Number(idproyecto) },
            include: [
                {
                    model: usuarios_1.default,
                    as: "usuario",
                },
            ],
        });
        if (participaciones.length === 0) {
            return res.status(200).json({
                msg: `El proyecto con id ${idproyecto} no tiene usuarios participantes.`,
                usuarios: [],
            });
        }
        res.status(200).json({
            msg: `El proyecto con id ${idproyecto} tiene ${participaciones.length} participante(s):`,
            usuarios: participaciones.map((p) => {
                var _a, _b, _c, _d, _e;
                return ({
                    nodocumento: (_a = p.usuario) === null || _a === void 0 ? void 0 : _a.nodocumento,
                    nombre: (_b = p.usuario) === null || _b === void 0 ? void 0 : _b.nombreapellido,
                    apellido: (_c = p.usuario) === null || _c === void 0 ? void 0 : _c.apellido,
                    email: (_d = p.usuario) === null || _d === void 0 ? void 0 : _d.correo,
                    telefono: (_e = p.usuario) === null || _e === void 0 ? void 0 : _e.telefono
                });
            }),
        });
    }
    catch (error) {
        console.error("Error al consultar usuarios por proyecto:", error);
        res.status(500).json({
            msg: "Error en el servidor al consultar usuarios por proyecto",
        });
    }
});
exports.consultarUsuariosPorProyecto = consultarUsuariosPorProyecto;
//# sourceMappingURL=participacion.js.map