import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";

interface paisAttributes {
    idpais: number;
    nombre: string;
}

class pais extends Model <paisAttributes> implements paisAttributes {

    public idpais!: number;
    public nombre!: string;
}

pais.init(
    {
        idpais: {
            type: DataTypes.INTEGER,
            field: "id_pais",
            primaryKey: true,
            autoIncrement: true,
        },   
        
        nombre: {
            type: DataTypes.INTEGER,
            field: "nombre"
        },
    },
    {
        sequelize: db,
        modelName: "pais",
        tableName: "pais",
        timestamps: false,
    }
);

export default pais