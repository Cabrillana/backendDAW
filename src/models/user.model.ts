import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export interface UserCreateInterface {
  nombre: string;
  apellidos: string;
  password:string;
  email: string;
  telefono: number;
  dni: string;
}

export interface UserUpdateInterface {
  nombre: string;
  apellidos: string;
  email:string;
  password: string;
  telefono: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
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
}

User.init({
    id: { 
      type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
    },
    nombre: {type: new DataTypes.STRING(32), allowNull: true},
    apellidos: {type: new DataTypes.STRING(64), allowNull: true},
    password: {type: new DataTypes.STRING(255), allowNull: false},
    email: {type: new DataTypes.STRING(40), allowNull: false, unique:true},
    telefono: {type: DataTypes.INTEGER.UNSIGNED, allowNull: true},
    dni: {type: new DataTypes.STRING(16), allowNull: false},
  } , {
    tableName: "users", sequelize: database,
  });
  
User.sync();