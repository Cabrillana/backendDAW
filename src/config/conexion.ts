export const dbconfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "backendaw",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}