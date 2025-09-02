import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";
import departamento from "./departamento";

interface ciudadAttributes {
    idciudad?: number;
    iddepartamento: number;
    nombre: string;
}

class ciudad extends Model <ciudadAttributes> implements ciudadAttributes {

    public idciudad!: number;
    public iddepartamento!: number;
    public nombre!: string;
}

ciudad.init(
    {
        idciudad: {
            type: DataTypes.INTEGER,
            field: "id_ciudad",
            primaryKey: true,
            autoIncrement: true,
        },   
        
        iddepartamento: {
            type: DataTypes.INTEGER,
            field: "departamento_id"
        },

        nombre: {
            type: DataTypes.STRING,
            field: "nombre"
        },
    },
    {
        sequelize: db,
        modelName: "ciudad",
        tableName: "ciudad",
        timestamps: false,
    }
);

departamento.hasMany (ciudad, {
   foreignKey:"iddepartamento",
   as:"ciudad" 
});

ciudad.belongsTo(departamento, {
    foreignKey:"iddepartamento",
    as:"departamento"
}
)

export default ciudad