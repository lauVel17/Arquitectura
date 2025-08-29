import express, { Application } from "express";
import cors from "cors";
import db from "../db/conexion";
import path from "path";
import { createServer, Server as HTTPServer } from "http";
import dotenv from "dotenv";
dotenv.config();

/* IMPORT RUTAS */

class server {
  private app: Application;
  private port: string;
  private apiPaths = {
    //
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
    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor conectado en el puerto " + this.port);
    });
  }
}

export default server;
