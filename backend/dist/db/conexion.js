"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('voluntariado', 'lau', '123_Lau*', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false,
        //prueba
    }
});
exports.default = db;
//# sourceMappingURL=conexion.js.map