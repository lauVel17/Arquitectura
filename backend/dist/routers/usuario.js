"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const router = (0, express_1.Router)();
router.get("/consultar-todos-usuarios", usuario_1.consultarAllUser);
router.get("/consultar-usuario/:id", usuario_1.consultUserid);
router.post("/crear-usuario", usuario_1.createUser);
router.put("/actualizar-usuario/:id", usuario_1.updateUser);
router.delete("/eliminar-usuario/:id", usuario_1.delateusua);
exports.default = router;
//# sourceMappingURL=usuario.js.map