import { Router } from "express";
import {
  createUser,
  consultUserid,
  updateUser,
  delateusua,
  consultarAllUser
} from "../controllers/usuario";

const router = Router();

router.get("/consultar-todos-usuarios", consultarAllUser);
router.get("/consultar-usuario/:id", consultUserid);
router.post("/crear-usuario", createUser);
router.put("/actualizar-usuario/:id", updateUser);
router.delete("/eliminar-usuario/:id", delateusua);

export default router;
