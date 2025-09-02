import { Router } from "express";
import {
  consultarPais,
  createPais,
  consultPais,
  updatePais,
  delatePais
} from "../controllers/pais";

const router = Router();

router.get("/consultar-todos-paises", consultarPais);
router.get("/consultar-pais/:id", consultPais);
router.post("/crear-pais", createPais);
router.put("/actualizar-pais/:id", updatePais);
router.delete("/eliminar-pais/:id", delatePais);

export default router;