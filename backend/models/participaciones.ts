import { Model, DataTypes, IntegerDataType } from "sequelize";
import db from "../db/conexion";
import proyecto from "./proyecto";
import usuario from "./usuarios";

interface participacionAttributes {
    idparticipaciones?: Number;
    proyectoid: number;
    usuarioid: number;
}

class participacion extends Model <participacionAttributes> implements participacionAttributes {

    public idparticipaciones!: number;
    public proyectoid!: number;
    public usuarioid!: number;
}

participacion.init(
    {
        idparticipaciones: {
            type: DataTypes.INTEGER,
            field: "id_participaciones",
            primaryKey: true,
            autoIncrement: true,
        },   
        
        proyectoid: {
            type: DataTypes.INTEGER,
            field: "proyecto_id"
        },

        usuarioid: {
            type: DataTypes.INTEGER,
            field: "usuario_id"
        },
    },
    {
        sequelize: db,
        modelName: "participaciones",
        tableName: "participaciones",
        timestamps: false,
    }
);

proyecto.hasMany(participacion, {
  foreignKey: "proyectoid",
  as: "participacion",
});

participacion.belongsTo(proyecto, {
  foreignKey: "proyectoid",
  as: "proyecto",
});
usuario.hasMany(participacion, {
  foreignKey: "usuarioid",
  as: "participacion",
});

participacion.belongsTo(usuario, {
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

export default participacion