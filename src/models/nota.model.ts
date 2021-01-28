import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export interface NotaInterface {
  titulo: string;
  contenido: string;
}

export class Nota extends Model {
  public id!: number;
  public titulo!: string;
  public contenido!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Nota.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true,
    },
    titulo: {
      type: new DataTypes.STRING(255), allowNull: false,
    },
    contenido: {
      type: new DataTypes.TEXT, allowNull: false,
    },
  } , {
    tableName: "notas", sequelize: database,
  });
  
Nota.sync();