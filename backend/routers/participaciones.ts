import { Router } from "express";
import {
  consultPart,
  createPart,
  consultarPart,
  updatePart,
  delatePart,
  consultarParticipaciones,
  postular,
  consultarProyectosPorUsuario,
  consultarUsuariosPorProyecto,
} from "../controllers/participacion";

const router = Router();

router.get("/consultar-todos-participaciones", consultarPart);
router.get("/consultar-participacion/:id", consultPart);
router.post("/crear-participacion", createPart);
router.get(
  "/consultar-las-participaciones-de-un-usario/:nombre",
  consultarParticipaciones
);
router.post("/postularse/:nodocumento/:proyectoid", postular);
router.post("/consultar-proyectos-usuarios/:nodocumento", consultarProyectosPorUsuario);
router.get("/consultar-usuarios-proyecto/:idproyecto", consultarUsuariosPorProyecto);

export default router;