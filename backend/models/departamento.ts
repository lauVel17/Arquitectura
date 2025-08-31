import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";
import ciudad from "./ciudad";
import pais from "./pais";

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
            field: "pais_id"
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

pais.hasMany(departamento, {
   foreignKey:"idpais",
   as:"departamento" 
});

departamento.belongsTo(pais, {
    foreignKey:"idpais",
    as:"pais"
}
)

export default departamento