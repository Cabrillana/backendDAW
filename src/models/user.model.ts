import { Model, DataTypes, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import { database } from "../config/database";
import { Nota } from "./nota.model";

export const UserReadInterface = ['nombre','apellidos','email','telefono','dni'];

export interface UserCreateInterface {
  nombre: string;
  apellidos: string;
  password:string;
  email: string;
  telefono: number;
  dni: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserUpdateInterface {
  nombre: string;
  apellidos: string;
  password?: string;
  email: string;
  telefono: number;
}

export class User extends Model {
  public id!: number;
  public nombre!: string;
  public apellidos!: string;
  public password!:string;
  public email!: string;
  public telefono!: number;
  public dni!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getNotas!: HasManyGetAssociationsMixin<Nota>;
  public createNota!: HasManyCreateAssociationMixin<Nota>;
}

User.init({
    id: { 
      type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
    },
    nombre: {type: new DataTypes.STRING(32), allowNull: true},
    apellidos: {type: new DataTypes.STRING(64), allowNull: true},
    password: {type: new DataTypes.STRING(255), allowNull: false},
    email: {type: new DataTypes.STRING(40), allowNull: false},
    telefono: {type: DataTypes.INTEGER.UNSIGNED, allowNull: true},
    dni: {type: new DataTypes.STRING(16), allowNull: false},
  } , {
    tableName: "users", sequelize: database,
  });

User.sync({alter:true});