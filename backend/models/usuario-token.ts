import { Model, DataTypes, Optional } from "sequelize";
import db from "../db/conexion";

interface UsuarioTokenAttributes {
  idUsuarioToken: number;
  usuarioId: number;
  token: string;
  createdAt: Date;  
  updatedAt: Date;  
}

interface UsuarioTokenCreationAttributes
  extends Optional<UsuarioTokenAttributes, "idUsuarioToken" | "createdAt" | "updatedAt"> {}

class UsuarioToken
  extends Model<UsuarioTokenAttributes, UsuarioTokenCreationAttributes>
  implements UsuarioTokenAttributes
{
  public idUsuarioToken!: number;
  public usuarioId!: number;
  public token!: string;
  public createdAt!: Date;  
  public updatedAt!: Date; 
}

UsuarioToken.init(
  {
    idUsuarioToken: {
      type: DataTypes.INTEGER,
      field: "id_usuario_token",
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: "usuario_id",
    },
    token: {
      type: DataTypes.TEXT, 
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false,
      defaultValue: DataTypes.NOW,  
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false,
      defaultValue: DataTypes.NOW,  
    
    },
  },
  {
    sequelize: db,
    modelName: "UsuarioToken",
    tableName: "usuario_token",
    timestamps: true,  
    createdAt: "created_at", 
    updatedAt: "updated_at",  
  }
);


export default UsuarioToken;
