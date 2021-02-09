import { Request, Response } from "express";
import { DestroyOptions, Op, UpdateOptions } from "sequelize";
import { UserLoginInterface, User, UserCreateInterface, UserUpdateInterface, UserReadInterface } from "../models/user.model";
import { sign } from "jsonwebtoken"
import { compare, genSaltSync, hashSync } from "bcryptjs";
import { claveToken } from "../config/claveJWT";
const salt = genSaltSync(10);
const expira = "2d";

class UsersController {

  public readPerfil(req: Request, res: Response) {
    const userId: string = req.body.idJWT;
    User.findByPk<User>(userId,{ attributes: UserReadInterface})
      .then((user: User | null) => {
        if(user) res.json(user)
        else res.status(404)
          .json({ errors: "No se ha encontrado el user con id=" + userId });
        })
        .catch((err: Error) => res.status(500).json(err));
  }

  public readUser(req: Request, res: Response) {
    const parametros: UserLoginInterface = req.body;
    const condicion = {email: parametros.email};
    const atributos = ['id','password'];

    User.findOne<User>({where: condicion, attributes: atributos})
      .then((user:User | null) => {
        if(user) {
          compare(parametros.password, user.password, (err,success) => {
            if(success) {
              const accessToken = sign(
                { id: user.id }, 
                claveToken, 
                {expiresIn: expira}
              );
              res.json(accessToken);
            } else res.status(401)
              .json({ errors: "Password Incorrecta"});
          })
        }
        else res.status(404)
          .json({ errors: "No existe el usuario" });
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public createUser(req: Request, res: Response) {
    let parametros: UserCreateInterface = req.body;
    parametros.password = hashSync(parametros.password, salt);

    User.findOrCreate<User>({where: {email: parametros.email}, defaults: parametros})
      .then(([user, estado]) => {
        if(estado) {
          const accessToken = sign(
            { id: user.id },
            claveToken, 
            {expiresIn: expira}
          );
          res.status(201).json(accessToken);
        }
        else res.status(409).json({data: "Ya existe el ususario" });
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public async update(req: Request, res: Response) {
    const userId: string = req.body.idJWT;
    let parametros: UserUpdateInterface = req.body;
    let nUsers:number = 2;

    if(parametros.email) {
      const condicion = { [Op.or] : [{ id: userId } , { email: parametros.email } ] };
      const atributo = ['id'];
      await User.findAll<User>({where: condicion, attributes:atributo})
        .then((users: Array<User>)=>{
          nUsers = users.length;
        })
        .catch((err: Error) => res.status(500).json(err));
    } else nUsers = 1;

    if(nUsers != 2){
      if(parametros.password?.length==0)
        delete parametros.password
      if(parametros.password)
        parametros.password = hashSync(parametros.password, salt);
      const actualiza: UpdateOptions = {
        where: { id: userId }, limit: 1,
      };
      User.update(parametros, actualiza,)
      .then(() => res.status(200)
        .json({ data: "Se ha actualizado el usuario con id=" + userId }))
      .catch((err: Error) => {
        console.log(err)
        res.status(500).json(err);
      });  
    } else{
      res.status(409).json({data: "El email está en uso" });
    } 
  }

  public delete(req: Request, res: Response) {
    const userId: string = req.body.idJWT;
    const elimina: DestroyOptions = {
      where: { id: userId }, limit: 1,
    };
    User.destroy(elimina)
      .then(() => res.status(200)
        .json({ data: "Se ha eliminado el usuario con id=" + userId }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
export const usersController = new UsersController;