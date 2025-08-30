import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";
import ciudad from "./ciudad";
import { getDefaultHighWaterMark } from "stream";

interface usuarioAttributes {
    nodocumento: number;
    nombreapellido: string;
    correo: string;
    telefono: string;
    estado: string;
    fechaingreso: Date;
    ciudadid: number;
}

class usuario extends Model <usuarioAttributes> implements usuarioAttributes {

    public nodocumento!: number;
    public nombreapellido!: string;
    public correo!: string;
    public telefono!: string;
    public estado!: string;
    public fechaingreso!: Date;
    public ciudadid!: number;
}

usuario.init(
    {
        nodocumento: {
            type: DataTypes.INTEGER,
            field: "numero_documento",
            primaryKey: true,
            autoIncrement: true,
        },   
        
        nombreapellido: {
            type: DataTypes.INTEGER,
            field: "nombre_apellido"
        },

        correo: {
            type: DataTypes.INTEGER,
            field: "correo"
        },

        telefono: {
            type: DataTypes.INTEGER,
            field: "telefono"
        },

        estado: {
            type: DataTypes.INTEGER,
            field: "telefono"
        },

        fechaingreso: {
            type: DataTypes.DATE,
            field: "fecha_ingreso"
        },

        ciudadid: {
            type: DataTypes.INTEGER,
            field: "ciudad", 
            references: {model:ciudad,key:"idciudad"}
        },
    },
    {
        sequelize: db,
        modelName: "usuario",
        tableName: "usuarios",
        timestamps: false,
    }
);

ciudad.hasMany (usuario, {
   foreignKey:"ciudadid",
   as:"usuario" 
});

usuario.belongsTo(ciudad, {
    foreignKey:"ciudadid",
    as:"ciudad"
}
)

export default usuario

