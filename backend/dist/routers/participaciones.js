"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participacion_1 = require("../controllers/participacion");
const router = (0, express_1.Router)();
router.get("/consultar-todos-participaciones", participacion_1.consultarPart);
router.get("/consultar-participacion/:id", participacion_1.consultPart);
router.post("/crear-participacion", participacion_1.createPart);
router.get("/consultar-las-participaciones-de-un-usario/:nombre", participacion_1.consultarParticipaciones);
router.post("/postularse/:nodocumento/:proyectoid", participacion_1.postular);
router.post("/consultar-proyectos-usuarios/:nodocumento", participacion_1.consultarProyectosPorUsuario);
router.get("/consultar-usuarios-proyecto/:idproyecto", participacion_1.consultarUsuariosPorProyecto);
exports.default = router;
//# sourceMappingURL=participaciones.js.map