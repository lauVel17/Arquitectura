"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pais_1 = require("../controllers/pais");
const router = (0, express_1.Router)();
router.get("/consultar-todos-paises", pais_1.consultarPais);
router.get("/consultar-pais/:id", pais_1.consultPais);
router.post("/crear-pais", pais_1.createPais);
router.put("/actualizar-pais/:id", pais_1.updatePais);
router.delete("/eliminar-pais/:id", pais_1.delatePais);
router.get("/consultar-pais-por/:nombre", pais_1.consultarPaisPorNombre);
exports.default = router;
//# sourceMappingURL=pais.js.map