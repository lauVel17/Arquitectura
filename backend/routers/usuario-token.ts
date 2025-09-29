import { Router } from "express";
import {
  crearToken,
  actualizarToken,
  consultarTokenPorUsuario,
  consultartodosTokens,
  eliminarTok,
  eliminarTokenn
} from "../controllers/usuario-token";
import { iniciarSesion } from "../controllers/usuario";

const router = Router();

router.get("/consultar-todos-tokens", consultartodosTokens);
router.post("/guardarToken", crearToken);
router.get("/token-usuarios/:usuarioId", consultarTokenPorUsuario);
router.put("/actualizarToken/:id", actualizarToken);
router.delete("/eliminarTokens/:usuarioId", eliminarTok);
router.delete("/eliminarToken/:token", eliminarTokenn);
router.post("/iniciar-sesion", iniciarSesion);

export default router;
