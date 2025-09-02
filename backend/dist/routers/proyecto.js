"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proyecto_1 = require("../controllers/proyecto");
const router = (0, express_1.Router)();
router.get("/consultar-todos-proyectos", proyecto_1.consultarProy);
router.get("/consultar-proyecto/:id", proyecto_1.consultProyecto);
router.post("/crear-proyecto", proyecto_1.createProyecto);
router.put("/actualizar-proyecto/:id", proyecto_1.updateProyecto);
router.delete("/eliminar-proyecto/:id", proyecto_1.delateProyecto);
router.get("/consultar-proyecto-por/:nombre", proyecto_1.consultarProyectoPorNombre);
router.get("/consultar-proyectoC-por/:nombre", proyecto_1.consultarProyectoPorCiudad);
router.get("/consultar-proyectoD-por/:nombreDepto", proyecto_1.consultarProyectoPorDepartamento);
router.get("/consultar-proyectoP-por/:nombrePais", proyecto_1.consultarProyectoPorPaís);
exports.default = router;
//# sourceMappingURL=proyecto.js.map