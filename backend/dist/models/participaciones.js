"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const proyecto_1 = __importDefault(require("./proyecto"));
const usuarios_1 = __importDefault(require("./usuarios"));
class participacion extends sequelize_1.Model {
}
participacion.init({
    idparticipaciones: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "id_participaciones",
        primaryKey: true,
        autoIncrement: true,
    },
    proyectoid: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "proyecto_id"
    },
    usuarioid: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "usuario_id"
    },
}, {
    sequelize: conexion_1.default,
    modelName: "participaciones",
    tableName: "participaciones",
    timestamps: false,
});
proyecto_1.default.hasMany(participacion, {
    foreignKey: "proyectoid",
    as: "participacion",
});
participacion.belongsTo(proyecto_1.default, {
    foreignKey: "proyectoid",
    as: "proyecto",
});
usuarios_1.default.hasMany(participacion, {
    foreignKey: "usuarioid",
    as: "participacion",
});
participacion.belongsTo(usuarios_1.default, {
    foreignKey: "usuarioid",
    as: "usuario",
});
// usuario.hasMany (participacion, {
//    foreignKey:"proyecto",
//    as:"participacion" 
// });
// participacion.belongsTo(usuario, {
//     foreignKey:"usuarioid",
//     as:"ciudad"
// })
exports.default = participacion;
//# sourceMappingURL=participaciones.js.map