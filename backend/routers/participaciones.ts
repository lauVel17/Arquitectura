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
router.get(
  "/consultar-las-participaciones-de-un-usario/:nombre",
  consultarParticipaciones
);

export default router;