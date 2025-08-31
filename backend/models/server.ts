import express, { Application } from "express";
import cors from "cors";
import db from "../db/conexion";
import path from "path";
import { createServer, Server as HTTPServer } from "http";
import dotenv from "dotenv";

import usuarioRoutes from "../routers/usuario"                     
import paisRoutes from "../routers/pais"
import departamentoRoutes from "../routers/departamento"
import ciudadRoutes from "../routers/ciudad"
import proyectoRoutes from "../routers/proyecto"
import participacionesRoutes from "../routers/participaciones" 

dotenv.config();

/* IMPORT RUTAS */

class server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuario: "/api/usuario",
    pais: "/api/pais",
    departamento: "/api/departamento",
    ciudad: "/api/ciudad",
    proyecto: "/api/proyecto",
    participaciones: "/api/participaciones"

  };

  constructor() {
    this.app = express();
    /* definir puerto de conexion */
    this.port = process.env.PORT || "8000";
    /* definir conexion a la base de datos */
    this.dbConnection();
    /* definir middlewares */
    this.middlewares();
    /* Definir rutas */
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Conexion a la base de datos exitosa");
    } catch (error) {
      console.log("Error al conectar");
    }
  }

  middlewares() {
    /* CORS */
    this.app.use(cors());
    /* Body */
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.usuario, usuarioRoutes);
    this.app.use(this.apiPaths.pais, paisRoutes);
    this.app.use(this.apiPaths.departamento, departamentoRoutes);
    this.app.use(this.apiPaths.ciudad, ciudadRoutes);
    this.app.use(this.apiPaths.proyecto, proyectoRoutes);
    this.app.use(this.apiPaths.participaciones, participacionesRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor conectado en el puerto " + this.port);
    });
  }
}

export default server;