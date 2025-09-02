"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const ciudad_1 = __importDefault(require("./ciudad"));
class usuario extends sequelize_1.Model {
}
usuario.init({
    nodocumento: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "no_documento",
        primaryKey: true,
        autoIncrement: true,
    },
    nombreapellido: {
        type: sequelize_1.DataTypes.STRING,
        field: "nombre_apellido"
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        field: "correo"
    },
    telefono: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "telefono"
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        field: "estado"
    },
    fechaingreso: {
        type: sequelize_1.DataTypes.DATE,
        field: "fecha_ingreso"
    },
    ciudadid: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "ciudad_id",
        references: { model: ciudad_1.default, key: "idciudad" }
    },
}, {
    sequelize: conexion_1.default,
    modelName: "usuario",
    tableName: "usuarios",
    timestamps: false,
});
ciudad_1.default.hasMany(usuario, {
    foreignKey: "ciudadid",
    as: "usuario"
});
usuario.belongsTo(ciudad_1.default, {
    foreignKey: "ciudadid",
    as: "ciudad"
});
exports.default = usuario;
//# sourceMappingURL=usuarios.js.map