"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const ciudad_1 = __importDefault(require("./ciudad"));
class proyecto extends sequelize_1.Model {
}
proyecto.init({
    idproyecto: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "numero_proyecto",
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "nombre_proyecto"
    },
    descripcion: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "descripcion"
    },
    ciudadid: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "nombre_ciudad"
    },
    fechainicio: {
        type: sequelize_1.DataTypes.DATE,
        field: "fecha_inicio"
    },
    fechafin: {
        type: sequelize_1.DataTypes.DATE,
        field: "fecha_fin"
    },
}, {
    sequelize: conexion_1.default,
    modelName: "proyecto",
    tableName: "proyecto",
    timestamps: false,
});
proyecto.belongsTo(ciudad_1.default, {
    foreignKey: "ciudadid",
    as: "ciudad"
});
ciudad_1.default.hasMany(proyecto, {
    foreignKey: "ciudadid",
    as: "proyecto"
});
exports.default = proyecto;
//# sourceMappingURL=proyecto.js.map