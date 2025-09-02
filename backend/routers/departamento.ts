import { Router } from "express";
import {
  consultarDepart,
  createDepart,
  consultDepart,
  updateDepart,
  delateDepart,
  consultarDepartamentoPorNombre
} from "../controllers/departamento";

const router = Router();

router.get("/consultar-todos-departamentos", consultarDepart);
router.get("/consultar-departamento/:id", consultDepart);
router.post("/crear-departamento", createDepart);
router.put("/actualizar-departamento/:id", updateDepart);
router.delete("/eliminar-departamento/:id", delateDepart);
router.get("/consultar-departamento-por/:nombre", consultarDepartamentoPorNombre);

export default router;