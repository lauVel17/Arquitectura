"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_1 = require("../controllers/departamento");
const router = (0, express_1.Router)();
router.get("/consultar-todos-departamentos", departamento_1.consultarDepart);
router.get("/consultar-departamento/:id", departamento_1.consultDepart);
router.post("/crear-departamento", departamento_1.createDepart);
router.put("/actualizar-departamento/:id", departamento_1.updateDepart);
router.delete("/eliminar-departamento/:id", departamento_1.delateDepart);
router.get("/consultar-departamento-por/:nombre", departamento_1.consultarDepartamentoPorNombre);
exports.default = router;
//# sourceMappingURL=departamento.js.map