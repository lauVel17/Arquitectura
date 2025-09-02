import { Router } from "express";
import {
  consultPart,
  createPart,
  consultarPart,
  updatePart,
  delatePart,
  consultarParticipaciones,
} from "../controllers/participacion";

const router = Router();

router.get("/consultar-todos-participaciones", consultarPart);
router.get("/consultar-participacion/:id", consultPart);
router.post("/crear-participacion", createPart);
router.put("/actualizar-proyecto/:id", updatePart);
router.delete("/eliminar-proyecto/:id", delatePart);
router.get(
  "/consultar-las-participaciones-de-un-usario/id",
  consultarParticipaciones
);

export default router;