import { Router } from "express";
import {
  createUser,
  consultUserid,
  updateUser,
  delateusua,
  consultarAllUser,
  iniciarSesion,
  consultarIden,
  actualizarEstadoUsuario,
  actualizarContrasena
} from "../controllers/usuario";

const router = Router();

router.get("/consultar-todos-usuarios", consultarAllUser);
router.get("/consultar-usuario/:id", consultUserid);
router.post("/crear-usuario", createUser);
router.put("/actualizar-usuario/:id", updateUser);
router.delete("/eliminar-usuario/:id", delateusua);
router.post("/iniciar-sesion", iniciarSesion);
router.get("/consultar-identificacion/:nodocumento", consultarIden);
router.put("/actualizar-estado/:nodocumento", actualizarEstadoUsuario);
router.put("/actualizar-contrasena/:nodocumento", actualizarContrasena);
export default router;
