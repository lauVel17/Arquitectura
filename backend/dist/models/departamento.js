"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const pais_1 = __importDefault(require("./pais"));
class departamento extends sequelize_1.Model {
}
departamento.init({
    iddepartamento: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "id_departamento",
        primaryKey: true,
        autoIncrement: true,
    },
    idpais: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "pais_id"
    },
    nombre: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "nombre"
    },
}, {
    sequelize: conexion_1.default,
    modelName: "departamento",
    tableName: "departamento",
    timestamps: false,
});
pais_1.default.hasMany(departamento, {
    foreignKey: "idpais",
    as: "departamento"
});
departamento.belongsTo(pais_1.default, {
    foreignKey: "idpais",
    as: "pais"
});
exports.default = departamento;
//# sourceMappingURL=departamento.js.map