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
exports.eliminarTokenn = exports.eliminarTok = exports.actualizarToken = exports.crearToken = exports.consultarTokenPorUsuario = exports.consultartodosTokens = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const usuario_token_1 = __importDefault(require("../models/usuario-token"));
dotenv_1.default.config();
/* ------------------- GESTIONAR TOKENS---------------------------- */
/* ----------- CONSULTAR GENERAL DE LOS TOKENS--------------------- */
const consultartodosTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_token_1.default.findAll();
    if (usuarios.length == 0) {
        res.status(400).json({
            msg: "No se encontraron tokens",
        });
    }
    else {
        res.json(usuarios);
    }
});
exports.consultartodosTokens = consultartodosTokens;
/* ------------------- CONSULTAR TOKEN POR USUARIOS ---------------------------- */
const consultarTokenPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId } = req.params;
    try {
        const usuarios = yield usuario_token_1.default.findAll({
            where: {
                usuarioId,
            },
        });
        if (usuarios.length > 0) {
            res.json(usuarios);
        }
        else {
            res.status(404).json({
                msg: `No se encontraron tokens para el usuario`,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
            error,
        });
    }
});
exports.consultarTokenPorUsuario = consultarTokenPorUsuario;
/* ------------------- CREAR USUARIOTOKEN ---------------------------- */
const crearToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log("Datos recibidos para crear el token:", body);
        const usuarioToken = yield usuario_token_1.default.create({
            idUsuarioToken: body.idUsuarioToken,
            usuarioId: body.usuarioId,
            token: body.token,
        });
        res.status(200).json({
            msg: "El token del usuario ha sido guardado exitosamente",
            usuarioToken,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.crearToken = crearToken;
/* ------------------- ACTUALIZAR USUARIOTOKEN ---------------------------- */
const actualizarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuarioToken = yield usuario_token_1.default.findByPk(id);
        if (!usuarioToken) {
            return res.status(404).json({
                msg: "No se encontro el usuario especificado"
            });
        }
        console.log("Datos recibidos para actualización:", body);
        yield usuarioToken.update({
            token: body.token,
        });
        res.status(200).json({
            msg: "El token del usuario se ha actualizado exitosamente",
            usuarioToken,
        });
    }
    catch (error) {
        console.log("Error al actualizar el usuario:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.actualizarToken = actualizarToken;
// ------------------- ELIMINAR TOKENS DEL USUARIO ----------------------------
const eliminarTok = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId } = req.params;
    try {
        if (!usuarioId) {
            return res.status(400).json({ message: "Por favor, ingrese el usuario" });
        }
        const tokensEliminados = yield usuario_token_1.default.destroy({
            where: { usuarioId },
        });
        if (tokensEliminados === 0) {
            return res
                .status(404)
                .json({ message: "No se encontraron tokens para el usuario." });
        }
        return res
            .status(200)
            .json({ message: "Todos los tokens han sido eliminados exitosamente." });
    }
    catch (error) {
        console.error("Error al eliminar los tokens:", error);
        return res
            .status(500)
            .json({ message: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.", error });
    }
});
exports.eliminarTok = eliminarTok;
/* ------------------- ELIMINAR TOKEN ---------------------------- */
const eliminarTokenn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const usuario = yield usuario_token_1.default.findOne({
            where: { token: token },
        });
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe el token ${token}`,
            });
        }
        yield usuario.destroy();
        return res.status(200).json({
            msg: "El token ha sido eliminado exitosamente",
            usuario,
        });
    }
    catch (error) {
        console.error("Error al eliminar el token:", error);
        return res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.eliminarTokenn = eliminarTokenn;
//# sourceMappingURL=usuario-token.js.map