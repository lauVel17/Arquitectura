"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
class pais extends sequelize_1.Model {
}
pais.init({
    idpais: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "id_pais",
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        field: "nombre"
    },
}, {
    sequelize: conexion_1.default,
    modelName: "pais",
    tableName: "pais",
    timestamps: false,
});
exports.default = pais;
//# sourceMappingURL=pais.js.map