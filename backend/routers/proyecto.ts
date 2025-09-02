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
router.get("/consultar-proyectos-por/:ciudad", consultarProyectoPorCiudad);
router.get(
  "/consultar-proyectos-por/:departamento",
  consultarProyectoPorDepartamento
);
router.get(
  "/consultar-proyectos-por/:pais",
  consultarProyectoPorPaís
);
