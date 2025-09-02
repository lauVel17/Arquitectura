"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const departamento_1 = __importDefault(require("./departamento"));
class ciudad extends sequelize_1.Model {
}
ciudad.init({
    idciudad: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "id_ciudad",
        primaryKey: true,
        autoIncrement: true,
    },
    iddepartamento: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "departamento_id"
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        field: "nombre"
    },
}, {
    sequelize: conexion_1.default,
    modelName: "ciudad",
    tableName: "ciudad",
    timestamps: false,
});
departamento_1.default.hasMany(ciudad, {
    foreignKey: "iddepartamento",
    as: "ciudad"
});
ciudad.belongsTo(departamento_1.default, {
    foreignKey: "iddepartamento",
    as: "departamento"
});
exports.default = ciudad;
//# sourceMappingURL=ciudad.js.map