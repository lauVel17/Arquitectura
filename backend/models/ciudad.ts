import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";
import departamento from "./departamento";

interface ciudadAttributes {
    idciudad: string;
    iddepartamento: string;
    nombre: string;
}

class ciudad extends Model <ciudadAttributes> implements ciudadAttributes {

    public idciudad!: string;
    public iddepartamento!: string;
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
            type: DataTypes.INTEGER,
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
   foreignKey:"id_ciudad",
   as:"ciudad" 
});

ciudad.belongsTo(departamento, {
    foreignKey:"departamento_id",
    as:"departamento"
}
)

export default ciudad