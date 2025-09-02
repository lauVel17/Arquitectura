"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participacion_1 = require("../controllers/participacion");
const router = (0, express_1.Router)();
router.get("/consultar-todos-participaciones", participacion_1.consultarPart);
router.get("/consultar-participacion/:id", participacion_1.consultPart);
router.post("/crear-participacion", participacion_1.createPart);
router.get("/consultar-las-participaciones-de-un-usario/:nombre", participacion_1.consultarParticipaciones);
exports.default = router;
//# sourceMappingURL=participaciones.js.map