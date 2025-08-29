"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conexion_1 = __importDefault(require("../db/conexion"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* IMPORT RUTAS */
class server {
    constructor() {
        this.apiPaths = {
        //
        };
        this.app = (0, express_1.default)();
        /* definir puerto de conexion */
        this.port = process.env.PORT || "8000";
        /* definir conexion a la base de datos */
        this.dbConnection();
        /* definir middlewares */
        this.middlewares();
        /* Definir rutas */
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                console.log("Conexion a la base de datos exitosa");
            }
            catch (error) {
                console.log("Error al conectar");
            }
        });
    }
    middlewares() {
        /* CORS */
        this.app.use((0, cors_1.default)());
        /* Body */
        this.app.use(express_1.default.json());
    }
    routes() { }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor conectado en el puerto " + this.port);
        });
    }
}
exports.default = server;
//# sourceMappingURL=server.js.map