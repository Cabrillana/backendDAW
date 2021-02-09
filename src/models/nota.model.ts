import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import { User } from "./user.model";

export interface NotaInterface {
  titulo: string;
  contenido: string;
  idUser: number
}

export class Nota extends Model {
  public id!: number;
  public idUser!: number;
  public titulo!: string;
  public contenido!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Nota.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true,
    },
    idUser: {type: DataTypes.INTEGER.UNSIGNED, allowNull: true},
    titulo: {type: new DataTypes.STRING(255), allowNull: false},
    contenido: {type: new DataTypes.TEXT, allowNull: false},
  } , {
    tableName: "notas", sequelize: database,
  });

User.hasMany(Nota, {
  sourceKey: "id",
  foreignKey: {
    name: "idUser",
    allowNull: true,
  },
  as: "notas",
});

Nota.belongsTo(User, { 
  foreignKey: "idUser",
  targetKey: "id" });

Nota.sync({alter:true});