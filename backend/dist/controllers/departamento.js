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
exports.consultartodosDepa = exports.consultarDepartamentoPorNombre = exports.delateDepart = exports.updateDepart = exports.consultDepart = exports.createDepart = exports.consultarDepart = void 0;
const departamento_1 = __importDefault(require("../models/departamento"));
const pais_1 = __importDefault(require("../models/pais"));
//consultar departamento
const consultarDepart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departC = yield departamento_1.default.findAll({
            attributes: ["nombre"]
        });
        if (departC.length === 0) {
            return res.status(400).json({ msg: "No se encontró el departamento" });
        }
        res.json(departC);
    }
    catch (error) {
        console.error("Error al consultar el departamento:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.consultarDepart = consultarDepart;
//Crear departamento
const createDepart = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log("Datos recibidos ", body);
        const paisEncontrado = yield pais_1.default.findOne({
            where: { nombre: body.nombrePais },
            attributes: ["idpais"],
        });
        if (!paisEncontrado) {
            return resp.status(404).json({
                msg: `No se encontró un país con el nombre: ${body.nombrePais}`,
            });
        }
        const depcreate = yield departamento_1.default.create({
            idpais: paisEncontrado.idpais,
            nombre: body.nombre,
        });
        resp.status(200).json({
            msg: "El departamento ha sido creado exitosamente",
            depcreate,
        });
    }
    catch (error) {
        console.error("Error al crear el departamento", error);
        resp.status(500).json({
            msg: "No se logró completar la creación del departamento",
        });
    }
});
exports.createDepart = createDepart;
//Consultar departamento
const consultDepart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departcons = yield departamento_1.default.findByPk(id);
    if (departcons) {
        res.json(departcons);
    }
    else {
        res.status(400).json({
            msg: "No se encontró el departamento especificado",
        });
    }
});
exports.consultDepart = consultDepart;
//Actualizar departamento
const updateDepart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const updateDep = yield departamento_1.default.findByPk(id);
        if (!updateDep) {
            return res.status(404).json({
                msg: "No se encontró el departamento",
            });
        }
        console.log("Datos recibidos para proceder la actualización", body);
        yield updateDep.update({
            /*     iddepartamento:body.iddepartamento,
                idpais: body.idpais, */
            nombre: body.nombre,
        });
        res.status(200).json({
            msg: "El departamento se ha actualizado correctamente",
            updateDep,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo completar la actualización del departamento, intente nuevamente más tarde.",
        });
    }
});
exports.updateDepart = updateDepart;
//Eliminar departamento
const delateDepart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departdelate = yield departamento_1.default.findByPk(id);
    if (!departdelate) {
        return res.status(404).json({
            msg: "No se encontró el departamento",
        });
    }
    yield departdelate.destroy();
    res.status(200).json({
        msg: "El departamento  ha sido eliminado de forma correcta",
        departamento: departamento_1.default,
    });
});
exports.delateDepart = delateDepart;
// consultar depto por nombre
const consultarDepartamentoPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const departamentoEncontrado = yield departamento_1.default.findOne({
            where: { nombre: nombre },
            attributes: ["nombre"]
        });
        if (departamentoEncontrado) {
            res.json(departamentoEncontrado);
        }
        else {
            res.status(400).json({
                msg: "No se encontro el departamento especificado",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el departamento" });
    }
});
exports.consultarDepartamentoPorNombre = consultarDepartamentoPorNombre;
const consultartodosDepa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departamentos = yield departamento_1.default.findAll({
        where: {
            idpais: id,
        },
    });
    if (departamentos.length == 0) {
        res.status(400).json({
            msg: "No se encontraron departamentos",
        });
    }
    else {
        return res.json(departamentos);
    }
});
exports.consultartodosDepa = consultartodosDepa;
//# sourceMappingURL=departamento.js.map