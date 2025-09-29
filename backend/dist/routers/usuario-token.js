"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_token_1 = require("../controllers/usuario-token");
const usuario_1 = require("../controllers/usuario");
const router = (0, express_1.Router)();
router.get("/consultar-todos-tokens", usuario_token_1.consultartodosTokens);
router.post("/guardarToken", usuario_token_1.crearToken);
router.get("/token-usuarios/:usuarioId", usuario_token_1.consultarTokenPorUsuario);
router.put("/actualizarToken/:id", usuario_token_1.actualizarToken);
router.delete("/eliminarTokens/:usuarioId", usuario_token_1.eliminarTok);
router.delete("/eliminarToken/:token", usuario_token_1.eliminarTokenn);
router.post("/iniciar-sesion", usuario_1.iniciarSesion);
exports.default = router;
//# sourceMappingURL=usuario-token.js.map