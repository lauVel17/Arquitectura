import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";
import ciudad from "./ciudad";

interface departamentoAttributes {
    iddepartamento: number;
    idpais: number;
    nombre: string;
}

class departamento extends Model <departamentoAttributes> implements departamentoAttributes {

    public iddepartamento!: number;
    public idpais!: number;
    public nombre!: string;
}

departamento.init(
    {
        iddepartamento: {
            type: DataTypes.INTEGER,
            field: "id_departamento",
            primaryKey: true,
            autoIncrement: true,
        },   
        
        idpais: {
            type: DataTypes.INTEGER,
            field: "id_pais"
        },

        nombre: {
            type: DataTypes.INTEGER,
            field: "nombre"
        },
    },
    {
        sequelize: db,
        modelName: "departamento",
        tableName: "departamento",
        timestamps: false,
    }
);

departamento.hasMany (ciudad, {
   foreignKey:"ciudadid",
   as:"departamento" 
});

ciudad.belongsTo(departamento, {
    foreignKey:"ciudadid",
    as:"ciudad"
}
)

export default departamento