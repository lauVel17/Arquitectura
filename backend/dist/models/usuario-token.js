"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
class UsuarioToken extends sequelize_1.Model {
}
UsuarioToken.init({
    idUsuarioToken: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "id_usuario_token",
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "usuario_id",
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: conexion_1.default,
    modelName: "UsuarioToken",
    tableName: "usuario_token",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = UsuarioToken;
//# sourceMappingURL=usuario-token.js.map