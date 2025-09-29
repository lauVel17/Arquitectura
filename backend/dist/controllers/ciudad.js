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
exports.consultartodosciudad = exports.consultarCiudadPorNombre = exports.delateCiudad = exports.updateCiudad = exports.consultCiudad = exports.createCiudad = exports.consultarciudad = void 0;
const ciudad_1 = __importDefault(require("../models/ciudad"));
const departamento_1 = __importDefault(require("../models/departamento"));
//consultar todas las ciudades
const consultarciudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ciudades = yield ciudad_1.default.findAll({
            attributes: ["nombre"],
        });
        if (ciudades.length === 0) {
            return res.status(400).json({ msg: "No se encontraron las  ciudades" });
        }
        res.json(ciudades);
    }
    catch (error) {
        console.error("Error al consultar las ciudades:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.consultarciudad = consultarciudad;
//Crear ciudad
const createCiudad = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log("Datos recibidos ", body);
        const departamentoEncontrado = yield departamento_1.default.findOne({
            where: { nombre: body.nombreDepartamento },
            attributes: ["iddepartamento"],
        });
        if (!departamentoEncontrado) {
            return resp.status(404).json({
                msg: `No se encontró un departamento con el nombre: ${body.nombreDepartamento}`,
            });
        }
        const ciudadC = yield ciudad_1.default.create({
            iddepartamento: departamentoEncontrado.iddepartamento,
            nombre: body.nombre,
        });
        resp.status(200).json({
            msg: "La ciudad ha sido creada exitosamente",
            ciudadC,
        });
    }
    catch (error) {
        console.error("Error al crear la ciudad", error);
        resp.status(500).json({
            msg: "No se logró completar la creación de la ciudad",
        });
    }
});
exports.createCiudad = createCiudad;
//Consultar ciudad
const consultCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ciudadCons = yield ciudad_1.default.findByPk(id);
    if (ciudadCons) {
        res.json(ciudadCons);
    }
    else {
        res.status(400).json({
            msg: "No se encontro ciudad especificada",
        });
    }
});
exports.consultCiudad = consultCiudad;
//Actualizar Ciudad
const updateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const actC = yield ciudad_1.default.findByPk(id);
        if (!actC) {
            return res.status(404).json({
                msg: "No se encontró la ciudad",
            });
        }
        console.log("Datos recibidos para proceder la actualización", body);
        yield actC.update({
            //idciudad: body.idciudad,
            /*   iddepartamento: body.iddepartamento, */
            nombre: body.nombre,
        });
        res.status(200).json({
            msg: "La ciudad se ha actualizado correctamente",
            actC,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo completar la actualización de la ciudad, intente nuevamente más tarde.",
        });
    }
});
exports.updateCiudad = updateCiudad;
//Eliminar ciudad
const delateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteciud = yield ciudad_1.default.findByPk(id);
    if (!deleteciud) {
        return res.status(404).json({
            msg: "No se encontro la ciudad",
        });
    }
    yield deleteciud.destroy();
    res.status(200).json({
        msg: "La ciudad ha sido eliminada de forma correcta",
        ciudad: ciudad_1.default,
    });
});
exports.delateCiudad = delateCiudad;
const consultarCiudadPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const ciudadEncontrada = yield ciudad_1.default.findOne({
            where: { nombre: nombre },
            attributes: ["nombre"],
        });
        if (ciudadEncontrada) {
            res.json(ciudadEncontrada);
        }
        else {
            res.status(400).json({
                msg: "No se encontro la ciudad especificada",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar la ciudad" });
    }
});
exports.consultarCiudadPorNombre = consultarCiudadPorNombre;
const consultartodosciudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ciudades = yield ciudad_1.default.findAll({
        where: {
            iddepartamento: id,
        },
    });
    if (ciudades.length == 0) {
        res.status(400).json({
            msg: "No se encontraron ciudades",
        });
    }
    else {
        return res.json(ciudades);
    }
});
exports.consultartodosciudad = consultartodosciudad;
//# sourceMappingURL=ciudad.js.map