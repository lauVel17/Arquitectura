import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";
import ciudad from "./ciudad";

interface proyectoAttributes {
    idproyecto?: number;
    nombre: string;
    descripcion: string;
    ciudadid: number;
    fechainicio: Date;
    fechafin: Date;
}

class proyecto extends Model <proyectoAttributes> implements proyectoAttributes {

    public idproyecto!: number;
    public nombre!: string;
    public descripcion!: string;
    public ciudadid!: number;
    public fechainicio!: Date;
    public fechafin!: Date;
}

proyecto.init(
    {
        idproyecto: {
            type: DataTypes.INTEGER,
            field: "id_proyecto",
            primaryKey: true,
            autoIncrement: true,
        },   
        
        nombre: {
            type: DataTypes.STRING,
            field: "nombre"
        },

        descripcion: {
            type: DataTypes.STRING,
            field: "descripcion"
        },

        ciudadid: {
            type: DataTypes.INTEGER,
            field: "ciudad_id"
        },

        fechainicio: {
            type: DataTypes.DATE,
            field: "fecha_inicio"
        },

        fechafin: {
            type: DataTypes.DATE,
            field: "fecha_fin"
        },
    },
    {
        sequelize: db,
        modelName: "proyecto",
        tableName: "proyecto",
        timestamps: false,
    }
);

proyecto.belongsTo (ciudad, {
   foreignKey:"ciudadid",
   as:"ciudad" 
});

ciudad.hasMany(proyecto, {
    foreignKey:"ciudadid",
    as:"proyecto"
}
)

export default proyecto