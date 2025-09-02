"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudad_1 = require("../controllers/ciudad");
const router = (0, express_1.Router)();
router.get("/consultar-todos-ciudades", ciudad_1.consultarciudad);
router.get("/consultar-ciudad/:id", ciudad_1.consultCiudad);
router.post("/crear-ciudad", ciudad_1.createCiudad);
router.put("/actualizar-ciudad/:id", ciudad_1.updateCiudad);
router.delete("/eliminar-ciudad/:id", ciudad_1.delateCiudad);
router.get("/consultar-ciudad-por/:nombre", ciudad_1.consultarCiudadPorNombre);
exports.default = router;
//# sourceMappingURL=ciudad.js.map