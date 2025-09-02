import { Router } from "express";
import {
  createProyecto,
  consultarProy,
  consultProyecto,
  updateProyecto,
  delateProyecto,
  consultarProyectoPorNombre,
  consultarProyectoPorCiudad,
  consultarProyectoPorDepartamento,
  consultarProyectoPorPaís,
} from "../controllers/proyecto";

const router = Router();

router.get("/consultar-todos-proyectos", consultarProy);
router.get("/consultar-proyecto/:id", consultProyecto);
router.post("/crear-proyecto", createProyecto);
router.put("/actualizar-proyecto/:id", updateProyecto);
router.delete("/eliminar-proyecto/:id", delateProyecto);
router.get("/consultar-proyecto-por/:nombre", consultarProyectoPorNombre);
router.get("/consultar-proyectoC-por/:nombre", consultarProyectoPorCiudad);
router.get(
  "/consultar-proyectoD-por/:nombreDepto",
  consultarProyectoPorDepartamento
);
router.get(
  "/consultar-proyectoP-por/:nombrePais",
  consultarProyectoPorPaís
);

export default router