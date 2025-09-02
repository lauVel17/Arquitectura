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
exports.delateusua = exports.updateUser = exports.consultUserid = exports.createUser = exports.consultarAllUser = void 0;
const ciudad_1 = __importDefault(require("../models/ciudad"));
const usuarios_1 = __importDefault(require("../models/usuarios"));
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
        const ciudadEncontrada = yield ciudad_1.default.findOne({
            where: { nombre: body.nombreCiudad },
        });
        if (!ciudadEncontrada) {
            return resp.status(400).json({
                msg: `La ciudad ${body.nombreCiudad} no fue encontrada`,
            });
        }
        const usuarioc = yield usuarios_1.default.create({
            nodocumento: body.nodocumento,
            nombreapellido: body.nombreapellido,
            correo: body.correo,
            telefono: body.telefono,
            estado: body.estado,
            fechaingreso: body.fechaingreso,
            ciudadid: ciudadEncontrada.idciudad,
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
    const usuarioc = yield usuarios_1.default.findByPk(id);
    if (usuarioc) {
        res.json({
            msg: "El usuario encontrado es:",
            usuarioc
        });
    }
    else {
        res.status(400).json({
            msg: "No se encontro usuario especificado",
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
            return;
            res.status(404).json({
                msg: "No se encontro el usuario ",
            });
        }
        console.log("Datos recibidos para proceder la actualización", body);
        yield actus.update({
            // nodocumento: body.nodocumento,
            nombreapellido: body.nombreapellido,
            correo: body.correo,
            telefono: body.telefono,
            estado: body.estado,
            fechaingreso: body.fechaingreso,
            ciudadid: body.ciudad,
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
//# sourceMappingURL=usuario.js.map