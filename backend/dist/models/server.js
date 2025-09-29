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
const usuario_1 = __importDefault(require("../routers/usuario"));
const pais_1 = __importDefault(require("../routers/pais"));
const departamento_1 = __importDefault(require("../routers/departamento"));
const ciudad_1 = __importDefault(require("../routers/ciudad"));
const proyecto_1 = __importDefault(require("../routers/proyecto"));
const participaciones_1 = __importDefault(require("../routers/participaciones"));
const usuario_token_1 = __importDefault(require("../routers/usuario-token"));
dotenv_1.default.config();
/* IMPORT RUTAS */
class server {
    constructor() {
        this.apiPaths = {
            usuario: "/api/usuario",
            pais: "/api/pais",
            departamento: "/api/departamento",
            ciudad: "/api/ciudad",
            proyecto: "/api/proyecto",
            participaciones: "/api/participaciones",
            usuarioToken: "/api/usToken",
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
    routes() {
        this.app.use(this.apiPaths.usuario, usuario_1.default);
        this.app.use(this.apiPaths.pais, pais_1.default);
        this.app.use(this.apiPaths.departamento, departamento_1.default);
        this.app.use(this.apiPaths.ciudad, ciudad_1.default);
        this.app.use(this.apiPaths.proyecto, proyecto_1.default);
        this.app.use(this.apiPaths.participaciones, participaciones_1.default);
        this.app.use(this.apiPaths.usuarioToken, usuario_token_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor conectado en el puerto " + this.port);
        });
    }
}
exports.default = server;
//# sourceMappingURL=server.js.map