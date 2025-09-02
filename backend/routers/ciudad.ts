import { Router } from "express";
import {
 
  consultarciudad,
  consultCiudad,
  createCiudad,
  updateCiudad,
  delateCiudad,
  consultarCiudadPorNombre
} from "../controllers/ciudad";

const router = Router();

router.get("/consultar-todos-ciudades", consultarciudad);
router.get("/consultar-ciudad/:id", consultCiudad);
router.post("/crear-ciudad", createCiudad);
router.put("/actualizar-ciudad/:id", updateCiudad);
router.delete("/eliminar-ciudad/:id", delateCiudad);
router.get("/consultar-ciudad-por/:nombre", consultarCiudadPorNombre);

export default router;