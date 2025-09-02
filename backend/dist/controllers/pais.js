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
exports.consultarPaisPorNombre = exports.delatePais = exports.updatePais = exports.consultPais = exports.createPais = exports.consultarPais = void 0;
const pais_1 = __importDefault(require("../models/pais"));
//consultar pais
const consultarPais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paisc = yield pais_1.default.findAll({
            /* order: [["idpais", "DESC"]], */
            attributes: ["nombre"]
        });
        if (paisc.length === 0) {
            return res.status(400).json({ msg: "No se encontró el pais" });
        }
        res.json(paisc);
    }
    catch (error) {
        console.error("Error al consultar el pais:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.consultarPais = consultarPais;
//Crear pais
const createPais = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log("Datos recibidos ", body);
        const paiscreate = yield pais_1.default.create({
            nombre: body.nombre,
        });
        resp.status(200).json({
            msg: "El pais ha sido creado exitosamente",
            paiscreate,
        });
    }
    catch (error) {
        console.log("Error al crear el pais", error);
        resp.status(500).json({
            msg: "No se logró completar la creación del pais",
        });
    }
});
exports.createPais = createPais;
//Consultar pais
const consultPais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Paiscons = yield pais_1.default.findByPk(id);
    if (Paiscons) {
        res.json(Paiscons);
    }
    else {
        res.status(400).json({
            msg: "No se encontró el pais especificado",
        });
    }
});
exports.consultPais = consultPais;
//Actualizar pais
const updatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const actPais = yield pais_1.default.findByPk(id);
        if (!actPais) {
            return res.status(404).json({
                msg: "No se encontró el pais",
            });
        }
        console.log("Datos recibidos para proceder la actualización", body);
        yield actPais.update({
            nombre: body.nombre,
        });
        res.status(200).json({
            msg: "El pais se ha actualizado correctamente",
            actPais,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo completar la actualización del pais, intente nuevamente más tarde.",
        });
    }
});
exports.updatePais = updatePais;
//Eliminar pais
const delatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const delatePais = yield pais_1.default.findByPk(id);
    if (!delatePais) {
        return res.status(404).json({
            msg: "No se encontró el pais",
        });
    }
    yield delatePais.destroy();
    res.status(200).json({
        msg: "El pais  ha sido eliminado de forma correcta",
        pais: pais_1.default,
    });
});
exports.delatePais = delatePais;
const consultarPaisPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const paisEncontrado = yield pais_1.default.findOne({
            where: { nombre: nombre },
            attributes: ["nombre"]
        });
        if (paisEncontrado) {
            res.json(paisEncontrado);
        }
        else {
            res.status(400).json({
                msg: "No se encontro el país especificado",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el país" });
    }
});
exports.consultarPaisPorNombre = consultarPaisPorNombre;
//# sourceMappingURL=pais.js.map