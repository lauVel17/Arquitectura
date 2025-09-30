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
exports.consultarProyectoPorPaís = exports.consultarProyectoPorDepartamento = exports.consultarProyectoPorCiudad = exports.consultarProyectoPorNombre = exports.delateProyecto = exports.updateProyecto = exports.consultProyecto = exports.createProyecto = exports.consultarProy = void 0;
const proyecto_1 = __importDefault(require("../models/proyecto"));
const ciudad_1 = __importDefault(require("../models/ciudad"));
const departamento_1 = __importDefault(require("../models/departamento"));
const pais_1 = __importDefault(require("../models/pais"));
//consultar departamento
const consultarProy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const constproy = yield proyecto_1.default.findAll({
        /* order: [["idproyecto", "DESC"]], */
        });
        if (constproy.length === 0) {
            return res.status(400).json({ msg: "No se encontró el proyecto" });
        }
        res.json(constproy);
    }
    catch (error) {
        console.error("Error al consultar el proyecto:", error);
        res.status(500).json({
            msg: "No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.",
        });
    }
});
exports.consultarProy = consultarProy;
//Crear proyecto
const createProyecto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log("Datos recibidos ", body);
        const proyCreate = yield proyecto_1.default.create({
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
    }
    catch (error) {
        console.log("Error al crear el proyecto ", error);
        resp.status(500).json({
            msg: "No se logró completar la creación del proyecto",
        });
    }
});
exports.createProyecto = createProyecto;
//Consultar proyecto
const consultProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ProyectCons = yield proyecto_1.default.findByPk(id);
    if (ProyectCons) {
        res.json(ProyectCons);
    }
    else {
        res.status(400).json({
            msg: "No se encontró el proyecto especificado",
        });
    }
});
exports.consultProyecto = consultProyecto;
//Actualizar proyecto
const updateProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const proyectUpdate = yield proyecto_1.default.findByPk(id);
        if (!proyectUpdate) {
            return res.status(404).json({
                msg: "No se encontró el proyecto",
            });
        }
        console.log("Datos recibidos para proceder la actualización", body);
        yield proyectUpdate.update({
            fechainicio: body.fechainicio,
            fechafin: body.fechafin,
        });
        res.status(200).json({
            msg: "El proyecto se ha actualizado correctamente",
            proyectUpdate,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo completar la actualización del departamento, intente nuevamente más tarde.",
        });
    }
});
exports.updateProyecto = updateProyecto;
//Eliminar proyecto
const delateProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const proyectdelate = yield proyecto_1.default.findByPk(id);
    if (!proyectdelate) {
        return res.status(404).json({
            msg: "No se encontró el proyecto",
        });
    }
    yield proyectdelate.destroy();
    res.status(200).json({
        msg: "El proyecto  ha sido eliminado de forma correcta",
        proyecto: proyecto_1.default,
    });
});
exports.delateProyecto = delateProyecto;
const consultarProyectoPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const proyectoEncontrado = yield proyecto_1.default.findOne({
            where: { nombre: nombre },
        });
        if (proyectoEncontrado) {
            res.json(proyectoEncontrado);
        }
        else {
            res.status(400).json({
                msg: "No se encontro el proyecto especificado",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el proyecto" });
    }
});
exports.consultarProyectoPorNombre = consultarProyectoPorNombre;
const consultarProyectoPorCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        console.log('nombre recibido', nombre);
        const ciudadEncontrada = yield ciudad_1.default.findOne({
            where: { nombre: nombre },
        });
        if (!ciudadEncontrada) {
            return res.status(404).json({
                mensaje: `No se encontró la ciudad con el nombre ${nombre}`,
            });
        }
        const proyectos = yield proyecto_1.default.findAll({
            where: { ciudadid: ciudadEncontrada.idciudad },
        });
        res.json({
            mensaje: `Los proyectos que se encuentran en la ciudad ${nombre} son:`,
            proyectos: proyectos.map((p) => ({
                idProyecto: p.idProyecto,
                nombre: p.nombre,
                descripcion: p.descripcion,
            })),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar los proyectos" });
    }
});
exports.consultarProyectoPorCiudad = consultarProyectoPorCiudad;
const consultarProyectoPorDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreDepto } = req.params;
        const departamentoEncontrado = yield departamento_1.default.findOne({
            where: { nombre: nombreDepto },
        });
        if (!departamentoEncontrado) {
            return res.status(404).json({
                mensaje: `No se encontró el departamento con el nombre ${nombreDepto}`,
            });
        }
        const ciudades = yield ciudad_1.default.findAll({
            where: { iddepartamento: departamentoEncontrado.iddepartamento },
        });
        if (!ciudades.length) {
            return res.json({
                mensaje: `No se encontraron ciudades en el departamento ${nombreDepto}`,
                proyectos: [],
            });
        }
        const ciudadesIds = ciudades.map((c) => c.idciudad);
        const proyectosEncontrados = yield proyecto_1.default.findAll({
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
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Error al consultar los proyectos por departamento" });
    }
});
exports.consultarProyectoPorDepartamento = consultarProyectoPorDepartamento;
const consultarProyectoPorPaís = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombrePais } = req.params;
        const paisEncontrado = yield pais_1.default.findOne({
            where: { nombre: nombrePais },
        });
        if (!paisEncontrado) {
            return res.status(404).json({
                mensaje: `No se encontró el país con el nombre ${nombrePais}`,
            });
        }
        const departamentos = yield departamento_1.default.findAll({
            where: { idpais: paisEncontrado.idpais },
        });
        if (!departamentos.length) {
            return res.json({
                mensaje: `No se encontraron departamentos en el país ${nombrePais}`,
                proyectos: [],
            });
        }
        const departamentosIds = departamentos.map((d) => d.iddepartamento);
        const ciudades = yield ciudad_1.default.findAll({
            where: { iddepartamento: departamentosIds },
        });
        if (!ciudades.length) {
            return res.json({
                mensaje: `No se encontraron ciudades en el país ${nombrePais}`,
                proyectos: [],
            });
        }
        const ciudadesIds = ciudades.map((c) => c.idciudad);
        const proyectosEncontrados = yield proyecto_1.default.findAll({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar los proyectos por país" });
    }
});
exports.consultarProyectoPorPaís = consultarProyectoPorPaís;
//# sourceMappingURL=proyecto.js.map